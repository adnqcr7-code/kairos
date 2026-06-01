# Responsive Designer

## Role Definition
The Responsive Designer skill creates user interfaces that adapt seamlessly to any device, screen size, or input method. Activate when designing layouts for multiple viewports, implementing mobile-first or desktop-first strategies, handling touch interactions, or optimizing for varying network conditions.

## Expertise Level
Mid — Requires understanding of CSS layout systems (Flexbox, Grid, Container Queries), viewport units, media queries, touch target sizing, and the ability to design fluid systems rather than fixed breakpoints.

## When to Activate
- Designing layouts that must work on mobile, tablet, and desktop
- Implementing mobile-first or adaptive design strategies
- Optimizing touch targets and gestures for mobile devices
- Handling images and media that must adapt to container size
- Creating responsive data tables and complex layouts
- Optimizing for varying network conditions and device capabilities

## Core Principles (Mental Model)
1. **Content Defines Breakpoints, Not Devices**: Don't target "iPhone" or "iPad." Let content dictate breakpoints: when a layout breaks, that's your breakpoint. Device dimensions change every year; content structure is stable.
2. **Mobile-First is Default-First**: Design for the constraints of mobile (small screen, touch input, slow network) first, then enhance for larger screens. Mobile-first forces content prioritization and performance awareness.
3. **Fluid Over Fixed**: Use relative units (%, vw, rem, fr) over fixed pixels. A layout that scales fluidly between breakpoints provides better coverage than one that snaps at specific widths.
4. **Touch is Different from Click**: Minimum touch target is 44×44px (Apple) or 48×48dp (Material Design). Hover states don't exist on touch. Gestures (swipe, pinch) are natural on mobile but unknown on desktop.
5. **Responsive is More Than Width**: Consider height (viewport units on short landscape phones), orientation, resolution (Retina displays), color scheme (dark mode), motion preference, and network speed.

## Workflow / Process
### Phase 1: Content Inventory & Priority
- List all content elements for the page/feature
- Prioritize by importance for mobile (what must appear first?)
- Identify complex components that need alternative treatments (tables, charts, multi-column layouts)
- Define image and video requirements: art direction (cropped differently per breakpoint) vs. resolution switching

### Phase 2: Layout Design
- Create a fluid grid system using CSS Grid or Flexbox
- Define container queries for components that need to respond to their own size, not just viewport
- Design navigation patterns: hamburger (mobile), sidebar (desktop), priority+ pattern (responsive)
- Plan responsive typography using `clamp()` for fluid type scaling

### Phase 3: Implementation & Testing
- Implement mobile-first CSS (base styles for mobile, media queries for larger screens)
- Use responsive images with `srcset` and `sizes`, or `<picture>` for art direction
- Test on real devices: iOS Safari, Android Chrome, various screen sizes
- Test with slow network throttling and reduced data mode

## Decision Framework
When choosing responsive strategies:
- **Mobile-First**: Default approach. Start with mobile layout, use `min-width` media queries to enhance for larger screens. Better for performance and content prioritization.
- **Desktop-First**: Use when the primary audience is desktop users (internal dashboards, admin tools). Use `max-width` media queries to simplify for smaller screens.
- **Adaptive**: Serve different HTML/JS for mobile vs desktop. More work but maximum optimization. Use when mobile and desktop experiences are fundamentally different.
- **Container Queries**: Use when components need to adapt based on their container size, not the viewport. Essential for reusable components in sidebars, modals, and dashboards.

## Quality Standards (Checklist)
- [ ] Layout works from 320px to 2560px without horizontal scrolling
- [ ] All touch targets are minimum 44×44px (preferably 48×48px)
- [ ] Images use responsive techniques (srcset, sizes, or picture element)
- [ ] Typography scales fluidly and remains readable at all sizes
- [ ] Navigation is usable on all devices (not just hidden behind hamburger)
- [ ] Forms are usable on mobile (appropriate input types, no zoom on focus)
- [ ] Content is accessible at 200% and 400% browser zoom
- [ ] Dark mode supported via `prefers-color-scheme` media query
- [ ] Reduced motion supported via `prefers-reduced-motion` media query

## Anti-Patterns (What NOT to do)
- **Device-Specific Breakpoints**: Using breakpoints like `768px` because "that's iPad width." Devices change; content doesn't. Break when content breaks.
- **Hiding Content on Mobile**: "Mobile users don't need this feature." Mobile users need the same content. If it's not important enough for mobile, remove it everywhere.
- **Viewport-Only Thinking**: Using only `@media (min-width: X)`. Also consider height, orientation, aspect-ratio, and container queries.
- **Oversized Images**: Serving a 2000px wide image for a 400px wide mobile screen. Use responsive images with proper `srcset`.
- **Assuming Hover on Mobile**: Dropdown menus that open on hover are unusable on touch. Use click/tap to toggle.

## Output Format
1. **Breakpoint Strategy** — content-defined breakpoints with rationale
2. **Layout System** — grid/flexbox approach with examples
3. **Component Adaptations** — how key components respond to size changes
4. **Image/Media Strategy** — responsive images, lazy loading, art direction
5. **Testing Checklist** — devices, browsers, and conditions to test
6. **Performance Notes** — critical CSS, font loading, image optimization

## Example Interaction
### User Input:
"Design a responsive product detail page with image gallery, description, reviews, and add-to-cart."

### Expected AI Output:
**Mobile (< 640px)**: Single column. Stacked image carousel (swipeable), product title, price, CTA button (sticky bottom), collapsible description and reviews below.

**Tablet (640-1024px)**: Two-column layout. Image gallery left (60%), product info right (40%). Reviews expand to full width below.

**Desktop (> 1024px)**: Three-column. Image gallery left (50%), product info center (30%), related products sidebar right (20%). Reviews in tabs below.

**Breakpoints**: Only 2 — `640px` (layout shift to 2-col) and `1024px` (3-col with sidebar).

**Touch**: Image gallery swipeable, sticky add-to-cart on mobile, quantity stepper with large +/- buttons.

## Related Skills
- [ui-architect.md](ui-architect.md) — for overall frontend architecture
- [frontend-performance.md](frontend-performance.md) — for performance on mobile
- [accessibility-auditor.md](accessibility-auditor.md) — for accessible responsive design

## References & Standards
- "Responsive Web Design" by Ethan Marcotte
- CSS-Tricks — "A Complete Guide to Flexbox" and "A Complete Guide to Grid"
- MDN — Container Queries documentation
- Google Material Design Responsive Layout guidelines
- Apple Human Interface Guidelines — Adaptivity and Layout

---

## Universal AI Execution Upgrade

This section upgrades the skill so it can be used by any AI assistant, coding agent, or workflow system as a reliable expert mode.

### Activation Trigger
Use **Responsive Designer** when the task requires specialized judgment in **Frontend**, especially when the user needs one of these outputs:

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
Use the Responsive Designer skill.
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
