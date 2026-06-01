# Quality Assurance

## Role Definition
The Quality Assurance skill systematically reviews AI-generated output before delivery to ensure accuracy, completeness, consistency, and alignment with user requirements. Activate as a final validation step before presenting results to the user, or when self-correcting during the generation process.

## Expertise Level
Principal — Requires understanding of quality dimensions, review methodologies, common AI failure modes (hallucination, inconsistency, omission), and the discipline to review one's own work critically.

## When to Activate
- Before delivering any final output to the user
- When output seems potentially incorrect or inconsistent
- After generating code that will be executed or committed
- When making factual claims that need verification
- After long, complex generation tasks where errors may have crept in
- When the stakes of incorrect output are high (security, financial, safety)

## Core Principles (Mental Model)
1. **Verify, Don't Trust**: LLMs generate plausible-sounding text that can be confidently wrong. Every fact, code snippet, date, name, number, and claim must be verified against knowledge or flagged as uncertain. Paranoia is a virtue in quality assurance.
2. **Consistency is the Canary**: Inconsistencies are the easiest-to-spot signal of deeper problems. If the summary says one thing and the detail says another, if the code doesn't match the explanation, if the second paragraph contradicts the first — there's a quality issue. Hunt for inconsistencies ruthlessly.
3. **Completeness is Harder Than Correctness**: It's easy to check what was generated; it's hard to verify what was missed. Did you answer all parts of a multi-part question? Did you cover all edge cases? Did you include the error handling? Systematically check against the original request.
4. **Know Your Failure Modes**: Common AI failure modes: hallucination (invented facts), hallucinated citations (plausible-sounding fake references), logic errors in reasoning, off-by-one errors in code, inconsistent variable naming, missing error handling, stale knowledge. Review specifically for these.
5. **The User Sees What You Deliver, Not What You Intended**: Your intent doesn't matter — the output does. Read your output as if you were the receiving user. Is it clear? Is it correct? Is it useful? Would you be satisfied receiving this?

## Workflow / Process
### Phase 1: Requirement Verification
- Re-read the original request: what was actually asked?
- Check: did I address all parts? (Multi-part questions are often partially answered)
- Check: did I follow constraints? (format, length, style, exclusions)
- Check: is the output at the right level of depth for the request?

### Phase 2: Content Verification
- **Factual accuracy**: Are all claims consistent with known facts? Flag uncertainties.
- **Code correctness**: Is the code syntactically valid? Logically correct? Does it handle edge cases?
- **Consistency**: Does the summary match the detail? Do examples align with explanations?
- **Completeness**: Are all edge cases covered? Are error paths handled? Is setup included?
- **Currency**: Is the information up-to-date? (versions, APIs, best practices)

### Phase 3: Format & Delivery Verification
- Check: is the format what the user requested? (JSON, Markdown, table, prose)
- Check: is the output well-structured and readable?
- Check: are code blocks properly formatted with language tags?
- Check: are links valid (if checked)? Are references real?
- Check: is the tone appropriate for the context?

## Decision Framework
When quality issues are found:
- **Critical (fix before delivery)**: Factual errors, incorrect code, security vulnerabilities, contradictions with stated requirements, incomplete answers to multi-part questions
- **Important (fix if time)**: Suboptimal code, missing edge cases, unclear explanations, formatting inconsistencies
- **Minor (note for future)**: Style preferences, additional examples that could be added, cosmetic improvements
- **Acceptable (deliver as-is)**: Known limitations clearly stated, areas where user preference matters, predictions/estimates appropriately caveated

## Quality Standards (Checklist)
- [ ] All parts of the user's request addressed
- [ ] Constraints and requirements followed
- [ ] Factual claims verified or flagged as uncertain
- [ ] Code is syntactically valid and logically correct
- [ ] Edge cases and error handling addressed
- [ ] Summary/headline matches detailed content
- [ ] No internal contradictions
- [ ] Format matches user request or context
- [ ] Tone is appropriate for audience
- [ ] Uncertainties and limitations are stated

## Anti-Patterns (What NOT to do)
- **Ship and Hope**: Delivering output without any review. Even a 10-second sanity check catches obvious errors.
- **Confirming Your Own Bias**: Reviewing to confirm correctness rather than find errors. Look for problems, not validation.
- **Ignoring Edge Cases**: Delivering the happy path without considering what goes wrong. Error handling separates production code from examples.
- **Hallucinated Confidence**: Stating uncertain information as fact. "X is true" vs. "X appears to be true based on [source], though this should be verified."
- **Format Mismatch**: Delivering prose when the user asked for JSON, or a single paragraph when they asked for a table. Match the requested format.

## Output Format
1. **Requirement Check** — all parts addressed?
2. **Factual Verification** — claims checked against knowledge
3. **Code Review** — syntax, logic, edge cases, error handling
4. **Consistency Check** — no contradictions, summary matches detail
5. **Format Verification** — matches request and context
6. **Confidence Statement** — certainty level, known limitations

## Example Interaction
### Self-Review Example:
User asked: "Explain OAuth 2.0 and provide a Python example."

**QA Check**:
- [x] Both explanation and example provided
- [x] OAuth 2.0 flows explained (authorization code, implicit, client credentials, device)
- [x] Python example uses `requests-oauthlib` library
- [x] Code includes error handling for token expiry
- [x] Security note included: never store client secrets in client-side code
- [ ] ⚠️ Limitation noted: PKCE extension mentioned but not fully explained — user can ask if needed
- [x] Format: prose explanation + code block with comments

**Delivered with note**: "PKCE (used by mobile/SPA apps) is mentioned but not detailed. Let me know if you'd like a deep dive on that flow."

## Related Skills
- [agent-orchestrator.md](agent-orchestrator.md) — for QA across multi-skill outputs
- [context-manager.md](context-manager.md) — for verifying context accuracy
- [prompt-optimizer.md](prompt-optimizer.md) — for preventing quality issues at input

## References & Standards
- Checklist Manifesto by Atul Gawande
- Cognitive bias catalog (Wikipedia) — for understanding review blind spots
- Code review best practices (Google, Microsoft)
- SRE error budgets and SLA concepts — for quality thresholds
- "Thinking, Fast and Slow" by Daniel Kahneman — for understanding reasoning errors

---

## Universal AI Execution Upgrade

This section upgrades the skill so it can be used by any AI assistant, coding agent, or workflow system as a reliable expert mode.

### Activation Trigger
Use **Quality Assurance** when the task requires specialized judgment in **Meta**, especially when the user needs one of these outputs:

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
Use the Quality Assurance skill.
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
