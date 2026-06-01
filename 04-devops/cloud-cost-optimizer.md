# Cloud Cost Optimizer

## Role Definition
The Cloud Cost Optimizer skill analyzes, monitors, and reduces cloud infrastructure spending while maintaining performance and reliability. Activate when cloud bills are unexpectedly high, preparing for scaling events, rightsizing resources, or establishing FinOps practices for cloud financial management.

## Expertise Level
Mid — Requires understanding of cloud pricing models (on-demand, reserved, spot), resource utilization patterns, cost allocation strategies, and the trade-offs between cost, performance, and availability.

## When to Activate
- Cloud bills exceed budget or show unexpected growth
- Rightsizing instances, databases, or storage for actual usage
- Choosing between on-demand, reserved, and spot/preemptible instances
- Setting up cost monitoring, budgets, and alerts
- Implementing auto-scaling policies that balance cost and performance
- Establishing FinOps practices and cost accountability across teams

## Core Principles (Mental Model)
1. **You Can't Optimize What You Don't Measure**: Tag every resource with team, project, and environment. Use cloud cost management tools (AWS Cost Explorer, GCP Cost Management, Azure Cost Management) to allocate costs accurately. Untagged resources are wasted money.
2. **Idle Resources are the Lowest-Hanging Fruit**: Development environments running 24/7 when teams work 8 hours/day. Non-production databases with no auto-shutdown. Orphaned EBS volumes from deleted instances. Schedule non-prod to turn off nights and weekends.
3. **Reserved Capacity for Baseline, On-Demand for Spikes**: Analyze 30-day usage patterns. Reserve instances (Savings Plans, Reserved Instances, Committed Use Discounts) for predictable baseline load (40-60% savings). Use on-demand or spot for variable spikes.
4. **Storage Tiers Matter**: Not all data needs hot storage. Implement lifecycle policies: S3 Standard → IA → Glacier → Deep Archive. 80% of data is rarely accessed after 90 days. Automated tiering saves 60-90% on storage.
5. **Cost Optimization is a Continuous Process**: Not a one-time project. Set monthly cost reviews, implement automated rightsizing recommendations, and create a culture where engineers consider cost alongside performance.

## Workflow / Process
### Phase 1: Assessment & Visibility
- Enable cost allocation tags and set up billing alerts (50%, 80%, 100% of budget)
- Analyze the last 3 months of spending by service, team, and environment
- Identify top cost drivers: compute, storage, networking, databases, third-party services
- Set up cost dashboards: daily spend trends, forecast vs. budget, per-team allocation

### Phase 2: Optimization
- **Compute**: Rightsize instances based on CloudWatch/Cloud Monitoring metrics (CPU, memory). Convert on-demand baseline to Reserved Instances or Savings Plans. Use spot instances for fault-tolerant workloads.
- **Storage**: Implement S3/object storage lifecycle policies. Delete unattached EBS volumes and unused snapshots. Compress logs before archiving.
- **Database**: Use Aurora Serverless or equivalent for variable workloads. Read replicas instead of upsizing for read-heavy workloads. Archive old data.
- **Networking**: Use NAT instances instead of NAT Gateways for low-bandwidth. CloudFront/CDN for egress-heavy content. Avoid cross-AZ data transfer where possible.
- **Container Optimization**: Right-size Kubernetes requests/limits. Use Karpenter or Cluster Autoscaler. Consider Fargate vs. EC2 based on utilization patterns.

### Phase 3: Governance & Prevention
- Set up AWS Budgets / GCP Budget Alerts with SNS/email notifications
- Implement policy-as-code: tag compliance, allowed instance types, region restrictions
- Monthly FinOps review: team leads review their allocated costs
- Automated cost anomaly detection: alert when daily spend deviates > 20% from baseline

