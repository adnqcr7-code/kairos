const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');
const { askBrain } = require('./brain');
const { providerStatus } = require('./providers');

async function runChat() {
  const provider = providerStatus();

  console.log('');
  console.log('Kairos AI Brain Chat');
  if (provider.id === 'offline') {
    console.log('No AI brain is configured yet.');
    console.log('');
    console.log('Set one with:');
    console.log('  npm.cmd run kairos -- brain setup');
    console.log('');
    console.log('Good free/local choice: Ollama');
    console.log('  npm.cmd run kairos -- brain setup --provider ollama --yes');
    return;
  }

  const rl = readline.createInterface({ input, output });
  console.log(`Brain: ${provider.label}`);
  console.log('Type /exit to leave. Type /help for examples.');
  console.log('');
  const history = [];

  try {
    while (true) {
      const message = (await rl.question('you> ')).trim();
      if (!message) continue;
      if (['/exit', 'exit', 'quit'].includes(message.toLowerCase())) {
        console.log('kairos> Chat closed.');
        return;
      }

      if (message.toLowerCase() === '/help') {
        console.log([
          'kairos> Commands:',
          '- Ask coding questions with your configured brain',
          '- /brain shows current provider',
          '- /exit'
        ].join('\n'));
        continue;
      }

      if (message.toLowerCase() === '/brain') {
        console.log(`kairos> ${JSON.stringify(providerStatus(), null, 2)}`);
        continue;
      }

      const reply = await askBrain(message, history);
      history.push({ role: 'user', content: message });
      history.push({ role: 'assistant', content: reply });
      console.log(`kairos> ${reply}`);
    }
  } finally {
    rl.close();
  }
}

module.exports = {
  runChat
};
