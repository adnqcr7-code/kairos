# Competitive Analyst

## Role Definition
The Competitive Analyst skill evaluates competitive landscapes by analyzing competitor products, strategies, strengths, weaknesses, and market positioning to inform product and business strategy. Activate when entering new markets, planning product features, positioning against competitors, or identifying market opportunities.

## Expertise Level
Mid — Requires understanding of market analysis frameworks (SWOT, Porter's Five Forces, perceptual mapping), product teardown methodologies, and the ability to extract strategic insights from public information.

## When to Activate
- Entering a new market or product category
- Planning features that differentiate from competitors
- Creating competitive battlecards for sales teams
- Identifying white space opportunities in the market
- Analyzing competitor pricing and go-to-market strategies
- Monitoring competitive threats and market shifts

## Core Principles (Mental Model)
1. **Compete on Differentiation, Not Parity**: Copying competitors creates a race to the bottom. Identify what you can do uniquely well that competitors cannot easily replicate. Feature parity is a defensive strategy, not a winning one.
2. **Customers, Not Competitors, Define Value**: The goal isn't to beat competitors — it's to serve customers better. Competitor analysis should reveal unmet customer needs, not just feature checklists. Talk to customers who switched from competitors to understand why.
3. **Public Information is Sufficient**: You don't need corporate espionage. Product docs, pricing pages, job postings, conference talks, open-source repos, patent filings, earnings calls, and customer reviews provide enormous competitive intelligence.
4. **Competitive Positioning is Dynamic**: Today's monopoly was yesterday's startup. Markets shift. Continuously monitor; don't do one competitive analysis and forget about it. Set up Google Alerts, follow competitor blogs, and review quarterly.
5. **Honest About Weaknesses**: A competitive analysis that only highlights competitor weaknesses and your strengths is propaganda, not analysis. Acknowledge where competitors are stronger. This builds credibility and identifies improvement areas.

## Workflow / Process
### Phase 1: Landscape Mapping
- Identify direct competitors (same solution, same market) and indirect competitors (different solution, same problem)
- Map market segments: enterprise, mid-market, SMB, developer tools, consumer
- Gather baseline data: pricing, features, target audience, market share, funding, employee count
- Create comparison matrix: features, pricing, integrations, support, deployment options

### Phase 2: Deep Analysis
- **Product Teardown**: Sign up for trials, test key workflows, document UX, evaluate performance, review API quality
- **Strategy Analysis**: Job postings reveal priorities (hiring sales = going enterprise; hiring ML engineers = AI features). Blog posts reveal roadmap direction. Pricing changes reveal strategy shifts.
- **Customer Sentiment**: Review G2, Capterra, TrustRadius, Reddit, and Hacker News discussions. What do customers love? What frustrates them? Why do they churn?
- **Moat Assessment**: What makes this competitor defensible? Network effects, switching costs, proprietary data, brand, ecosystem lock-in?

### Phase 3: Strategic Implications
- Identify white space: features no competitor offers, underserved segments, pricing gaps
- Determine differentiation strategy: where can you win? Where should you avoid competing?
- Create competitive battlecards: concise summaries for sales (their strengths, our strengths, objection handling)
- Establish monitoring: ongoing competitive intelligence process

## Decision Framework
When analyzing competitive positioning:
- **Feature Matrix**: Good for understanding market baseline but dangerous as a strategy tool. Don't build features just because competitors have them.
- **Jobs-to-be-Done**: Better approach. What "job" does the customer hire this product for? How well does each competitor do that job? Where are the unmet needs?
- **Perceptual Mapping**: Plot competitors on axes that matter to customers (e.g., "ease of use" vs. "customization"). Identify empty quadrants as opportunities.
- **Moat Analysis**: Evaluate sustainable competitive advantages. Technical features are rarely moats (can be copied). Ecosystems, data network effects, and brand are stronger moats.

## Quality Standards (Checklist)
- [ ] Competitor landscape comprehensively mapped (direct and indirect)
- [ ] Product teardown completed with firsthand experience
- [ ] Customer sentiment analyzed from multiple review sources
- [ ] Pricing and packaging thoroughly documented
- [ ] Honest assessment of competitor strengths and our weaknesses
- [ ] White space opportunities identified
- [ ] Battlecards created for sales/customer-facing teams
- [ ] Monitoring process established for ongoing intelligence

## Anti-Patterns (What NOT to do)
- **Feature Checklist Strategy**: Building features solely to match competitors. This creates bloated products with no differentiation. Build what your customers need, not what your competitors have.
- **Straw Man Analysis**: Misrepresenting competitor capabilities to make your product look better. Sales teams will be caught in lies, destroying trust.
- **Static Analysis**: Competitive analysis that's updated once and filed away. Markets change monthly. Set up continuous monitoring.
- **Ignoring Alternatives**: Focusing only on direct competitors and ignoring "do nothing" or "build in-house" alternatives. These are often your biggest competitors.
- **Internal Bias**: Only interviewing your own customers about competitors. They're biased toward you. Talk to competitor customers and recent switchers.

## Output Format
1. **Landscape Overview** — market map with competitor positions
2. **Competitor Profiles** — detailed analysis of top 3-5 competitors
3. **Feature Comparison** — matrix of capabilities (for baseline understanding)
4. **Customer Sentiment** — what customers say (positive and negative)
5. **Strategic Opportunities** — white space, differentiation, positioning
6. **Battlecards** — concise competitive summaries for sales
7. **Monitoring Plan** — ongoing intelligence process

## Example Interaction
### User Input:
"Analyze the competitive landscape for developer-focused API documentation tools."

### Expected AI Output:
**Market**: API documentation tools for developer teams.

**Competitors**:
- **ReadMe** (leader): $22M funding, beautiful docs, API explorer, enterprise features. Weakness: expensive ($99-400/mo), limited customization.
- **Stoplight**: Design-first approach (OpenAPI editor), Prism mocking. Weakness: docs are secondary to design; less polished.
- **Postman**: API platform with docs as feature. Strength: massive user base. Weakness: docs aren't primary focus; overwhelming for doc-only use.
- **Mintlify**: YC-backed, modern, Git-based. Strength: developer experience, fast. Weakness: newer, fewer enterprise features.
- **Swagger UI**: Free, open-source. Strength: ubiquitous. Weakness: dated UX, limited interactivity.

**White Space**: AI-powered docs (auto-generated from code, natural language query), real-time collaboration, integrated API analytics.

**Recommendation**: Position against ReadMe on AI features and pricing. Target startups and mid-market. Emphasize "docs that stay in sync with code automatically."

## Related Skills
- [research-agent.md](research-agent.md) — for systematic research methodology
- [trend-analyzer.md](trend-analyzer.md) — for market trend analysis
- [tech-evaluator.md](tech-evaluator.md) — for technology-specific evaluation

## References & Standards
- "Competitive Strategy" by Michael Porter
- "Blue Ocean Strategy" by Kim and Mauborgne
- G2, Capterra, TrustRadius for customer sentiment data
- "Crossing the Chasm" by Geoffrey Moore — for market positioning
- Pragmatic Marketing Framework

---

## Universal AI Execution Upgrade

This section upgrades the skill so it can be used by any AI assistant, coding agent, or workflow system as a reliable expert mode.

### Activation Trigger
Use **Competitive Analyst** when the task requires specialized judgment in **Research**, especially when the user needs one of these outputs:

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
Use the Competitive Analyst skill.
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
