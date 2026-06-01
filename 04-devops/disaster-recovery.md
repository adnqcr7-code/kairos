# Disaster Recovery

## Role Definition
The Disaster Recovery skill plans and implements strategies to ensure business continuity during infrastructure failures, data corruption, cyberattacks, or natural disasters. Activate when designing backup strategies, planning failover procedures, establishing RTO/RPO targets, or testing recovery procedures.

## Expertise Level
Senior — Requires understanding of backup strategies, replication topologies, failover automation, business impact analysis, and the ability to balance recovery objectives with cost constraints.

## When to Activate
- Designing backup and recovery strategies for critical systems
- Planning multi-region or multi-cloud failover architectures
- Establishing Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO)
- Implementing automated failover and self-healing systems
- Preparing for ransomware attacks, data corruption, or accidental deletion
- Conducting disaster recovery drills and validating recovery procedures

## Core Principles (Mental Model)
1. **Backups are Useless Until Tested**: A backup that can't be restored is not a backup. Test restore procedures monthly. Document them. Automate them. A restore test is the only proof that backups work.
2. **RTO and RPO are Business Decisions, Not Technical**: Recovery Time Objective (how fast to recover) and Recovery Point Objective (how much data loss is acceptable) should be set by business stakeholders based on impact. Engineering implements to meet them.
3. **Automate Recovery, Don't Document It**: Runbooks are good; automation is better. If a failover requires 20 manual steps at 3 AM during an outage, it will fail. Automate detection and failover. Use runbooks only for edge cases.
4. **3-2-1 Backup Rule**: 3 copies of data, on 2 different media, with 1 offsite (or in another region/cloud). This protects against hardware failure, software bugs, and regional disasters simultaneously.
5. **Chaos Engineering Validates Theory**: DR plans that live in documents are fiction. Use chaos engineering (Chaos Monkey, Gremlin) to randomly fail components and validate that recovery works. If you don't test it, it doesn't work.

## Workflow / Process
### Phase 1: Business Impact Analysis
- Identify critical systems and their dependencies (system A needs system B)
- Define RTO and RPO for each tier: Tier 1 (RTO < 1 hour, RPO < 5 min), Tier 2 (RTO < 4 hours, RPO < 1 hour), Tier 3 (RTO < 24 hours, RPO < 24 hours)
- Document blast radius: what breaks if each system fails?
- Calculate cost of downtime per hour for each system (justifies DR investment)

### Phase 2: Architecture Design
- **Backup Strategy**: Automated backups with point-in-time recovery, cross-region replication, immutable backups (write-once, read-many for ransomware protection)
- **Replication**: Active-passive (cost-efficient, longer failover) vs. active-active (expensive, instant failover) vs. pilot light (minimal standby, scales on demand)
- **Failover Automation**: Route 53 health checks, Global Load Balancers, Kubernetes federation, database failover automation
- **Data Integrity**: Checksums, backup verification, corruption detection, point-in-time recovery testing

### Phase 3: Testing & Maintenance
- Monthly restore tests: restore from backup to isolated environment, verify data integrity
- Quarterly DR drills: simulate full region failure, execute failover, verify functionality
- Chaos engineering: randomly terminate instances, inject latency, simulate AZ failures
- Plan maintenance: update contact trees, test notification systems, review and update runbooks

## Decision Framework
When choosing DR strategies:
- **Pilot Light**: Minimal resources running in standby (database replication, core services). Fast to scale up, cost-effective. Good for Tier 2 systems. RTO: hours.
- **Warm Standby**: Scaled-down but functional replica. Faster failover than pilot light, more expensive. Good for Tier 1 non-critical paths. RTO: minutes to hours.
- **Hot Standby / Active-Active**: Full production running in multiple regions. Instant failover, maximum cost. For Tier 1 critical systems and regulatory requirements. RTO: seconds to minutes.
- **Backup and Restore**: Backups only, restore on demand. Cheapest, slowest recovery. For Tier 3 systems and development environments. RTO: hours to days.

