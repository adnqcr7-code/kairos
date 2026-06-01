const { spawnSync } = require('node:child_process');
const http = require('node:http');
const https = require('node:https');
const { getEnv } = require('./env');
const { providerStatus } = require('./providers');
const { ROOT_DIR } = require('./storage');

function splitArgs(text) {
  return text ? text.split(/\s+/).filter(Boolean) : [];
}

function postJson(url, payload, options = {}) {
  const body = JSON.stringify(payload);
  const client = url.startsWith('https:') ? https : http;

  return new Promise((resolve) => {
    const request = client.request(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'content-length': Buffer.byteLength(body),
        ...(options.headers || {})
      },
      timeout: options.timeout || 120000
    }, (response) => {
      let text = '';
      response.setEncoding('utf8');
      response.on('data', (chunk) => {
        text += chunk;
      });
      response.on('end', () => {
        resolve({
          ok: response.statusCode >= 200 && response.statusCode < 300,
          statusCode: response.statusCode,
          text
        });
      });
    });

    request.on('timeout', () => {
      request.destroy(new Error('Request timed out.'));
    });
    request.on('error', (error) => {
      resolve({ ok: false, error: error.message });
    });
    request.write(body);
    request.end();
  });
}

function formatHttpFailure(result) {
  if (result.error) return result.error;
  if (result.statusCode) return `HTTP ${result.statusCode}: ${result.text?.slice(0, 240) || ''}`;
  return 'No HTTP response received.';
}

function askCodex(prompt) {
  const command = getEnv('KAIROS_CODEX_COMMAND', 'codex');
  const args = splitArgs(getEnv('KAIROS_CODEX_ARGS', 'exec')).concat([prompt]);
  const result = spawnSync(command, args, {
    cwd: ROOT_DIR,
    encoding: 'utf8',
    timeout: 120000
  });

  if (result.error) {
    return [
      `Codex bridge failed: ${result.error.message}`,
      'Tip: set the command with:',
      'npm.cmd run kairos -- brain setup --provider codex --yes',
      'Then edit KAIROS_CODEX_COMMAND / KAIROS_CODEX_ARGS in .env if needed.'
    ].join('\n');
  }

  if (result.status !== 0) {
    return result.stderr || result.stdout || `Codex exited with status ${result.status}`;
  }

  return result.stdout.trim() || 'Codex returned no output.';
}

function kairosSystemPrompt() {
  return [
    'You are Kairos, a practical local-first coding agent.',
    'Be concise, safe, and useful.',
    'Prefer Windows PowerShell commands when giving commands.',
    'Do not suggest malware, token stealing, spam, raids, or bypass abuse.',
    'For risky file/shell actions, tell the user Kairos should ask for approval first.'
  ].join(' ');
}

function normalizeChatMessages(prompt, history = []) {
  const messages = [
    {
      role: 'system',
      content: kairosSystemPrompt()
    }
  ];

  for (const item of history.slice(-12)) {
    if (item?.role && item?.content) {
      messages.push({ role: item.role, content: item.content });
    }
  }

  messages.push({ role: 'user', content: prompt });
  return messages;
}

async function askOllama(prompt, history = []) {
  const baseUrl = getEnv('KAIROS_OLLAMA_BASE_URL', 'http://localhost:11434').replace(/\/$/, '');
  const model = getEnv('KAIROS_OLLAMA_MODEL', 'llama3.1');
  const result = await postJson(`${baseUrl}/api/chat`, {
    model,
    messages: normalizeChatMessages(prompt, history),
    stream: false
  });

  if (!result.ok) {
    return [
      'Ollama call failed.',
      formatHttpFailure(result),
      '',
      'Fix:',
      '1. Open Ollama or run: ollama serve',
      `2. Pull the model: ollama pull ${model}`,
      `3. Check Kairos: npm.cmd run kairos -- brain check ollama`
    ].join('\n');
  }

  try {
    const json = JSON.parse(result.text);
    return json.message?.content || json.response || 'Ollama returned no response.';
  } catch {
    return 'Ollama returned invalid JSON.';
  }
}

