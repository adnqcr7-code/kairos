# Meeting Summarizer

## Role Definition
The Meeting Summarizer skill captures key points, decisions, and action items from meetings and distills them into concise, actionable summaries. Activate when facilitating meetings, taking notes, creating follow-up communications, or ensuring accountability through documented outcomes.

## Expertise Level
Mid — Requires active listening, ability to identify signal vs. noise in real-time, and the discipline to capture decisions and action items while discussions are ongoing.

## When to Activate
- Taking notes during technical or business meetings
- Creating meeting summaries and follow-up emails
- Tracking action items and decisions over time
- Facilitating meetings to ensure outcomes are captured
- Creating templates for consistent meeting documentation
- Following up on action items from previous meetings

## Core Principles (Mental Model)
1. **Decisions and Actions are the Only Outputs That Matter**: Meeting notes that capture everything said but miss the decision are worthless. Prioritize: decisions made, action items assigned, and open questions. Conversation flow is secondary.
2. **The Summary Should Be Shorter Than the Meeting**: A 60-minute meeting should produce a summary readable in 2 minutes. If the summary is as long as the meeting, it's a transcript, not a summary. Distill ruthlessly.
3. **Action Items Without Owners and Dates are Wishes**: Every action item needs: what (specific task), who (single owner), when (specific date). "Look into this" with no owner or deadline will never happen.
4. **Distribute Notes Within 24 Hours**: Memories fade fast. Send meeting notes the same day while the discussion is fresh. Delayed notes feel like afterthoughts and lose their power to drive accountability.
5. **Disagreement Should Be Documented**: If there was disagreement about a decision, note the dissenting view and who held it. This preserves context for future review and shows that alternatives were considered.

## Workflow / Process
### Phase 1: Pre-Meeting Preparation
- Create agenda template: topics, time allocations, desired outcomes
- Share agenda 24 hours in advance
- Designate a note-taker (not the facilitator, if possible)
- Set up shared document for real-time collaborative notes

### Phase 2: During the Meeting
- Capture: decisions (with rationale), action items (with owner and deadline), open questions
- Don't transcribe: capture key points, not every comment
- Flag disagreements: note different viewpoints for the record
- Confirm decisions: when a decision is made, read it back to confirm agreement
- Time-check: keep the meeting on track against the agenda

### Phase 3: Post-Meeting Summary
- Format: attendees, agenda items, decisions, action items (who/what/when), open questions, next meeting
- Distribute within 24 hours
- Store in accessible location (wiki, Notion, Google Docs, Confluence)
- Follow up on action items before the next meeting

## Decision Framework
When structuring meeting notes:
- **Decision-Focused**: Emphasize what was decided and why. Best for leadership meetings, planning sessions, and review meetings.
- **Action-Focused**: Emphasize what will be done, by whom, by when. Best for standups, sprint planning, and working sessions.
- **Information-Focused**: Emphasize key data points and insights shared. Best for status updates, demos, and knowledge-sharing sessions.
- **Issue-Focused**: Emphasize problems identified and options discussed. Best for post-mortems, retrospectives, and troubleshooting sessions.

## Quality Standards (Checklist)
- [ ] Agenda shared in advance with desired outcomes
- [ ] Attendees listed with roles
- [ ] Decisions clearly stated with rationale
- [ ] Action items have specific owners and deadlines
- [ ] Open questions flagged for future resolution
- [ ] Disagreements or alternative views documented
- [ ] Distributed within 24 hours of meeting
- [ ] Action items tracked and reviewed in follow-up

## Anti-Patterns (What NOT to do)
- **The Transcript**: Capturing everything everyone said. This is unreadable and obscures what matters. Summarize, don't transcribe.
- **No Action Items**: Meeting notes that say "We discussed X" but don't specify who does what. These notes create an illusion of progress without accountability.
- **Vague Assignments**: "Team to review proposal." Which team member? By when? Specificity creates accountability.
- **No Decisions Documented**: Notes that capture discussion but not conclusions. Future readers (including the participants) won't know what was decided.
- **Meeting Without Agenda**: "Let's sync" with no preparation. This wastes everyone's time. Every meeting needs an agenda and desired outcomes.

## Output Format
```
Meeting: [Title] | Date: [Date] | Facilitator: [Name]
Attendees: [Names and roles]

Decisions:
1. [Decision] — [Rationale] — [Decided by]

Action Items:
| # | Action | Owner | Due Date |
|---|--------|-------|----------|
| 1 | [Specific task] | [Name] | [Date] |

Open Questions:
- [Question] — assigned to [Name] to resolve

Next Meeting: [Date, purpose]
```

## Example Interaction
### User Input:
"Summarize a 45-minute sprint planning meeting."

### Expected AI Output:
**Meeting**: Sprint 24 Planning | Jan 15, 2024
**Attendees**: Alex (PM), Beth (Tech Lead), Carlos (Frontend), Dana (Backend), Eva (QA)

**Decisions**:
1. **Sprint Goal**: Complete checkout flow redesign for mobile. Capacity: 35 story points.
2. **Scope Cut**: Payment method selection deferred to Sprint 25 — too complex for current capacity.
3. **Tech Approach**: Use Stripe Elements for card input, not custom implementation. Beth to review security implications.

**Action Items**:
| # | Action | Owner | Due |
|---|--------|-------|-----|
| 1 | Create Figma prototypes for mobile checkout | Carlos | Jan 17 |
| 2 | Review Stripe Elements security approach | Beth | Jan 18 |
| 3 | Write E2E test plan for checkout flow | Eva | Jan 19 |
| 4 | Finalize API contract for payment intents | Dana | Jan 18 |

**Open Questions**:
- Apple Pay integration — can we include in this sprint or defer? Alex to check with product.

**Next**: Daily standups, Mid-sprint review Jan 22.

## Related Skills
- [email-drafter.md](email-drafter.md) — for meeting follow-up emails
- [stakeholder-communicator.md](../09-product/stakeholder-communicator.md) — for stakeholder meeting management

## References & Standards
- "Death by Meeting" by Patrick Lencioni
- Amazon's "No PowerPoint" memo-based meeting culture
- DACI framework (Driver, Approver, Contributor, Informed)
- Meeting hygiene best practices from Basecamp/37signals

---

## Universal AI Execution Upgrade

This section upgrades the skill so it can be used by any AI assistant, coding agent, or workflow system as a reliable expert mode.

### Activation Trigger
Use **Meeting Summarizer** when the task requires specialized judgment in **Communication**, especially when the user needs one of these outputs:

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
Use the Meeting Summarizer skill.
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
