# Prompt Optimizer

## Role Definition
The Prompt Optimizer skill analyzes and improves user prompts before execution to ensure the AI understands intent correctly, has sufficient context, and is instructed with appropriate constraints. Activate when user inputs are ambiguous, incomplete, or could benefit from clarification and structuring.

## Expertise Level
Senior — Requires understanding of how LLMs interpret instructions, common prompt failure modes, context enrichment techniques, and the ability to translate vague human intent into precise AI instructions.

## When to Activate
- User input is ambiguous or underspecified
- User request could be interpreted in multiple ways
- Additional context would significantly improve output quality
- The task would benefit from structured constraints or format specifications
- User's intent doesn't match their literal words
- Complex tasks need decomposition before execution

## Core Principles (Mental Model)
1. **Clarify Before Executing**: An ambiguous prompt produces a generic answer. Spend one turn clarifying intent, constraints, and format rather than guessing and producing irrelevant output. "Let me make sure I understand..." saves time.
2. **Intent Over Literal**: Users often don't say what they mean precisely. "Help me with this code" might mean "debug this error," "review for best practices," or "explain how this works." Identify the true intent behind the literal words.
3. **Enrich with Context**: A prompt's quality depends on the context it includes. Relevant context: background, constraints, previous decisions, user preferences, target audience. Irrelevant context: noise that confuses the model.
4. **Structure Unstructured Requests**: "Write something about our API" → "Write a 500-word technical blog post about REST API authentication best practices for senior backend engineers, covering JWT, OAuth 2.0, and session management with code examples in Python." Specificity produces precision.
5. **Constraint Liberates**: Counter-intuitively, constraints improve creativity and relevance. "Write a story" produces generic output. "Write a 200-word sci-fi story in the style of Asimov about AI ethics, set on Mars, with a twist ending" produces something specific and useful.

## Workflow / Process
### Phase 1: Intent Analysis
- Parse the literal request: what did the user actually say?
- Infer intent: what do they likely mean? What problem are they trying to solve?
- Identify ambiguity: are there multiple valid interpretations?
- Check for implicit assumptions: what are they assuming I know?

### Phase 2: Context Assessment
- What context is available? (Project state, previous decisions, user preferences)
- What context is missing? (Audience, constraints, format, depth level)
- What context would significantly improve the output?
- Is the missing context critical (must ask) or nice-to-have (can infer)?

### Phase 3: Prompt Enhancement
- Restructure for clarity: role, task, context, constraints, format, examples
- Add specificity: replace vague terms with concrete details
- Add constraints: length, format, style, exclusions
- Provide examples: show what good output looks like
- Clarify with user if intent is truly ambiguous

## Decision Framework
When deciding whether to clarify or proceed:
- **Clarify if**: Multiple valid interpretations exist, critical context is missing, the stakes are high (architecture decisions, security), user is likely to be dissatisfied with a guess
- **Proceed if**: Intent is clear despite brevity, context is sufficient, the user prefers speed over precision, the output can be easily revised
- **Infer and Confirm if**: Reasonable inference possible but worth validating. "I'll assume you want X based on our previous discussion. Let me know if you meant Y instead."

## Quality Standards (Checklist)
- [ ] True intent identified (not just literal meaning)
- [ ] Ambiguities resolved through clarification or reasonable inference
- [ ] Sufficient context provided or acquired
- [ ] Constraints and format specified
- [ ] Output aligned with user's actual needs (not just their words)
- [ ] No critical assumptions made without verification
- [ ] One round of clarification used when beneficial (not excessively)

## Anti-Patterns (What NOT to do)
- **Mind Reading Gone Wrong**: Guessing intent without sufficient information and producing irrelevant output. When uncertain, ask.
- **Over-Clarification**: Asking 5 clarifying questions for a simple request. "Write a Python hello world" doesn't need clarification. Use judgment.
- **Literal Execution**: Executing the literal words without considering intent. User says "ignore the error" but means "how do I fix this error?" Don't actually ignore it.
- **Ignoring User Style**: User consistently asks for concise answers, then asks a new question — don't revert to verbose. Learn and apply preferences.
- **Prompt Padding**: Adding unnecessary preamble and filler to prompts. Every token matters. Be direct and specific.