async function askOpenAiCompatible({ prompt, apiKey, model, url, label, extraHeaders = {}, history = [] }) {
  const result = await postJson(url, {
    model,
    messages: normalizeChatMessages(prompt, history)
  }, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      ...extraHeaders
    }
  });

  if (!result.ok) {
    return `${label} call failed. This API key/model is not working yet. ${formatHttpFailure(result)}`;
  }

  try {
    return JSON.parse(result.text).choices?.[0]?.message?.content || `${label} returned no response.`;
  } catch {
    return `${label} returned invalid JSON.`;
  }
}

async function askAnthropic(prompt, history = []) {
  const apiKey = getEnv('ANTHROPIC_API_KEY');
  const model = getEnv('KAIROS_ANTHROPIC_MODEL', 'claude-3-5-sonnet-latest');
  const result = await postJson('https://api.anthropic.com/v1/messages', {
    model,
    max_tokens: 1200,
    system: kairosSystemPrompt(),
    messages: normalizeChatMessages(prompt, history).filter((message) => message.role !== 'system')
  }, {
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    }
  });

  if (!result.ok) {
    return `Anthropic call failed. This API key/model is not working yet. ${formatHttpFailure(result)}`;
  }

  try {
    return JSON.parse(result.text).content?.map((item) => item.text).filter(Boolean).join('\n') || 'Anthropic returned no response.';
  } catch {
    return 'Anthropic returned invalid JSON.';
  }
}

async function askGemini(prompt, history = []) {
  const apiKey = getEnv('GEMINI_API_KEY');
  const model = getEnv('KAIROS_GEMINI_MODEL', 'gemini-1.5-flash');
  const result = await postJson(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`, {
    contents: [
      {
        parts: [{ text: normalizeChatMessages(prompt, history).map((message) => `${message.role}: ${message.content}`).join('\n\n') }]
      }
    ]
  });

  if (!result.ok) {
    return `Gemini call failed. This API key/model is not working yet. ${formatHttpFailure(result)}`;
  }

  try {
    return JSON.parse(result.text).candidates?.[0]?.content?.parts?.map((part) => part.text).filter(Boolean).join('\n') || 'Gemini returned no response.';
  } catch {
    return 'Gemini returned invalid JSON.';
  }
}

async function askBrain(prompt, history = []) {
  const provider = providerStatus();
  if (provider.id === 'offline') {
    return 'No AI brain configured. Run: npm.cmd run kairos -- brain setup';
  }

  if (provider.id === 'codex') {
    return askCodex(prompt);
  }

  if (provider.id === 'ollama') {
    return askOllama(prompt, history);
  }

  if (provider.id === 'openai') {
    return askOpenAiCompatible({
      prompt,
      apiKey: getEnv('OPENAI_API_KEY'),
      model: getEnv('KAIROS_OPENAI_MODEL', 'gpt-4.1-mini'),
      url: 'https://api.openai.com/v1/chat/completions',
      label: 'OpenAI',
      history
    });
  }

  if (provider.id === 'openrouter') {
    return askOpenAiCompatible({
      prompt,
      apiKey: getEnv('OPENROUTER_API_KEY'),
      model: getEnv('KAIROS_OPENROUTER_MODEL', 'openai/gpt-4.1-mini'),
      url: 'https://openrouter.ai/api/v1/chat/completions',
      label: 'OpenRouter',
      history,
      extraHeaders: {
        'HTTP-Referer': 'http://localhost/kairos',
        'X-Title': 'Kairos Agent'
      }
    });
  }

  if (provider.id === 'kimi') {
    return askOpenAiCompatible({
      prompt,
      apiKey: getEnv('KIMI_API_KEY'),
      model: getEnv('KAIROS_KIMI_MODEL', 'kimi-latest'),
      url: 'https://api.moonshot.ai/v1/chat/completions',
      label: 'Kimi',
      history
    });
  }

  if (provider.id === 'anthropic') {
    return askAnthropic(prompt, history);
  }

  if (provider.id === 'gemini') {
    return askGemini(prompt, history);
  }

  return `Unknown brain provider: ${provider.id}`;
}

module.exports = {
  askBrain,
  askCodex
};
