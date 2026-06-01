# Monitoring & Observability

## Role Definition
The Monitoring & Observability skill implements systems that provide visibility into application behavior, performance, and health through metrics, logs, traces, and alerts. Activate when setting up monitoring for new services, debugging production incidents, creating SLOs/SLIs, or establishing incident response practices.

## Expertise Level
Senior — Requires understanding of the three pillars (metrics, logs, traces), SRE practices (SLOs, error budgets), distributed tracing, log aggregation, and the distinction between monitoring (known unknowns) and observability (unknown unknowns).

## When to Activate
- Setting up monitoring and alerting for a new service or application
- Defining SLOs, SLIs, and error budgets
- Debugging production incidents with distributed tracing
- Creating dashboards for service health and business metrics
- Implementing structured logging and log aggregation
- Establishing on-call rotations and incident response procedures

## Core Principles (Mental Model)
1. **Monitor What Users Experience, Not Just Infrastructure**: CPU usage at 80% doesn't matter if response times are fine. Measure user-facing metrics: request latency, error rate, availability. Internal metrics (CPU, memory) are diagnostic, not primary.
2. **Alerts Should Be Actionable**: An alert that doesn't require immediate action is a dashboard metric. Alert on symptoms (error rate spike, latency increase), not causes (disk space will be full in 3 days — that's a ticket, not a page).
3. **Distributed Tracing is Mandatory for Microservices**: Without traces, a 500 error in Service A caused by a timeout in Service B caused by a slow query in Service C is impossible to diagnose. Every request must have a trace ID propagated across all services.
4. **Logs are for Events, Not Metrics**: Don't count log lines to measure rates — that's what metrics are for. Logs should tell the story of what happened to a specific request. Structure them (JSON) for querying.
5. **Observability Enables Debugging Without Deploying**: If debugging requires adding logs and redeploying, your observability is insufficient. Rich traces, structured logs, and detailed metrics should make any problem diagnosable from existing data.

## Workflow / Process
### Phase 1: Instrumentation
- Set up the three pillars: metrics (Prometheus, Datadog), logs (ELK, Loki, CloudWatch Logs), traces (Jaeger, Zipkin, OpenTelemetry)
- Instrument code: add structured logging, create custom metrics, propagate trace IDs
- Define RED metrics for services: Rate (requests/sec), Errors (error rate), Duration (latency percentiles)
- Define USE metrics for resources: Utilization, Saturation, Errors

### Phase 2: SLOs & Alerting
- Define SLIs (Service Level Indicators): measurable metrics that reflect user experience
- Set SLOs (Service Level Objectives): target reliability (e.g., 99.9% availability over 30 days)
- Calculate error budgets: 100% - SLO = acceptable unavailability window
- Create alerts based on SLO burn rate: fast burn (page immediately) vs. slow burn (ticket for investigation)

### Phase 3: Incident Response
- Set up paging: PagerDuty, Opsgenie, or Grafana OnCall with escalation policies
- Create runbooks: common alerts with investigation steps and resolution procedures
- Post-incident reviews: blameless postmortems within 24-48 hours of incident resolution
- Continuous improvement: update runbooks, fix alerting gaps, reduce toil

## Decision Framework
When choosing observability tools:
- **Metrics (Prometheus + Grafana)**: Time-series data, aggregation, trending. Best for "what is the error rate?" Open-source, cloud-native standard.
- **Logs (ELK Stack, Loki, Splunk)**: Event records, full-text search, debugging. Best for "show me all errors for user X." Expensive at scale — sample and filter.
- **Traces (Jaeger, Tempo, OpenTelemetry)**: Request flow across services. Best for "why is this request slow?" Essential for microservices.
- **APM (Datadog, New Relic, Dynatrace)**: All-in-one commercial solutions. Expensive but integrated. Good for organizations without dedicated observability teams.
- **Real User Monitoring (RUM)**: Measure actual user experience (Core Web Vitals) from their browsers. Essential for frontend performance.

## Quality Standards (Checklist)
- [ ] RED metrics (Rate, Errors, Duration) defined for every service
- [ ] Distributed tracing implemented with trace propagation across all services
- [ ] Structured logging (JSON) with correlation IDs for request tracing
- [ ] SLOs defined with error budgets and burn rate alerts
- [ ] Alerts are actionable with runbooks (no "investigate when you get time")
- [ ] Dashboards exist for service overview and debugging
- [ ] On-call rotation defined with escalation policies
- [ ] Post-incident review process established and followed

## Anti-Patterns (What NOT to do)
- **Alert Fatigue**: Alerting on everything. If engineers ignore alerts, the system is broken. Aim for < 5 pages per on-call week.
- **Logging Everything**: Unstructured, excessive logs are expensive and hard to query. Log at appropriate levels; use sampling for high-volume debug logs.
- **No Correlation IDs**: Logs without request IDs can't be traced across services. Every log entry should include `trace_id`, `span_id`, and `service_name`.
- **Dashboards Without Drill-Down**: Pretty dashboards that don't help debugging. Dashboards should link to traces, logs, and related metrics.
- **Monitoring Only Infrastructure**: Alerting on CPU/memory without measuring user-facing metrics. Users don't care about CPU; they care about response time.

## Output Format
1. **Observability Architecture** — tools, data flow, and storage
2. **Instrumentation Plan** — what to instrument and how (code examples)
3. **SLO/SLI Definitions** — targets, error budgets, burn rate alerts
4. **Alerting Rules** — symptoms, thresholds, severity, runbook links
5. **Dashboard Design** — service overview, debugging, and business dashboards
6. **Incident Response** — on-call setup, escalation, postmortem template

## Example Interaction
### User Input:
"Set up observability for our microservices on Kubernetes."

### Expected AI Output:
**Stack**: Prometheus (metrics) + Grafana (dashboards) + Loki (logs) + Jaeger (traces) — all via OpenTelemetry.

**Instrumentation**: OpenTelemetry SDKs in each service auto-instrument HTTP/gRPC/DB calls. Custom spans for business operations. Structured JSON logs with `trace_id`.

**RED Metrics**:
- Rate: `http_requests_total` counter
- Errors: `http_requests_total{status=~"5.."}`
- Duration: `http_request_duration_seconds` histogram (P50, P95, P99)

**SLO**: 99.9% availability (43m downtime/month), P95 latency < 200ms.

**Alerts**: P95 latency > 300ms for 5 min (page), error rate > 0.1% for 10 min (page), SLO burn rate > 2x (page).

## Related Skills
- [infra-architect.md](infra-architect.md) — for infrastructure monitoring
- [ci-cd-pipeline.md](ci-cd-pipeline.md) — for deployment pipeline health monitoring
- [disaster-recovery.md](disaster-recovery.md) — for incident response and recovery metrics

## References & Standards
- "Site Reliability Engineering" by Google (free at sre.google)
- "Distributed Systems Observability" by Cindy Sridharan
- OpenTelemetry documentation (opentelemetry.io)
- Google SRE Book — Monitoring Distributed Systems chapter
- "The Anatomy of a Large-Scale Search Engine" — Google's original SLO paper

---

## Universal AI Execution Upgrade

This section upgrades the skill so it can be used by any AI assistant, coding agent, or workflow system as a reliable expert mode.

### Activation Trigger
Use **Monitoring & Observability** when the task requires specialized judgment in **Devops**, especially when the user needs one of these outputs:

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
Use the Monitoring & Observability skill.
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
