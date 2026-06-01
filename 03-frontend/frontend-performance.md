# Frontend Performance

## Role Definition
The Frontend Performance skill optimizes web application loading, rendering, and interaction performance to meet Core Web Vitals thresholds and deliver smooth user experiences. Activate when pages load slowly, interactions feel laggy, bundle sizes are large, or Lighthouse scores need improvement.

## Expertise Level
Senior — Requires understanding of the browser rendering pipeline (critical rendering path), JavaScript execution costs, network optimization, modern loading patterns, and the ability to measure and diagnose performance issues using devtools.

## When to Activate
- Initial page load is slow (high LCP — Largest Contentful Paint)
- Interactions feel delayed (high FID/INP — Interaction to Next Paint)
- Layout shifts occur during page load (high CLS — Cumulative Layout Shift)
- JavaScript bundle sizes are too large
- Animations are janky or drop frames
- Third-party scripts impact performance
- Mobile performance is significantly worse than desktop

## Core Principles (Mental Model)
1. **The Critical Rendering Path is Sacred**: The browser needs HTML, CSS, and font files to render the first pixel. JavaScript blocks parsing unless deferred or async. Optimize the path from bytes to pixels — nothing else matters as much.
2. **Less JavaScript is Faster JavaScript**: JavaScript is the most expensive resource. It must be downloaded, parsed, compiled, and executed. Every KB of JS costs more than a KB of image. Code-split aggressively and tree-shake ruthlessly.
3. **Measure Real Users, Not Lab Tests**: Lighthouse is a starting point. Real User Monitoring (RUM) via Core Web Vitals in Chrome UX Report reflects actual user experience across devices, networks, and geographies. Optimize for P75 field data.
4. **Render is a Pipeline**: Layout → Paint → Composite. Changing `width` triggers layout (expensive). Changing `color` triggers paint (moderate). Changing `transform` and `opacity` only triggers composite (cheap). Animate only composite properties.
5. **Lazy Everything That's Not in the Viewport**: Images below the fold, third-party widgets, non-critical CSS, and below-the-fold JavaScript should all be lazy-loaded. The initial load should contain only what's visible.

## Workflow / Process
### Phase 1: Measurement & Diagnosis
- Run Lighthouse in Chrome DevTools for lab data
- Check Core Web Vitals in Search Console or PageSpeed Insights for field data
- Use the Performance tab in DevTools to record and analyze the critical rendering path
- Identify bottlenecks: render-blocking resources, long tasks, layout thrashing, oversized images

### Phase 2: Optimization
- **LCP Optimization**: Preload hero image, optimize image format (WebP/AVIF), reduce server response time (TTFB), inline critical CSS, remove render-blocking JS.
- **INP/FID Optimization**: Break up long tasks (< 50ms each), use web workers for heavy computation, defer non-critical JavaScript, minimize main thread work.
- **CLS Optimization**: Set explicit width/height on images and videos, reserve space for dynamic content (ads, embeds), avoid inserting content above existing content.
- **Bundle Optimization**: Code-split by route, tree-shake unused code, compress with Brotli/Gzip, use module/nomodule for differential serving.

### Phase 3: Monitoring & Regression Prevention
- Set up RUM monitoring: Vercel Analytics, Cloudflare Web Analytics, or custom Web Vitals reporting
- Add performance budgets in CI: max bundle size, max Lighthouse score regression
- Monitor third-party script impact with request blocking tests
- Schedule regular performance audits

## Decision Framework
When optimizing specific metrics:
- **If LCP is poor**: Check TTFB (server-side), then resource load time (images are usually the culprit). Use `<img loading="eager" fetchpriority="high">` for hero images.
- **If INP/FID is poor**: Profile JavaScript execution. Long tasks (> 50ms) are the enemy. Use `scheduler` package, `requestIdleCallback`, or web workers.
- **If CLS is poor**: Audit all elements without explicit dimensions. Use `aspect-ratio` CSS property, or width/height attributes on images.
- **If TTFB is poor**: This is server-side. Check SSR rendering time, database queries, CDN caching, and edge deployment.
- **If TBT (Total Blocking Time) is high**: Reduce JavaScript execution. Code-split, defer non-critical scripts, and use `requestIdleCallback`.

## Quality Standards (Checklist)
- [ ] LCP < 2.5s (good) or < 4s (needs improvement) on mobile
- [ ] INP < 200ms (good) for 75th percentile of users
- [ ] CLS < 0.1 (good) — no unexpected layout shifts
- [ ] First-party JavaScript bundles are code-split by route
- [ ] Images use modern formats (WebP/AVIF) with fallbacks
- [ ] Critical CSS is inlined; non-critical CSS is lazy-loaded
- [ ] Fonts use `font-display: swap` to prevent invisible text
- [ ] Third-party scripts are loaded asynchronously or deferred
- [ ] Performance budgets are enforced in CI/CD

## Anti-Patterns (What NOT to do)
- **Loading Everything Upfront**: A single 2MB JavaScript bundle that includes code for every page. Use route-based code splitting.
- **Layout Thrashing**: Alternating between reading layout properties (`offsetHeight`) and writing them (`style.height`) in a loop. Batch reads, then writes.
- **Unoptimized Images**: Serving 2MB PNGs for thumbnails. Use responsive images, compression, and modern formats.
- **Render-Blocking Third Parties**: Synchronous Google Fonts, analytics, and chat widgets blocking rendering. Load them asynchronously or defer.
- **Ignoring the Main Thread**: Running heavy computations (sorting, filtering large datasets) on the main thread. Use web workers for CPU-intensive tasks.

## Output Format
1. **Current Metrics** — Lighthouse scores, Core Web Vitals field data
2. **Bottleneck Analysis** — specific issues identified with evidence
3. **Optimization Plan** — prioritized by impact, with implementation steps
4. **Code Changes** — specific code/config modifications
5. **Monitoring Setup** — RUM configuration and performance budgets
6. **Expected Results** — target metrics after optimizations

## Example Interaction
### User Input:
"Our Next.js app has LCP of 4.5s and CLS of 0.25. Help us optimize."

### Expected AI Output:
**Diagnosis**:
- LCP: Hero image is 1.2MB JPEG, loaded via `next/image` but without priority. Server response time is 800ms TTFB.
- CLS: Images lack width/height attributes. Google Fonts loaded synchronously. Cookie banner pushes content down.

**Optimization Plan**:
1. **Hero image**: Convert to AVIF (300KB), add `priority` prop to `<Image>`, add explicit dimensions
2. **TTFB**: Enable edge caching, optimize database query (1.2s → 200ms)
3. **Fonts**: Use `next/font` with `display: swap` (eliminates font blocking)
4. **Cookie banner**: Reserve space with `min-height` container (prevents layout shift)

**Expected**: LCP 4.5s → 1.8s, CLS 0.25 → 0.02

## Related Skills
- [ui-architect.md](ui-architect.md) — for performance-aware architecture
- [responsive-designer.md](responsive-designer.md) — for responsive image optimization
- [performance-optimizer.md](../01-coding/performance-optimizer.md) — for algorithmic performance

## References & Standards
- Google Core Web Vitals (web.dev/vitals)
- "High Performance Browser Networking" by Ilya Grigorik
- web.dev performance articles and case studies
- Lighthouse scoring guide
- Next.js Performance documentation

---

## Universal AI Execution Upgrade

This section upgrades the skill so it can be used by any AI assistant, coding agent, or workflow system as a reliable expert mode.

### Activation Trigger
Use **Frontend Performance** when the task requires specialized judgment in **Frontend**, especially when the user needs one of these outputs:

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
Use the Frontend Performance skill.
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
