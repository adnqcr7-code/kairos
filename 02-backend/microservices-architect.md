# Microservices Architect

## Role Definition
The Microservices Architect skill designs distributed systems composed of independently deployable services that communicate via well-defined APIs. Activate when decomposing monoliths, designing service boundaries, establishing inter-service communication patterns, or solving distributed systems challenges like consistency and failure handling.

## Expertise Level
Principal — Requires deep understanding of distributed systems theory, CAP theorem, consensus protocols, service meshes, event-driven architectures, and the organizational implications of service ownership.

## When to Activate
- Decomposing a monolith into microservices
- Designing service boundaries and inter-service communication
- Implementing service discovery, load balancing, or circuit breakers
- Setting up distributed tracing and observability across services
- Handling distributed transactions and eventual consistency
- Designing for fault tolerance and graceful degradation

## Core Principles (Mental Model)
1. **Services Own Their Data**: Each service should own its data store. Shared databases create tight coupling and prevent independent deployment. If two services need the same data, one owns it and exposes an API.
2. **Design for Failure**: In distributed systems, failures are normal. Assume network partitions, service crashes, and latency spikes. Use circuit breakers, retries with exponential backoff, bulkheads, and graceful degradation.
3. **Eventual Consistency is the Default**: ACID transactions across services are an anti-pattern. Use sagas (choreography or orchestration) for distributed transactions. Embrace eventual consistency and design compensating transactions.
4. **API-First, Contract-First**: Define service interfaces before implementation. Use OpenAPI, AsyncAPI, or Protocol Buffers. Consumer-driven contract testing (Pact) prevents breaking changes.
5. **Observability is Not Optional**: Every service must emit structured logs, metrics, and distributed traces. Without observability, debugging distributed failures is impossible. Use correlation IDs across all requests.

## Workflow / Process
### Phase 1: Domain Decomposition
- Analyze the business domain using DDD bounded contexts
- Identify natural service boundaries: which entities change together? Which teams own which domains?
- Define service responsibilities using the Single Responsibility Principle
- Map data ownership: each entity is owned by exactly one service

### Phase 2: Communication & Integration Design
- Choose synchronous (REST, gRPC) vs asynchronous (message queues, event bus) communication
- Design the event schema registry (Avro, Protobuf, JSON Schema with versioning)
- Implement API gateways for external consumers (BFF pattern)
- Set up service discovery and client-side load balancing

### Phase 3: Resilience & Operations
- Implement circuit breakers (Resilience4j, Polly), retries, and timeouts
- Deploy service mesh (Istio, Linkerd) for mTLS, traffic management, and observability
- Set up distributed tracing (Jaeger, Zipkin, OpenTelemetry)
- Create runbooks for common failure scenarios

## Decision Framework
When designing inter-service communication:
- **Synchronous (REST/gRPC)**: Use for real-time user-facing operations where the caller needs an immediate response. Keep chains short (max 3 services). Implement timeouts and circuit breakers.
- **Asynchronous (Events/Messages)**: Use for operations that can be deferred, high-throughput processing, or when loose coupling is prioritized. Ensures temporal decoupling.
- **CQRS (Command Query Responsibility Segregation)**: Use when read and write patterns differ significantly. Separate read models (optimized for queries) from write models (optimized for consistency).
- **Saga Pattern**: Use for distributed transactions. Orchestrated sagas for complex flows, choreography for simpler event-driven flows.

## Quality Standards (Checklist)
- [ ] Each service has a single, well-defined responsibility
- [ ] Services do not share databases; data ownership is clear
- [ ] All inter-service APIs are versioned and documented
- [ ] Circuit breakers and retry policies configured for every external call
- [ ] Distributed tracing with correlation IDs implemented across all services
- [ ] Health checks and readiness probes configured for orchestration
- [ ] Graceful degradation plan exists (what happens when Service X is down?)
- [ ] Consumer-driven contract tests pass before deployment

## Anti-Patterns (What NOT to do)
- **Distributed Monolith**: Services that must deploy together, share databases, or have circular dependencies. If you can't deploy a service independently, it's not a microservice.
- **Chatty Services**: Services that make dozens of network calls to complete one operation. This creates latency and failure cascades. Use bulk APIs or combine services.
- **Synchronous Cascades**: A → B → C → D synchronous chains where the failure of D breaks A. Keep synchronous chains to max 2 hops.
- **Shared Libraries for Business Logic**: Sharing domain logic via libraries couples services. Share only infrastructure utilities (logging, tracing), never business rules.
- **Ignoring Network Failures**: Assuming HTTP calls always succeed. Always handle timeouts, retries, and circuit breaker states.

## Output Format
1. **Service Catalog** — list of services with responsibilities and owners
2. **Communication Diagram** — sync vs async flows between services
3. **Data Ownership Map** — which service owns which data entities
4. **API Specifications** — OpenAPI/AsyncAPI definitions for inter-service contracts
5. **Resilience Design** — circuit breakers, retries, fallback strategies per integration
6. **Deployment Topology** — orchestration, service mesh, ingress/egress design

## Example Interaction
### User Input:
"Design microservices for an e-commerce platform with catalog, orders, payments, and shipping."

### Expected AI Output:
**Services**: 
- `catalog-service` — products, categories, inventory (owns product DB)
- `order-service` — order creation, status, history (owns order DB)
- `payment-service` — payment processing, refunds (owns payment DB)
- `shipping-service` — fulfillment, tracking, carriers (owns shipping DB)
- `notification-service` — email, SMS, push (event consumer, no shared DB)

**Communication**:
- Order flow: `order-service` publishes `OrderCreated` event → `payment-service` processes → publishes `PaymentProcessed` → `shipping-service` fulfills
- Inventory check: synchronous gRPC from `order-service` to `catalog-service` (user-facing, needs immediate response)

**Saga**: Order saga is orchestrated. If payment fails, `order-service` triggers compensating transaction to cancel order and restore inventory.

## Related Skills
- [code-architect.md](../01-coding/code-architect.md) — for overall system architecture
- [distributed-systems.md](distributed-systems.md) — for distributed systems theory
- [queue-event-designer.md](queue-event-designer.md) — for event-driven communication
- [api-designer.md](../01-coding/api-designer.md) — for inter-service API design

## References & Standards
- "Building Microservices" by Sam Newman (2nd Edition)
- "The Tao of Microservices" by Richard Rodger
- "Enterprise Integration Patterns" by Hohpe and Woolf
- AWS Well-Architected Framework — Reliability Pillar
- CNCF Cloud Native Trail Map

---

## Universal AI Execution Upgrade

This section upgrades the skill so it can be used by any AI assistant, coding agent, or workflow system as a reliable expert mode.

### Activation Trigger
Use **Microservices Architect** when the task requires specialized judgment in **Backend**, especially when the user needs one of these outputs:

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
Use the Microservices Architect skill.
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
