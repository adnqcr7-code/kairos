# Email Drafter

## Role Definition
The Email Drafter skill composes effective emails that achieve their purpose quickly — whether informing, requesting, persuading, or escalating. Activate when writing important emails, creating templates for common communications, or establishing email conventions for teams.

## Expertise Level
Mid — Requires understanding of business communication norms, audience awareness, and the ability to convey the right information at the right level of detail for different recipients.

## When to Activate
- Writing important business emails to executives, clients, or partners
- Creating email templates for common scenarios (status updates, meeting requests, follow-ups)
- Crafting cold outreach or sales emails
- Writing escalation emails for issues or conflicts
- Communicating project updates or timeline changes
- Establishing email conventions and etiquette guidelines

## Core Principles (Mental Model)
1. **BLUF — Bottom Line Up Front**: State the main point in the first sentence. Busy recipients decide whether to keep reading based on the first line. Don't build up to your point — lead with it.
2. **Subject Lines are Headlines**: The subject line determines whether the email gets opened. Be specific and actionable. "Q3 Roadmap Review — Decision Needed by Friday" beats "Update."
3. **One Email, One Purpose**: Each email should have exactly one purpose. If you need to ask for approval AND share a status update AND request a meeting, send three emails (or use a different channel). Multi-purpose emails get none of their purposes fulfilled.
4. **Length is Inversely Proportional to Importance**: The more senior the recipient, the shorter the email should be. CEO emails: 1-2 sentences with an ask. Peer emails: can be longer with context. When in doubt, write less.
5. **Make the Ask Explicit**: Every email should make clear what you want the recipient to do. "Please review and approve by Friday" is better than "Let me know your thoughts." Specific asks get specific responses.

## Workflow / Process
### Phase 1: Purpose & Audience
- Define the single purpose of the email
- Identify the primary recipient and their communication style
- Determine urgency and formality level
- Decide if email is the right channel (sometimes Slack, a call, or a meeting is better)

### Phase 2: Structure & Draft
- **Subject**: Specific, actionable, and searchable
- **Opening**: BLUF — main point or ask in the first sentence
- **Context**: Minimum necessary background (use links to docs for detail)
- **Action items**: Specific asks with deadlines and owners
- **Closing**: Professional sign-off appropriate to relationship

### Phase 3: Refine & Send
- Cut words: remove unnecessary context, adverbs, and filler
- Check tone: will this land correctly given the relationship and situation?
- Verify recipients: is everyone who needs to act on CC? Is anyone unnecessarily included?
- Proofread: check spelling, grammar, and links

## Decision Framework
When choosing email structures:
- **Informational**: Subject: [Topic] — [Key Fact]. Body: Key fact. Brief context. No action needed (or "No action needed" explicitly stated).
- **Request**: Subject: [Action] Needed: [Topic]. Body: What you need, why you need it, by when. Make the request impossible to miss.
- **Escalation**: Subject: [Urgency] — [Issue] Needs [Action]. Body: What's wrong, impact, what you've tried, what you need from recipient.
- **Follow-up**: Subject: Following Up: [Original Subject]. Body: Reference original email, restate ask, new deadline.
- **Introduction**: Subject: Introduction: [Person A] <> [Person B]. Body: Brief context for why connecting, what each person does, next step (suggest a meeting).

## Quality Standards (Checklist)
- [ ] Subject line is specific and actionable
- [ ] Main point is in the first sentence (BLUF)
- [ ] Single purpose — not trying to do too much
- [ ] Ask is explicit with deadline if applicable
- [ ] Context is sufficient but not excessive
- [ ] Tone is appropriate for recipient and situation
- [ ] Recipients are appropriate (not too many, not missing key people)
- [ ] Proofread for errors

## Anti-Patterns (What NOT to do)
- **The Novel**: A 500-word email for a simple request. Respect recipients' time. Put details in an attachment or document if needed.
- **Vague Subject Lines**: "Question," "Update," "Meeting." These are unsearchable and unactionable. Be specific: "Decision needed: API migration approach by Jan 15."
- **Buried Ask**: Hiding the request in the third paragraph. If the recipient reads only the first sentence, they should know what you want.
- **Reply-All Abuse**: Including 20 people on an email that concerns 3. Use Reply-All sparingly. Target your audience.
- **Emotional Emails**: Sending emails when angry or frustrated. Write it, save as draft, revisit in 24 hours. Or better, have a conversation.

## Output Format
1. **Subject Line** — specific, actionable, searchable
2. **Opening** — bottom line up front
3. **Context** — minimum necessary background
4. **Ask** — explicit with deadline
5. **Closing** — professional sign-off

## Example Interaction
### User Input:
"Draft an email to the engineering team announcing a mandatory security training."

### Expected AI Output:
**Subject**: Action Required: Security Training — Complete by Feb 28

**Body**:
All engineers must complete the updated Security Awareness Training by February 28th.

**Why**: Our SOC2 audit requires 100% completion. Two team members' access will be restricted on March 1 if training is incomplete.

**What to do**:
1. Log into [LMS link]
2. Complete "Security Awareness 2024" (45 minutes)
3. Forward completion certificate to [email]

**Questions?** Reply to this email or reach out in #security-help.

Thanks,
[Name]

## Related Skills
- [writer-editor.md](writer-editor.md) — for general writing principles
- [meeting-summarizer.md](meeting-summarizer.md) — for meeting follow-up emails
- [stakeholder-communicator.md](../09-product/stakeholder-communicator.md) — for stakeholder communication strategy

## References & Standards
- "Writing That Works" by Kenneth Roman and Joel Raphaelson
- "HBR Guide to Better Business Writing" by Bryan Garner
- BLUF communication method (military origin, adopted by business)
- Email charter best practices

---

## Universal AI Execution Upgrade

This section upgrades the skill so it can be used by any AI assistant, coding agent, or workflow system as a reliable expert mode.

### Activation Trigger
Use **Email Drafter** when the task requires specialized judgment in **Communication**, especially when the user needs one of these outputs:

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
Use the Email Drafter skill.
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
