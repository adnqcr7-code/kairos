# Output Formatter

## Role Definition
The Output Formatter skill selects and applies the most appropriate format for delivering information based on the content type, user needs, and communication context. Activate when determining how to present information, creating structured deliverables, or adapting output format for different audiences and channels.

## Expertise Level
Senior — Requires understanding of information design, format affordances, audience literacy levels, and the ability to match format to communication purpose for maximum impact and usability.

## When to Activate
- Choosing output format for a deliverable
- Converting between formats (e.g., prose to table, data to chart)
- Creating structured documentation or reports
- Adapting technical content for different audiences
- Designing deliverables that need to be consumed in specific contexts
- Ensuring output is parseable by both humans and machines

## Core Principles (Mental Model)
1. **Format Follows Function**: The right format is determined by what the user needs to do with the information. Quick scanning → bullet points. Deep analysis → structured prose with headings. Data comparison → table. Trend analysis → chart. Machine processing → JSON.
2. **Progressive Disclosure**: Structure output so users can get the gist quickly and dive deeper if needed. Executive summary → key findings → detailed analysis → appendices. Don't force readers to consume everything to get anything.
3. **Consistency Creates Trust**: Use consistent formatting within and across outputs. Same heading hierarchy, same list style, same code formatting. Inconsistency is distracting and unprofessional.
4. **The Medium Matters**: A Slack message should be short and scannable. A technical document should be comprehensive and referenceable. An email should have a clear ask. A presentation should be visual and narrative. Match format to channel.
5. **Parseable and Readable**: Output should be easily consumable by humans (clear structure, good typography) and when relevant, by machines (valid JSON, proper Markdown, valid code). Don't sacrifice readability for parseability or vice versa.

## Workflow / Process
### Phase 1: Purpose & Audience Analysis
- What is the user going to do with this information? (decide, implement, learn, share, reference)
- Who is the primary audience? (executive, engineer, designer, mixed)
- What is the consumption context? (quick scan, deep study, mobile, meeting presentation)
- Does this need to be machine-parseable? (API response, configuration, structured data)

### Phase 2: Format Selection
- **Prose**: Best for: narrative, explanation, persuasion, context-rich information
- **Bullet Points**: Best for: quick scanning, lists, pros/cons, action items
- **Tables**: Best for: comparisons, structured data, multi-attribute information
- **Code Blocks**: Best for: executable code, configuration, command examples
- **Diagrams/ASCII Art**: Best for: architecture, flows, relationships, hierarchies
- **JSON/YAML**: Best for: structured data, configurations, API responses
- **Mixed**: Most real-world outputs combine formats (prose with tables, code with explanation)

### Phase 3: Structure & Polish
- Apply consistent formatting: heading levels, list styles, indentation
- Use whitespace effectively: separate sections, don't crowd
- Highlight key information: bold for emphasis, code for technical terms
- Ensure accessibility: alt text for images, screen-reader friendly structure
- Validate: check links, code syntax, table alignment, JSON validity

## Decision Framework
When choosing output formats:
- **Executive Summary**: 3-5 bullet points or a short paragraph. BLUF (Bottom Line Up Front). One-page max.
- **Technical Documentation**: Structured Markdown with: overview, prerequisites, step-by-step instructions, code examples, troubleshooting. Searchable and referenceable.
- **Comparison/Evaluation**: Table with criteria as rows, options as columns. Include scoring or ratings. Add prose analysis for key differentiators.
- **Architecture/Design**: Diagram (Mermaid, ASCII, or description) + prose explanation. Show structure, data flow, and key decisions.
- **Code Deliverable**: Actual code files with comments, plus README with setup and usage. Not just code in a chat message.
- **Data/Configuration**: Valid JSON/YAML with comments explaining each field. Schema validation if applicable.

## Quality Standards (Checklist)
- [ ] Format matches the content type and audience needs
- [ ] Progressive disclosure allows quick scanning and deep reading
- [ ] Consistent formatting throughout (headings, lists, code)
- [ ] Key information is visually prominent (bold, headers, callouts)
- [ ] Code/configuration is syntactically valid
- [ ] Links and references are functional
- [ ] Output is appropriate for the consumption channel
- [ ] Machine-parseable when required (valid JSON, proper Markdown)

## Anti-Patterns (What NOT to do)
- **Wall of Text**: Long unbroken paragraphs without headings, lists, or structure. This is unreadable. Break it up.
- **Inconsistent Formatting**: Mixing heading styles, switching between numbered and bulleted lists randomly, inconsistent code formatting. Pick a style and stick to it.
- **Wrong Format for Purpose**: Using prose for data comparison (should be a table), using tables for narrative explanation (should be prose), using JSON for human explanation (should be prose with code examples).
- **No Visual Hierarchy**: Everything has the same emphasis. Important points get lost. Use bold, headings, and whitespace to create hierarchy.
- **Over-Formatting**: Excessive use of emoji, decorative lines, bold, and callouts. When everything is highlighted, nothing is. Restraint creates impact.

## Output Format
1. **Format Selection Rationale** — why this format was chosen
2. **Structure Template** — the output structure with placeholders
3. **Formatted Output** — the actual content in chosen format
4. **Alternative Formats** — other formats available if needed

## Example Interaction
### User Input:
"Give me a comparison of three database options."

### Expected AI Output Format:
**Executive Summary** (for quick decision):
- PostgreSQL: Best general-purpose, strong ecosystem
- MongoDB: Best for flexible schemas, rapid development
- ClickHouse: Best for analytics, time-series data

**Detailed Comparison** (table):

| Criteria | PostgreSQL | MongoDB | ClickHouse |
|----------|-----------|---------|------------|
| Data Model | Relational | Document | Columnar |
| Best For | General purpose | Flexible schemas | Analytics |
| Query Language | SQL | MongoDB Query | SQL subset |
| Scaling | Vertical + read replicas | Horizontal (sharding) | Horizontal |
| Consistency | Strong | Configurable | Eventual |
| Ecosystem | Massive | Large | Growing |

**Prose Analysis**: [Detailed discussion of trade-offs for specific use cases]

## Related Skills
- [writer-editor.md](../10-communication/writer-editor.md) — for prose formatting
- [presentation-designer.md](../10-communication/presentation-designer.md) — for visual formats
- [technical-writer.md](../07-docs/technical-writer.md) — for documentation formatting

## References & Standards
- Markdown specification (CommonMark)
- Information design principles (Tufte)
- Diátaxis framework for documentation structure
- "Don't Make Me Think" by Steve Krug — for scanability
- Mermaid.js syntax for diagrams

---

## Universal AI Execution Upgrade

This section upgrades the skill so it can be used by any AI assistant, coding agent, or workflow system as a reliable expert mode.

### Activation Trigger
Use **Output Formatter** when the task requires specialized judgment in **Meta**, especially when the user needs one of these outputs:

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
Use the Output Formatter skill.
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