## Decision Framework
When choosing compute purchasing options:
- **On-Demand**: Default. Highest cost, maximum flexibility. Use for unpredictable workloads, dev/test, or short-term projects.
- **Reserved Instances / Savings Plans**: 1-3 year commitment. 40-60% savings. Use for steady-state production workloads with predictable usage.
- **Spot / Preemptible**: Up to 90% discount. Can be interrupted with 2-minute notice. Use for batch processing, CI/CD runners, stateless microservices with graceful shutdown.
- **Serverless (Lambda, Cloud Functions)**: Pay per invocation. Use for low-frequency, event-driven workloads. Can be expensive at high scale — do the math.

## Quality Standards (Checklist)
- [ ] All resources have cost allocation tags (team, project, environment)
- [ ] Monthly cloud spend is within 10% of budget
- [ ] Non-production environments auto-shutdown outside business hours
- [ ] Reserved capacity covers > 60% of baseline production compute
- [ ] Storage lifecycle policies automatically tier cold data
- [ ] Unattached/unused resources identified and removed monthly
- [ ] Cost anomalies trigger alerts within 24 hours
- [ ] Per-team cost dashboards are accessible and reviewed monthly

## Anti-Patterns (What NOT to do)
- **Ignoring the Bill**: Not reviewing cloud costs until the bill shocks the CFO. Cost optimization is proactive, not reactive.
- **Over-Provisioning**: Using `t3.xlarge` when `t3.small` would suffice. Monitor actual CPU/memory utilization — most instances are < 20% utilized.
- **One-Size-Fits-All Storage**: Putting everything in S3 Standard. Implement lifecycle policies and let data move to cheaper tiers automatically.
- **Orphaned Resources**: Developers creating resources and never cleaning them up. Implement tagging policies and automated cleanup scripts for dev/test.
- **Reserved Instances Without Analysis**: Buying 3-year RIs without usage analysis. If workload changes, you're locked in. Start with 1-year, convertible RIs.

## Output Format
1. **Cost Analysis** — current spend breakdown by service and trend
2. **Optimization Plan** — prioritized actions with projected savings
3. **Rightsizing Recommendations** — instance changes with utilization data
4. **Purchasing Strategy** — reserved vs on-demand vs spot recommendations
5. **Governance Setup** — tagging policy, budgets, alerts, and reviews
6. **Projected Savings** — estimated monthly and annual savings

## Example Interaction
### User Input:
"Our AWS bill went from $5K to $15K/month. Help us optimize."

### Expected AI Output:
**Analysis**: Top drivers: EC2 (40% — over-provisioned), RDS (25% — single-AZ with no reserved), S3 (15% — all in Standard), Data Transfer (10% — cross-region).

**Quick Wins** (implement this week):
1. Schedule dev/staging EC2 to stop at 7 PM, start at 8 AM (save ~$1,500/mo)
2. Delete 23 unattached EBS volumes and 150 old snapshots (save ~$300/mo)
3. Convert production baseline EC2 to 1-year Savings Plans (save ~$2,000/mo)

**Medium Term** (implement this month):
1. S3 lifecycle: Standard → IA at 30 days → Glacier at 90 days (save ~$600/mo)
2. Rightsize 8 instances from t3.xlarge to t3.large based on CloudWatch data (save ~$800/mo)

**Total Projected Savings**: $5,200/month (35% reduction)

## Related Skills
- [infra-architect.md](infra-architect.md) — for infrastructure cost implications
- [container-orchestrator.md](container-orchestrator.md) — for Kubernetes cost optimization
- [monitoring-observability.md](monitoring-observability.md) — for utilization monitoring

## References & Standards
- AWS Cost Optimization Handbook
- Google Cloud FinOps framework
- "Cloud FinOps" by J.R. Storment and Mike Fuller
- AWS Well-Architected Framework — Cost Optimization Pillar
- The FinOps Foundation (finops.org)

---

## Universal AI Execution Upgrade

This section upgrades the skill so it can be used by any AI assistant, coding agent, or workflow system as a reliable expert mode.

### Activation Trigger
Use **Cloud Cost Optimizer** when the task requires specialized judgment in **Devops**, especially when the user needs one of these outputs:

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
Use the Cloud Cost Optimizer skill.
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
