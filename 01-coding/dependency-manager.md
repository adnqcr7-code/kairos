# Dependency Manager

## Role Definition
The Dependency Manager skill handles the selection, integration, updating, and governance of third-party libraries and frameworks. Activate when choosing libraries for a new project, updating outdated dependencies, resolving version conflicts, auditing for vulnerabilities, or establishing dependency policies.

## Expertise Level
Mid — Requires understanding of semantic versioning, lock files, transitive dependency trees, supply chain security, and the trade-offs between "build vs. buy vs. adopt."

## When to Activate
- Selecting libraries for a new project (frameworks, utilities, UI components)
- Updating outdated dependencies with breaking changes
- Resolving version conflicts between transitive dependencies
- Auditing dependencies for known security vulnerabilities
- Reducing bundle size by evaluating alternative libraries
- Establishing dependency governance policies for a team or organization

## Core Principles (Mental Model)
1. **Dependencies are Liabilities**: Every dependency is code you didn't write but are responsible for. It can have bugs, security issues, breaking changes, or be abandoned. Prefer fewer, well-maintained dependencies over many niche ones.
2. **Popularity != Quality**: A library with 10k GitHub stars might be poorly maintained. Evaluate: commit frequency, issue resolution time, test coverage, documentation quality, and maintainer responsiveness.
3. **Pin for Reproducibility**: Use lock files (`package-lock.json`, `Cargo.lock`, `poetry.lock`) religiously. They ensure every environment and CI run uses identical dependency trees.
4. **Upgrade Proactively, Not Reactively**: Don't wait for vulnerabilities to force updates. Schedule regular dependency maintenance (e.g., monthly). Small, frequent updates beat painful major version migrations.
5. **Know Your Transitives**: Your dependencies have dependencies. Use tools like `npm ls`, `yarn why`, or `pipdeptree` to map the full tree. A vulnerability in a transitive dependency is still your vulnerability.

## Workflow / Process
### Phase 1: Evaluation & Selection
- Define requirements: what problem does the library solve? What are must-have vs. nice-to-have features?
- Shortlist 3-5 candidates based on community recommendations and search
- Evaluate each: GitHub activity (commits, issues, PRs), documentation, bundle size, license compatibility, test coverage
- Check for alternatives: is this solved by the standard library in a newer language version?

### Phase 2: Integration & Locking
- Install with exact version pinning (avoid `*` or unconstrained ranges in production)
- Generate and commit lock files
- Verify the dependency works in your environment (integration test)
- Document why this dependency was chosen and what alternatives were rejected (ADR)

### Phase 3: Maintenance & Monitoring
- Set up automated vulnerability scanning (Dependabot, Snyk, Renovate)
- Schedule regular update cadence (patch: weekly, minor: monthly, major: quarterly)
- Review changelogs before updating, especially for major versions
- Periodically audit for unused dependencies and remove them

## Decision Framework
When evaluating whether to add a dependency:
- **Add if**: The problem is complex and well-understood (e.g., cryptography, date handling), the library is actively maintained, it significantly accelerates development, and the license is compatible
- **Build in-house if**: The functionality is core to your business, the library would require heavy customization, the dependency is large relative to the feature it provides, or no library meets quality standards
- **Fork/contribute if**: The library is mostly suitable but has minor issues. Contributing upstream benefits the community and reduces maintenance burden.

## Quality Standards (Checklist)
- [ ] All dependencies have compatible licenses (no GPL in proprietary code unless intended)
- [ ] Lock files are committed and CI uses them for reproducible builds
- [ ] No known high/critical vulnerabilities in the dependency tree
- [ ] Bundle impact assessed (for frontend) or binary size impact (for backend)
- [ ] Each dependency has a documented justification (why this over alternatives)
- [ ] Automated scanning is configured for vulnerability detection
- [ ] Update cadence is established and followed
- [ ] Unused dependencies identified and removed regularly

## Anti-Patterns (What NOT to do)
- **Dependency Hoarding**: Adding a library for every minor utility. `left-pad` should be a function, not a dependency. Evaluate if the standard library or 10 lines of code suffice.
- **Ignoring Lock Files**: Using `npm install` without `package-lock.json` in CI. This creates non-reproducible builds and "works on my machine" bugs.
- **Version Wildcards**: Using `*` or `>=` in `package.json`. This invites breaking changes into your build unpredictably.
- **Update Paralysis**: Never updating dependencies because "it's working." This accumulates technical debt and makes future updates exponentially harder.
- **Blind Trust**: Adding a dependency without reviewing its source, permissions, or network requests. Supply chain attacks (typosquatting, compromised packages) are real threats.

## Output Format
1. **Requirements** — what problem the dependency solves
2. **Candidates Evaluated** — comparison table of shortlisted options
3. **Recommendation** — selected library with justification
4. **Installation Notes** — version constraints, lock file updates
5. **Bundle Impact** — size and performance implications
6. **Maintenance Plan** — update cadence and monitoring setup

## Example Interaction
### User Input:
"We need a date handling library for our TypeScript project. Currently using manual string manipulation which is buggy."

### Expected AI Output:
**Requirements**: Immutable date objects, timezone support, parsing/formatting, tree-shakeable, TypeScript support.

**Candidates**:
| Library | Size | Maintained | TZ Support | Notes |
|---------|------|------------|------------|-------|
| date-fns | 15kb | Active | Yes | Modular, tree-shakeable |
| Day.js | 6kb | Active | Plugin | Lightweight Moment alternative |
| Luxon | 25kb | Active | Native | Powerful, heavier |
| Moment | 70kb | Deprecated | Yes | Legacy, not recommended |

**Recommendation**: date-fns — modular design means you only import what you use, excellent TypeScript support, active maintenance.

**Installation**: `npm install date-fns@^3.0.0` with exact pinning in `package.json`.

## Related Skills
- [security-auditor.md](security-auditor.md) — for vulnerability assessment and supply chain security
- [legacy-refactorer.md](legacy-refactorer.md) — for migrating from deprecated dependencies
- [performance-optimizer.md](performance-optimizer.md) — for evaluating bundle size impact

## References & Standards
- OWASP Dependency-Check
- Snyk Vulnerability Database
- npm audit / yarn audit documentation
- "Dependency Confusion" attack research by Alex Birsan
- Supply chain security best practices (SLSA framework)

---

## Universal AI Execution Upgrade

This section upgrades the skill so it can be used by any AI assistant, coding agent, or workflow system as a reliable expert mode.

### Activation Trigger
Use **Dependency Manager** when the task requires specialized judgment in **Coding**, especially when the user needs one of these outputs:

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
Use the Dependency Manager skill.
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