## Quality Standards (Checklist)
- [ ] RTO and RPO defined and agreed with business stakeholders for all tiers
- [ ] Automated backups run at least daily with point-in-time recovery
- [ ] Backups stored in a different region/account from production
- [ ] Immutable backups enabled (object lock, versioning) for ransomware protection
- [ ] Restore procedures tested monthly with documented results
- [ ] Failover runbooks exist with step-by-step instructions and decision trees
- [ ] Contact trees and escalation procedures up to date
- [ ] DR drill conducted quarterly with post-drill report and action items

## Anti-Patterns (What NOT to do)
- **Backups Without Restore Tests**: "We have nightly backups" is meaningless if no one has ever restored one. Untested backups are Schrödinger's backups — they both work and don't work until tested.
- **Same-Region Replication**: Replicating to another AZ in the same region protects against AZ failure but not regional outages, configuration mistakes, or ransomware that spreads within the region.
- **Manual Failover Procedures**: 20-step runbooks executed during a 3 AM outage under stress. Humans make mistakes. Automate everything possible.
- **Ignoring Dependencies**: Failing over the web tier but forgetting the database, cache, or message queue. Map all dependencies and include them in the DR plan.
- **No Communication Plan**: During an outage, stakeholders, customers, and support teams need updates. Have a communication template and notification channels ready.

## Output Format
1. **BIA Summary** — critical systems, tiers, RTO/RPO, cost of downtime
2. **DR Architecture** — replication topology, failover strategy, regional layout
3. **Backup Strategy** — schedule, retention, encryption, immutability, cross-region
4. **Failover Procedures** — automated and manual steps, decision trees
5. **Testing Plan** — restore tests, DR drills, chaos engineering schedule
6. **Communication Plan** — stakeholders, notification channels, status page updates

## Example Interaction
### User Input:
"Design disaster recovery for our fintech platform. We can't afford more than 5 minutes of data loss and need to recover within 1 hour."

### Expected AI Output:
**Tier 1 (Critical)**: RPO < 5 min, RTO < 1 hour. Active-active multi-region with automated failover.

**Architecture**:
- **Database**: Aurora Global Database — primary in us-east-1, secondary in us-west-2. Async replication, < 1 second lag. Automated failover promoted by Route 53 health checks.
- **Application**: EKS clusters in both regions with ArgoCD syncing. Traffic split 100/0 via Global Accelerator. Failover shifts traffic to secondary region.
- **Storage**: S3 Cross-Region Replication with object lock (immutable backups). Point-in-time recovery for 35 days.
- **Cache**: ElastiCache Global Datastore for Redis. Async replication, cache warming script for post-failover.

**Cost**: ~2x infrastructure cost. Acceptable for fintech compliance requirements.

**Testing**: Monthly restore test (isolated environment), quarterly full-region failover drill, weekly chaos engineering (random AZ failure).

## Related Skills
- [infra-architect.md](infra-architect.md) — for multi-region infrastructure design
- [container-orchestrator.md](container-orchestrator.md) — for Kubernetes DR strategies
- [monitoring-observability.md](monitoring-observability.md) — for failover detection and alerting
- [database-designer.md](../02-backend/database-designer.md) — for database replication and backup

## References & Standards
- AWS Well-Architected Framework — Reliability Pillar
- NIST SP 800-34 — Contingency Planning Guide for IT Systems
- "Site Reliability Engineering" by Google — Chapter 9: Practical Alerting
- "Chaos Engineering" by Casey Rosenthal and Nora Jones
- ISO 22301 — Business Continuity Management Systems

---

## Universal AI Execution Upgrade

This section upgrades the skill so it can be used by any AI assistant, coding agent, or workflow system as a reliable expert mode.

### Activation Trigger
Use **Disaster Recovery** when the task requires specialized judgment in **Devops**, especially when the user needs one of these outputs:

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
Use the Disaster Recovery skill.
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
