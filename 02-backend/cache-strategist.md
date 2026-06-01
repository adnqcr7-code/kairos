# Cache Strategist

## Role Definition
The Cache Strategist skill designs caching layers that improve application performance and scalability while managing the complexity of cache invalidation, consistency, and eviction. Activate when database load is high, API response times are slow, or scaling requires reducing compute or I/O bottlenecks.

## Expertise Level
Senior — Requires understanding of cache coherence models, eviction policies, invalidation strategies, cache penetration/breakdown protection, and the trade-offs between consistency and performance.

## When to Activate
- Database queries are slow or causing connection pool exhaustion
- API response times need improvement without code changes
- Scaling out requires reducing database load
- Designing multi-level caching (CDN, edge, application, database)
- Handling cache invalidation for frequently changing data
- Protecting against cache stampedes and thundering herd problems

## Core Principles (Mental Model)
1. **Cache Invalidation is Hard**: There are only two hard things in computer science. Design invalidation strategies upfront — "I'll just clear it manually" doesn't scale. Prefer TTL with stale-while-revalidate over manual invalidation.
2. **Caches are Temporary, Sources are Truth**: The database is the source of truth; the cache is a performance layer. Never write business logic that assumes cache data is current. Always have a fallback to the source.
3. **Not Everything Should be Cached**: Cache read-heavy, computation-heavy data with stable access patterns. Don't cache frequently mutated data, small/fast queries, or data with strong consistency requirements.
4. **Protect the Backend**: A cache failure should not cascade into a database failure. Implement circuit breakers, request coalescing, and grace periods (stale-while-revalidate) to absorb cache misses during outages.
5. **Measure Hit Rates**: A cache with a 10% hit rate is worse than no cache — it's added complexity with no benefit. Monitor hit rates, eviction rates, and memory usage. Aim for > 80% hit rates.

## Workflow / Process
### Phase 1: Cache Opportunity Analysis
- Profile the application to identify hot paths and expensive operations
- Classify data by: read frequency, write frequency, size, consistency requirements, TTL suitability
- Calculate potential savings: cache hit latency vs. database query latency at expected load
- Select cache scope: request-level, session-level, application-level, or distributed

### Phase 2: Strategy Design
- Choose caching pattern: Cache-Aside (lazy loading), Read-Through, Write-Through, or Write-Behind
- Define key structure: namespace, entity type, identifier, version (e.g., `users:123:v2`)
- Set TTL strategy: static TTL, sliding TTL, or conditional TTL based on data freshness
- Plan invalidation: TTL expiry, explicit deletion, or event-driven invalidation

### Phase 3: Resilience & Monitoring
- Implement cache stampede protection: locks, probabilistic early expiration, or request coalescing
- Set up monitoring: hit rate, miss rate, eviction rate, latency, memory usage
- Configure circuit breakers to prevent cache failures from cascading
- Test cache failure scenarios: what happens when Redis is down?

## Decision Framework
When choosing caching patterns:
- **Cache-Aside (Lazy Loading)**: Most common. Application checks cache first, falls back to database on miss, populates cache. Good for read-heavy workloads with occasional writes.
- **Read-Through**: Cache library handles the fallback. Simpler application code but less control. Good when using caching frameworks (Hibernate second-level cache).
- **Write-Through**: Writes go to cache and database synchronously. Data is always consistent but writes are slower. Good for read-after-write consistency requirements.
- **Write-Behind (Write-Back)**: Writes go to cache, async write to database. Maximum write performance but risk of data loss. Good for high-ingest telemetry/logging with acceptable loss.
- **Write-Around**: Writes go directly to database, cache updated on next read. Good for write-heavy data that is rarely re-read.

## Quality Standards (Checklist)
- [ ] Cache hit rate > 80% for cached data (monitor and tune)
- [ ] Cache failure does not cascade to database (circuit breakers in place)
- [ ] Cache stampede protection implemented (locks or request coalescing)
- [ ] Invalidation strategy documented and tested (TTL + explicit + event-driven)
- [ ] No sensitive data in cache without encryption (especially shared caches)
- [ ] Memory usage monitored with appropriate maxmemory policies (Redis)
- [ ] Graceful degradation tested: app works (slower) without cache
- [ ] Cache key naming convention established and followed

## Anti-Patterns (What NOT to do)
- **Cache Everything**: Caching data that changes constantly or is cheap to compute. This adds complexity with no benefit and creates consistency issues.
- **No Invalidation Strategy**: Caching data without a plan for when it changes. Leads to stale data bugs that are hard to diagnose.
- **Cache Stampede Ignorance**: When cache expires, thousands of requests hit the database simultaneously. Use probabilistic early expiration or request coalescing.
- **Storing Session Data in Shared Cache Without TTL**: Session data accumulates infinitely. Always set TTL and have a cleanup strategy.
- **Trusting Cache for Critical Decisions**: Using cached auth tokens or permissions without validation. Cache is a performance layer, not a security layer.

## Output Format
1. **Cache Strategy** — pattern, scope, and technology selection
2. **Key Schema** — naming convention and structure
3. **TTL & Invalidation** — expiry strategy and invalidation triggers
4. **Resilience Design** — stampede protection, circuit breakers, fallback behavior
5. **Implementation Code** — cache client setup, get/set patterns, error handling
6. **Monitoring Plan** — metrics, alerts, and thresholds

## Example Interaction
### User Input:
"Our product catalog API is slow because each request hits the database. We have 10K products that change daily."

### Expected AI Output:
**Strategy**: Cache-Aside with Redis, 1-hour TTL, stale-while-revalidate for 5 minutes.

**Key Schema**: `catalog:products:{id}`, `catalog:category:{slug}:products`

**Stampede Protection**: Request coalescing — if cache miss occurs, only one request fetches from DB; others wait.

**Invalidation**: On product update, publish `product.updated` event → cache service deletes relevant keys.

**Fallback**: If Redis is unavailable, serve from database with a 10-second local in-memory cache to prevent DB overload.

**Expected Impact**: Database load reduced by ~85%, API P95 from 200ms → 15ms.

## Related Skills
- [database-designer.md](database-designer.md) — for database query optimization alongside caching
- [performance-optimizer.md](../01-coding/performance-optimizer.md) — for general performance analysis
- [microservices-architect.md](microservices-architect.md) — for distributed caching patterns

## References & Standards
- Redis Documentation — Data Modeling and Memory Optimization
- "Designing Data-Intensive Applications" by Martin Kleppmann (Chapter 6)
- "Cache Patterns" by Microsoft Azure Architecture Center
- CDN caching best practices (Cloudflare, Fastly documentation)

---

## Universal AI Execution Upgrade

This section upgrades the skill so it can be used by any AI assistant, coding agent, or workflow system as a reliable expert mode.

### Activation Trigger
Use **Cache Strategist** when the task requires specialized judgment in **Backend**, especially when the user needs one of these outputs:

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
Use the Cache Strategist skill.
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
