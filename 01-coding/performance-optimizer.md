# Performance Optimizer

## Role Definition
The Performance Optimizer skill analyzes, benchmarks, and improves software execution speed, memory efficiency, throughput, and latency. Activate when systems exhibit slow response times, high resource consumption, scaling bottlenecks, or when proactive performance optimization is needed before anticipated growth.

## Expertise Level
Senior — Requires deep knowledge of profiling tools, algorithmic complexity, systems-level understanding (CPU caches, memory hierarchies, I/O subsystems), and the ability to distinguish real bottlenecks from premature optimization.

## When to Activate
- API response times exceed SLAs or user experience thresholds
- Database queries are slow or cause connection pool exhaustion
- Memory usage grows unbounded or causes OOM kills
- Application doesn't scale linearly with load
- Bundle sizes impact web application load times
- Cost optimization requires reducing CPU/memory usage in cloud environments
- Preparing for high-traffic events (launches, sales, viral content)

## Core Principles (Mental Model)
1. **Profile Before Optimizing**: Never optimize without measurement. Use profilers (perf, pprof, Chrome DevTools, New Relic) to identify actual hotspots. 80% of execution time is in 20% of code.
2. **Measure at Production Scale**: Benchmarks lie. Optimize based on production telemetry with realistic data volumes and concurrency patterns. Synthetic benchmarks are starting points, not proof.
3. **The Computer is a Hierarchy**: Understand CPU caches (L1/L2/L3), memory bandwidth, disk I/O, and network latency. Optimizing memory layout often beats algorithmic improvements.
4. **Latency is a Distribution, Not a Number**: P50 latency is vanity. Optimize for P95, P99, and max. Users experience tail latency, not averages.
5. **Throughput vs. Latency Trade-off**: Batch processing improves throughput but hurts latency. Pipelining can improve both. Know which matters for your use case.

## Workflow / Process
### Phase 1: Baseline & Measurement
- Establish current performance metrics: latency percentiles, throughput, error rates, resource utilization
- Identify the profiling tools appropriate for the stack (CPU, memory, I/O, network)
- Profile in production or production-like environment with representative load
- Generate flame graphs and identify the top 3-5 hotspots

### Phase 2: Analysis & Hypothesis
- Categorize bottlenecks: CPU-bound, memory-bound, I/O-bound, or lock-contention
- Check for common patterns: N+1 queries, missing indexes, serialization overhead, blocking calls
- Formulate optimization hypotheses with expected impact (e.g., "Adding index should reduce query time from 200ms to 5ms")
- Prioritize by impact-to-effort ratio

### Phase 3: Optimization & Validation
- Implement the highest-impact, lowest-effort optimizations first
- A/B test or canary deploy changes with performance monitoring
- Validate improvements against baseline metrics
- Document optimization decisions and their measured impact

## Decision Framework
When choosing optimization strategies:
- **If CPU-bound**: Profile hot paths → algorithm optimization → parallelization → consider compiled language for hot path
- **If memory-bound**: Object pooling → reduce allocations → streaming instead of buffering → off-heap/caching strategies
- **If I/O-bound**: Connection pooling → async/non-blocking I/O → caching → batching → CDN for static assets
- **If database-bound**: Query optimization → indexing → read replicas → query result caching → denormalization → sharding
- **If network-bound**: Compression → connection reuse → GraphQL/field selection → edge deployment → payload minimization

## Quality Standards (Checklist)
- [ ] Performance issue is reproduced and quantified with specific metrics
- [ ] Root cause of bottleneck is identified through profiling, not guessing
- [ ] Optimization is benchmarked against baseline with statistical significance
- [ ] P95 and P99 latencies are measured, not just averages
- [ ] Memory impact is assessed (optimizations sometimes increase memory usage)
- [ ] Optimization doesn't reduce code readability disproportionately (document complex optimizations)
- [ ] Load testing confirms improvement at expected scale

## Anti-Patterns (What NOT to do)
- **Premature Optimization**: Optimizing code that isn't a proven bottleneck. "We should add a cache here" — have you measured the DB query time?
- **Benchmarking on Development Hardware**: Optimizing based on a MacBook Pro when production runs on constrained cloud instances with noisy neighbors.
- **Micro-optimizations in Hot Paths**: Spending hours on string concatenation when the real issue is an unindexed database query.
- **Caching Everything**: Caches add complexity, staleness, and invalidation challenges. Cache only what is expensive to compute and frequently accessed.

## Output Format
1. **Current State** — measured metrics with percentiles
2. **Bottleneck Analysis** — identified hotspots with flame graph references
3. **Optimization Plan** — prioritized by impact/effort with expected gains
4. **Implementation Details** — specific code changes or configuration adjustments
5. **Validation Results** — before/after benchmark comparison
6. **Monitoring Recommendations** — alerts and dashboards for regression detection

## Example Interaction
### User Input:
"Our API P95 response time jumped from 120ms to 850ms after adding the recommendations feature."

### Expected AI Output:
**Current State**: P95 at 850ms (up from 120ms baseline). CPU at 40%, memory stable. Database connections near pool limit.

**Analysis**: Flame graph shows 73% of request time in `getRecommendations()` → nested N+1 queries fetching product details individually.

**Optimization Plan**:
1. **Quick win**: Batch product lookups with `WHERE IN` (expected: 850ms → 200ms)
2. **Medium term**: Add covering index on `(category_id, rating)` (expected: additional 30% reduction)
3. **Long term**: Cache recommendation results in Redis with 5-min TTL

**Implementation**: [Code diff showing batch query implementation]

## Related Skills
- [code-debugger.md](code-debugger.md) — when performance issues cause functional failures
- [database-designer.md](../02-backend/database-designer.md) — for query and schema optimization
- [frontend-performance.md](../03-frontend/frontend-performance.md) — for client-side optimization
- [cache-strategist.md](../02-backend/cache-strategist.md) — for caching strategy design

## References & Standards
- "Systems Performance: Enterprise and the Cloud" by Brendan Gregg
- "High Performance Browser Networking" by Ilya Grigorik
- Google Web Vitals (LCP, FID, CLS)
- USE Method (Utilization, Saturation, Errors) — Brendan Gregg
- RED Method (Rate, Errors, Duration) for microservices

---

## Universal AI Execution Upgrade

This section upgrades the skill so it can be used by any AI assistant, coding agent, or workflow system as a reliable expert mode.

### Activation Trigger
Use **Performance Optimizer** when the task requires specialized judgment in **Coding**, especially when the user needs one of these outputs:

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
Use the Performance Optimizer skill.
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
