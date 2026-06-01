# Component Library

## Role Definition
The Component Library skill designs, builds, and maintains reusable UI component systems that ensure visual consistency, accelerate development, and improve accessibility across applications. Activate when creating design systems, building shared component libraries, standardizing UI patterns, or evaluating third-party component frameworks.

## Expertise Level
Senior — Requires understanding of component composition patterns, design tokens, theming architectures, semantic versioning for UI, and the balance between flexibility and consistency.

## When to Activate
- Creating a component library or design system for an organization
- Building reusable UI primitives (Button, Input, Modal, Dropdown)
- Implementing design tokens for colors, typography, spacing
- Setting up theming (light/dark mode, brand customization)
- Documenting components with Storybook or similar tools
- Evaluating third-party component libraries (shadcn/ui, Material UI, Chakra, Radix)

## Core Principles (Mental Model)
1. **Composition Over Configuration**: A component with 20 props is hard to use and maintain. Instead, use composition: slots, render props, or compound components. `<Dropdown><Dropdown.Trigger /><Dropdown.Menu /></Dropdown>` is more flexible than `<Dropdown trigger="..." items={[...]} />`.
2. **Design Tokens are the Source of Truth**: Colors, spacing, typography, and shadows should be defined as tokens (CSS variables or JS objects), not hardcoded. Tokens enable theming, consistency, and design-to-code alignment.
3. **Headless is the Foundation**: Separate component logic (state, keyboard navigation, ARIA) from styling. Headless libraries (Radix, Headless UI, React ARIA) provide accessible logic; your layer adds visual design. This is the most maintainable approach.
4. **Version as a Contract**: Component libraries are consumed by multiple teams. Use semantic versioning strictly. Breaking changes (prop renames, visual changes) require major version bumps and migration guides.
5. **Documentation is Usage**: A component without documentation doesn't exist. Every component needs: description, props table, live examples, accessibility notes, and do/don't guidance. Storybook is the standard.

## Workflow / Process
### Phase 1: Token & Foundation Design
- Define design tokens: colors (primary, secondary, semantic), spacing scale (4px base), typography (font family, sizes, weights, line heights), radii, shadows
- Set up theming: CSS variables for web, theme objects for React, support for light/dark/custom themes
- Create global styles: CSS reset/normalize, base styles, utility classes
- Establish naming conventions: BEM, CSS Modules, or utility-first (Tailwind)

### Phase 2: Component Development
- Start with primitives: Box, Stack, Text (layout), Button, Input, Label (forms)
- Build composed components: Card, Modal, Dropdown, Tabs, Accordion
- Ensure accessibility: keyboard navigation, ARIA attributes, focus management
- Add TypeScript: strict prop types, forwardRef support, polymorphic components (`as` prop)
- Write tests: unit tests for logic, visual regression tests for UI

### Phase 3: Distribution & Documentation
- Package for distribution: bundling (Rollup, Vite), tree-shaking support, ESM/CJS dual format
- Set up Storybook with stories for each component, controls for interactive props, accessibility addon
- Create documentation site: installation, theming guide, component API, migration guides
- Version and publish: semantic versioning, changelog, deprecation strategy

## Decision Framework
When choosing component library approaches:
- **Headless + Custom Styling (Recommended)**: Radix UI, Headless UI, React ARIA for logic + Tailwind/CSS Modules for styling. Maximum control, minimal bundle, full accessibility.
- **shadcn/ui**: Copy-paste accessible components into your project. Full ownership, easy customization, no dependency on external package updates. Best for modern React/Next.js.
- **Full Library (MUI/Chakra)**: Material UI, Chakra UI, Ant Design. Faster to start, opinionated styling, large ecosystem. Risk of "looks like every other MUI app."
- **Custom from Scratch**: Only when design requirements are truly unique and headless libraries don't meet needs. High maintenance burden.

## Quality Standards (Checklist)
- [ ] All components pass WCAG 2.1 AA accessibility standards
- [ ] Design tokens are centralized and support theming
- [ ] Components are composable, not configured through dozens of props
- [ ] TypeScript types are strict and exported for consumers
- [ ] Storybook documentation exists for every component
- [ ] Visual regression tests catch unintended UI changes
- [ ] Bundle impact is measured and documented for each component
- [ ] Breaking changes follow semantic versioning with migration guides

## Anti-Patterns (What NOT to do)
- **The God Component**: A `<Table>` component with 50 props for every possible feature. Break it into `<Table>`, `<Table.Header>`, `<Table.Row>`, `<Table.Cell>`.
- **Tight Coupling to Business Logic**: Components that fetch their own data or depend on specific API shapes. Components should receive data via props.
- **Inconsistent API Surface**: Some components use `isOpen`, others use `open`, others use `visible`. Establish naming conventions and follow them.
- **No Deprecation Strategy**: Removing props without warnings. Use deprecation notices, codemods, and migration guides.
- **Copy-Paste Without Attribution**: Copying components from one project to another without the design system. Creates divergence and maintenance nightmares.

## Output Format
1. **Library Architecture** — technology stack, styling approach, distribution method
2. **Design Tokens** — complete token specification
3. **Component Catalog** — list of components with status (planned, WIP, stable)
4. **API Conventions** — naming, prop patterns, composition model
5. **Theming Guide** — how to customize and create themes
6. **Documentation Plan** — Storybook setup, documentation structure

## Example Interaction
### User Input:
"We need a component library for our SaaS product. We use React and Tailwind."

### Expected AI Output:
**Architecture**: shadcn/ui-based approach — copy Radix UI primitives, style with Tailwind, full ownership, no external dependency.

**Tokens** (Tailwind config extension):
- Colors: `primary`, `secondary`, `destructive`, `muted`, `accent` with dark mode variants
- Spacing: 4px base scale (1 = 4px, 2 = 8px, ... 12 = 48px)
- Radius: `sm` (4px), `md` (8px), `lg` (12px), `full` (9999px)

**Components**: Button, Input, Select, Dialog, Dropdown Menu, Tabs, Table, Toast, Tooltip. All built on Radix primitives for accessibility.

**Distribution**: Components live in `components/ui/` directory, imported directly. No npm package — updates via copy-paste from upstream or custom modifications.

## Related Skills
- [ui-architect.md](ui-architect.md) — for frontend architecture using the component library
- [accessibility-auditor.md](accessibility-auditor.md) — for ensuring accessible components
- [responsive-designer.md](responsive-designer.md) — for responsive component behavior

## References & Standards
- Radix UI Primitives (radix-ui.com)
- React ARIA (react-spectrum.adobe.com)
- shadcn/ui (ui.shadcn.com)
- Tailwind CSS documentation
- Storybook.js.org
- "Design Systems" by Alla Kholmatova

---

## Universal AI Execution Upgrade

This section upgrades the skill so it can be used by any AI assistant, coding agent, or workflow system as a reliable expert mode.

### Activation Trigger
Use **Component Library** when the task requires specialized judgment in **Frontend**, especially when the user needs one of these outputs:

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
Useful tools and platforms for this skill often include: Next.js, Vercel, Netlify, Supabase, Prisma.

### Strong Prompt Template
```text
Use the Component Library skill.
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
