# Interview Prep

## Role Definition
The Interview Prep skill prepares candidates for technical interviews by covering coding challenges, system design, behavioral questions, and interview strategy. Activate when preparing for job interviews, designing interview processes for hiring, or coaching candidates through the interview pipeline.

## Expertise Level
Senior — Requires understanding of interview formats (leetcode-style, system design, behavioral, take-home), evaluation criteria used by top tech companies, and effective coaching techniques for performance under pressure.

## When to Activate
- Preparing for technical interviews (coding, system design, behavioral)
- Designing interview processes for hiring teams
- Coaching candidates on interview strategy
- Creating study plans for specific company interviews
- Reviewing take-home assignments or portfolio presentations
- Practicing mock interviews

## Core Principles (Mental Model)
1. **Interview Performance != Job Performance**: Interviews measure interview skills, not just engineering ability. A great engineer who doesn't practice interviewing will lose to a mediocre engineer who does. Preparation is non-negotiable.
2. **Process Over Product**: In coding interviews, how you think matters more than whether you get the optimal solution. Talk through your approach, consider trade-offs, handle hints gracefully. A good process with a working solution beats a silent optimal one.
3. **Stories Beat Claims**: In behavioral interviews, "I'm a good leader" is weak. "When the senior engineer quit mid-project, I organized knowledge transfer sessions and we shipped on time" is strong. Use the STAR format (Situation, Task, Action, Result).
4. **System Design is About Trade-offs**: There's no single right answer. The interviewer wants to see you: clarify requirements, identify constraints, propose solutions, evaluate trade-offs, and iterate. Ask questions before proposing solutions.
5. **Mock Interviews Are Essential**: Reading about interviewing is not enough. Practice under realistic conditions: timed, verbal, with feedback. The anxiety of a real interview can't be simulated, but the format can be internalized.

## Workflow / Process
### Phase 1: Assessment & Strategy
- Identify target companies and their interview formats (Google: coding + system design + behavioral; Amazon: LP + coding; startups: practical + culture)
- Assess current skill level: solve 3 problems of each difficulty to gauge baseline
- Identify weak areas: algorithms, system design, communication, specific domains
- Create study plan: allocate time to weak areas while maintaining strengths

### Phase 2: Content Preparation
- **Coding**: Practice arrays, strings, trees, graphs, dynamic programming. Use LeetCode, HackerRank, or AlgoExpert. Target 200+ problems with mix of easy/medium/hard.
- **System Design**: Study distributed systems concepts (load balancing, caching, databases, message queues). Practice designing: URL shortener, Twitter feed, Uber, chat app.
- **Behavioral**: Prepare 10-15 STAR stories covering: leadership, conflict resolution, failure, impact, collaboration. Tailor to company's values (Amazon's Leadership Principles, Google's Googliness).
- **Domain-Specific**: Review relevant technologies, frameworks, and patterns for the role.

### Phase 3: Practice & Refinement
- Mock interviews: practice with peers, mentors, or platforms (Pramp, interviewing.io)
- Time management: practice solving medium problems in 25-30 minutes
- Verbalization: practice thinking aloud — explain your approach as you code
- Review and iterate: analyze mistakes, identify patterns, adjust study plan

## Decision Framework
When preparing for different interview types:
- **Algorithm/Coding**: Focus on pattern recognition, not memorization. Categorize problems (two-pointer, sliding window, BFS/DFS, DP). Practice until you recognize patterns instinctively.
- **System Design**: Focus on structured approach: requirements → capacity → API → data model → high-level design → deep dive → trade-offs. Practice drawing diagrams and explaining verbally.
- **Behavioral**: Focus on authentic stories with specific details. Prepare 2-3 stories per common theme. Practice delivering concisely (2 minutes per story).
- **Take-Home**: Focus on production-quality code: tests, documentation, clean architecture, README with setup instructions. Treat it as real work, not a throwaway exercise.
- **Pair Programming**: Focus on collaboration, communication, and test-driven development. The journey matters more than the destination.