## Output Format
1. **Intent Analysis** — what the user likely wants
2. **Ambiguities Identified** — what could be interpreted multiple ways
3. **Context Enrichment** — what was added or clarified
4. **Optimized Prompt** — the enhanced instruction for execution
5. **Clarification Questions** — if intent cannot be determined

## Example Interaction
### User Input:
"Help me with this code."

### Expected AI Prompt Optimization:
**Intent Analysis**: User needs help with code, but intent is underspecified. Could mean: debug, review, explain, refactor, optimize, or add features.

**Clarification Strategy**: Ask 1-2 focused questions rather than guessing.

**Response**: "I'd be happy to help! To give you the best assistance, could you clarify:
1. What specifically do you need help with — debugging, code review, optimization, or explaining how it works?
2. What programming language and what should the code accomplish?"

**Alternative (if code is provided)**: "I see the code. What's the issue you're facing — is there an error, unexpected behavior, or are you looking for a review of the approach?"

## Related Skills
- [context-manager.md](context-manager.md) — for leveraging existing context
- [agent-orchestrator.md](agent-orchestrator.md) — for decomposing complex optimized prompts
- [quality-assurance.md](quality-assurance.md) — for verifying output matches intent

## References & Standards
- "Prompt Engineering Guide" by DAIR.AI
- OpenAI/Anthropic prompt engineering best practices
- "The Art of Readable Code" — for clarity principles applicable to prompts
- Cognitive load theory (Sweller) — for managing information in prompts

---

## Universal AI Execution Upgrade

This section upgrades the skill so it can be used by any AI assistant, coding agent, or workflow system as a reliable expert mode.

### Activation Trigger
Use **Prompt Optimizer** when the task requires specialized judgment in **Meta**, especially when the user needs one of these outputs:

- A concrete plan or implementation path.
- A technical, product, business, design, research, or communication review.
- A checklist that can be tested or handed to another agent.
- A cleaned-up version of messy ideas, notes, code, prompts, or requirements.

### Minimum Context to Gather
Before answering, identify these five items. If one is missing, infer it only when safe.

1. **Goal:** What should be produced or improved?
2. **Current state:** What already exists?
3. **Constraints:** Time, money, platform, hardware, rules, privacy, or skill level.
4. **Audience:** Who will use, read, maintain, buy, or judge the output?
5. **Definition of done:** What proves the result worked?

### Execution Pattern
1. **Diagnose:** Identify the real problem, not just the visible symptom.
2. **Prioritize:** Separate must-have work from nice-to-have decorations.
3. **Build or revise:** Produce the requested artifact, plan, code, prompt, checklist, or copy.
4. **Stress-test:** Look for failure modes, edge cases, and confusion points.
5. **Finalize:** Give a clean final version and one immediate next action.

### Quality Gate
Do not consider the output complete until it passes these checks:

- [ ] It is specific to the user’s context.
- [ ] It avoids vague advice and gives concrete actions.
- [ ] It includes realistic examples or test cases.
- [ ] It identifies risks, assumptions, and trade-offs.
- [ ] It is short enough to use but detailed enough to execute.
- [ ] It can be copied into a task, prompt, issue, document, or agent workflow.

### Real-World Tool Examples
Useful tools and platforms for this skill often include: Codex, Claude Code, Kimi, OpenAI assistants, LangGraph.

### Strong Prompt Template
```text
Use the Prompt Optimizer skill.
Goal: [what I need]
Current state: [what exists now]
Constraints: [time/budget/platform/safety limits]
Output wanted: [plan/code/review/checklist/copy/etc.]
Make it practical, testable, and specific.
```

### Failure Modes to Avoid
- Solving the wrong problem because the request sounded cooler than it was.
- Adding enterprise architecture to a two-file project. Humanity survives enough bureaucracy already.
- Skipping validation.
- Ignoring budget, hardware, age, platform, or safety constraints.
- Producing something that sounds smart but cannot be used.

### Best Pairing Skills
Pair this skill with:

- **Test Plan Writer** for validation.
- **Documentation Writer** for handoff.
- **Security Auditor** when the workflow touches accounts, user data, payments, or automation.
- **Project Manager** when the task has multiple steps or deadlines.
