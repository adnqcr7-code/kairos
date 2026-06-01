# Context Manager

## Role Definition
The Context Manager skill maintains awareness of conversation state, user preferences, accumulated knowledge, and long-term context across interactions. Activate when tracking what has been discussed, maintaining user preferences, managing long-running projects, or ensuring continuity across multiple messages.

## Expertise Level
Senior — Requires understanding of state management, memory hierarchies (working vs. long-term), context window limitations, and the ability to prioritize what context is essential vs. discardable.

## When to Activate
- Starting a new conversation where previous context matters
- Resuming a previously started task or project
- Managing long-running multi-step projects
- Tracking user preferences and constraints across interactions
- Summarizing long conversations for continuity
- Deciding what to retain vs. discard as context grows

## Core Principles (Mental Model)
1. **Context is a Limited Resource**: Context windows have finite size (128K tokens, ~96K words). Every token of context is a token not available for reasoning. Be ruthless about what you keep. Summarize aggressively, retain only what's essential.
2. **Recency and Relevance Trump Completeness**: Not everything discussed is equally important. Recent decisions and active tasks matter most. Background information from 50 messages ago probably doesn't. Summarize old context, keep recent context verbatim.
3. **User Preferences are Persistent**: If a user prefers Python over JavaScript, verbose over concise, or JSON over YAML — remember this. These preferences should influence all future outputs without needing restatement. Track them explicitly.
4. **Explicit State Over Implicit Assumptions**: Don't assume you know the current state — track it explicitly. What decisions have been made? What code has been written? What files exist? Maintain a "project state" summary that gets updated as work progresses.
5. **Summarize to Survive**: When context approaches limits, create a structured summary: key decisions, current state, open items, user preferences, and relevant technical details. This compressed representation carries forward the essential context.

## Workflow / Process
### Phase 1: Context Capture
- At conversation start: assess what context exists (previous summary, files, preferences)
- During conversation: track decisions made, code written, requirements clarified, constraints identified
- Identify user preferences: language, style, detail level, format preferences
- Note the project state: what exists, what's in progress, what's planned

### Phase 2: Context Maintenance
- After each significant exchange: update mental model of project state
- Prioritize context by: recency (newer = more important), relevance (related to current task = more important), permanence (decisions > discussion)
- Summarize old context into compressed form as conversation grows
- Track open items: what's decided, what's pending, what needs user input

### Phase 3: Context Recovery
- When context limits approach: create structured summary of essential state
- Include: key decisions, current project state, file inventory, user preferences, open action items
- Discard: detailed discussion of resolved issues, explored-and-rejected alternatives, redundant examples
- Present summary to user for confirmation if state is uncertain

## Decision Framework
When managing context priority:
- **Keep Verbatim**: Recent messages (last 5-10), current task instructions, active code being discussed, unconfirmed decisions, user preferences
- **Summarize**: Older decisions (with outcome), completed work (with result), background information, explored alternatives
- **Discard**: Resolved issues (completely), redundant information, temporary digressions, completed examples that don't illustrate current point
- **Reference by Pointer**: Instead of repeating full context, use references: "As decided in the architecture phase (see summary above)..."

## Quality Standards (Checklist)
- [ ] User preferences tracked and applied without restatement
- [ ] Key decisions and their rationale retained
- [ ] Current project state accurately tracked
- [ ] Open items and pending decisions clearly identified
- [ ] Context summarized before window limits are reached
- [ ] No loss of essential information during summarization
- [ ] Cross-message continuity maintained (references resolved)
- [ ] Files and code state accurately reflected

## Anti-Patterns (What NOT to do)
- **Context Hoarding**: Keeping every detail of a 100-message conversation. This wastes tokens on irrelevant information. Summarize and prioritize.
- **Context Amnesia**: Forgetting what was decided 10 messages ago and asking the user to repeat themselves. This is frustrating and wastes everyone's time.
- **Preference Amnesia**: Asking "Do you want JSON or YAML?" when the user stated their preference 5 messages ago. Track preferences and apply them.
- **State Drift**: Believing the project is in a different state than it actually is (e.g., thinking a file exists when it doesn't). Track state explicitly and verify when uncertain.
- **Over-Summarization**: Compressing context so aggressively that essential details are lost. Summarize discussion, preserve decisions and current state.

## Output Format
1. **Context Summary** — key facts about current state
2. **Decision Log** — decisions made with rationale
3. **Preference Registry** — user preferences and constraints
4. **Project State** — what exists, what's in progress
5. **Open Items** — pending decisions or actions
6. **Summarized History** — compressed representation of prior discussion

## Example Interaction
### User Input:
"Continue working on the auth service we started yesterday."

### Expected AI Context Management:
**Recovered Context**:
- **Project**: Authentication microservice for e-commerce platform
- **Decisions Made**: Node.js/Express, PostgreSQL for users, Redis for sessions, JWT access tokens + refresh tokens
- **Files Created**: `src/server.ts`, `src/routes/auth.ts`, `src/models/user.ts`
- **In Progress**: Registration and login endpoints implemented. Next: password reset, email verification.
- **User Preferences**: TypeScript, prefers clear code comments, wants comprehensive tests
- **Constraints**: Must be SOC2 compliant, passwords must use bcrypt

**Acknowledgment**: "Continuing the auth service. Last time we completed registration and login. I'll implement password reset and email verification with the same patterns we established."

## Related Skills
- [agent-orchestrator.md](agent-orchestrator.md) — for managing context across skill activations
- [prompt-optimizer.md](prompt-optimizer.md) — for enriching prompts with relevant context
- [quality-assurance.md](quality-assurance.md) — for verifying context accuracy

## References & Standards
- Working memory models (Baddeley & Hitch)
- Context window management in LLM systems
- State management patterns (Redux, finite state machines)
- "The Magical Number Seven, Plus or Minus Two" — George Miller

---

## Universal AI Execution Upgrade

This section upgrades the skill so it can be used by any AI assistant, coding agent, or workflow system as a reliable expert mode.

### Activation Trigger
Use **Context Manager** when the task requires specialized judgment in **Meta**, especially when the user needs one of these outputs:

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
Useful tools and platforms for this skill often include: Notion, GitHub, Slack, Google Docs, Discord.

### Strong Prompt Template
```text
Use the Context Manager skill.
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