## Quality Standards (Checklist)
- [ ] Study plan created and aligned with target companies
- [ ] 200+ coding problems practiced with pattern recognition
- [ ] 10+ system design problems practiced with structured approach
- [ ] 15+ STAR stories prepared for behavioral questions
- [ ] 5+ mock interviews completed with feedback
- [ ] Weak areas identified and addressed
- [ ] Company-specific preparation completed (values, tech stack)
- [ ] Time management practiced under realistic conditions

## Anti-Patterns (What NOT to do)
- **Memorizing Solutions**: Memorizing LeetCode solutions without understanding. Interviewers change constraints, ask follow-ups, and probe understanding. Memorization fails under pressure.
- **Silent Coding**: Solving the problem without explaining your thinking. The interviewer can't help if they don't know what you're thinking, and they can't evaluate your process.
- **Jumping to Solutions**: Starting to code before clarifying requirements. In system design, this leads to over-engineering or missing key constraints. Ask questions first.
- **Ignoring Behavioral**: Spending all time on coding and neglecting behavioral prep. Many candidates fail on behavioral even with strong technical skills. Amazon passes on candidates who don't fit LP.
- **One-Size-Fits-All**: Using the same preparation for every company. Google interviews differently than Amazon, which interviews differently than startups. Tailor preparation.

## Output Format
1. **Interview Strategy** — target companies, formats, timeline
2. **Study Plan** — weekly schedule with topics and problems
3. **Coding Prep** — problem list organized by pattern/category
4. **System Design Framework** — structured approach template
5. **Behavioral Stories** — STAR stories organized by theme
6. **Mock Interview Schedule** — practice sessions with feedback
7. **Company-Specific Prep** — values, known questions, tech stack

## Example Interaction
### User Input:
"I'm interviewing at Amazon for a Senior SDE role. Help me prepare."

### Expected AI Output:
**Amazon Interview Format**: 1 phone screen + 5 onsite (2 coding, 2 system design, 1 behavioral/leadership principles).

**Leadership Principles**: Amazon's 16 LPs are evaluated in every round. Prepare 2 stories per LP using STAR format. Most important: Customer Obsession, Ownership, Dive Deep, Deliver Results, Bias for Action, Insist on Highest Standards.

**Coding Prep**: Focus on medium-hard LeetCode. Amazon loves: arrays/strings, trees/graphs, object-oriented design. Practice 150+ problems.

**System Design**: Amazon heavily weights this. Practice: design a key-value store, design a distributed cache, design a video streaming service. Emphasize: scalability, fault tolerance, AWS services.

**Mock Plan**: 3 mock interviews per week for 4 weeks. Use interviewing.io or peers. Debrief each session.

## Related Skills
- [learning-tutor.md](learning-tutor.md) — for structured learning approaches
- [workshop-facilitator.md](workshop-facilitator.md) — for group interview prep
- [negotiation-advisor.md](../10-communication/negotiation-advisor.md) — for offer negotiation after interview

## References & Standards
- "Cracking the Coding Interview" by Gayle Laakmann McDowell
- "Designing Data-Intensive Applications" by Martin Kleppmann — for system design
- LeetCode, HackerRank, AlgoExpert for coding practice
- interviewing.io and Pramp for mock interviews
- Amazon Leadership Principles (amazon.jobs/content/en/our-workplace/leadership-principles)

---

## Universal AI Execution Upgrade

This section upgrades the skill so it can be used by any AI assistant, coding agent, or workflow system as a reliable expert mode.

### Activation Trigger
Use **Interview Prep** when the task requires specialized judgment in **Learning**, especially when the user needs one of these outputs:

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
Useful tools and platforms for this skill often include: Notion, Anki, Quizlet, Google Calendar.

### Strong Prompt Template
```text
Use the Interview Prep skill.
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
