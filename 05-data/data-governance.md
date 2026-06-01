# Data Governance

## Role Definition
The Data Governance skill establishes policies, processes, and controls that ensure data is managed as a valuable organizational asset — maintaining quality, security, privacy, and compliance throughout its lifecycle. Activate when establishing data stewardship, implementing privacy compliance (GDPR, CCPA), creating data catalogs, or defining data quality standards.

## Expertise Level
Senior — Requires understanding of regulatory frameworks, data stewardship models, metadata management, data lineage, master data management (MDM), and the organizational change management needed to implement governance.

## When to Activate
- Establishing data ownership and stewardship roles
- Implementing GDPR, CCPA, HIPAA, or other privacy regulations
- Creating enterprise data catalogs and metadata management
- Defining and enforcing data quality standards
- Setting up data access controls and classification schemes
- Implementing master data management (MDM) programs

## Core Principles (Mental Model)
1. **Governance is Enablement, Not Bureaucracy**: Well-designed governance helps teams find, trust, and use data faster. If governance is seen as a bottleneck, it's implemented wrong. Frame governance as "data product management" — making data more valuable.
2. **Data Without Metadata is Useless**: Users need to know what data exists, what it means, where it comes from, who owns it, and whether they can trust it. A data catalog with business definitions, lineage, and quality scores is essential.
3. **Privacy by Design**: Don't bolt privacy on after the fact. Build data minimization, purpose limitation, and retention controls into pipelines from the start. Default to collecting less data, not more.
4. **Trust but Verify**: Data producers certify their data quality. Data consumers verify it meets their needs. Automated quality checks provide objective evidence. Trust is earned through transparency, not assumed.
5. **Federated Governance**: Centralized data governance teams become bottlenecks. Empower domain teams to govern their own data with centrally-defined standards (data mesh approach). Central team sets policy; domains implement.

## Workflow / Process
### Phase 1: Foundation & Assessment
- Identify regulatory requirements: GDPR, CCPA, HIPAA, SOC2, industry-specific
- Assess current state: data inventory, quality issues, access patterns, compliance gaps
- Define data domains and appoint data stewards/owners per domain
- Create a data governance council with business, legal, and technical representatives

### Phase 2: Policy & Framework Development
- **Data Classification**: Public, Internal, Confidential, Restricted — with handling requirements per class
- **Access Control**: Role-based access, need-to-know principle, audit trails for sensitive data access
- **Data Quality Standards**: Completeness, accuracy, timeliness, consistency metrics with SLAs
- **Retention & Lifecycle**: How long to keep data, archival policies, secure deletion procedures
- **Privacy Controls**: Consent management, right to erasure, data portability, anonymization/pseudonymization

### Phase 3: Implementation & Operations
- Deploy data catalog (DataHub, Collibra, Alation, or Amundsen)
- Implement data lineage tracking (OpenLineage, Monte Carlo, or built-in warehouse features)
- Automate data quality checks and publish quality scores
- Set up access request workflows with approval chains
- Monitor compliance: regular audits, access reviews, retention policy enforcement

## Decision Framework
When implementing governance approaches:
- **Centralized**: Single data team owns all governance. Good for small organizations. Becomes a bottleneck as scale increases.
- **Federated (Data Mesh)**: Domain teams own their data products. Central team provides platform and standards. Good for large organizations with many domains.
- **Hybrid**: Central governance for sensitive/regulated data, federated for analytical/operational data. The practical middle ground for most organizations.
- **Tools**: DataHub (open-source, flexible), Collibra (enterprise, expensive), Alation (discovery-focused), Monte Carlo (data observability). Choose based on scale and budget.

## Quality Standards (Checklist)
- [ ] Data catalog covers > 80% of production datasets with business definitions
- [ ] Data classification applied to all datasets (Public, Internal, Confidential, Restricted)
- [ ] Access controls enforce need-to-know with audit logging
- [ ] Data quality checks automated with published scores and SLAs
- [ ] Privacy compliance verified: consent, right to erasure, data portability implemented
- [ ] Data retention policies defined and enforced with automated archival/deletion
- [ ] Data lineage tracked from source to consumption for critical datasets
- [ ] Quarterly access reviews conducted for sensitive data

## Anti-Patterns (What NOT to do)
- **Governance Theater**: Creating policies that no one follows or enforces. Governance without teeth is worse than no governance — it creates cynicism.
- **Perfect Metadata Before Any Access**: Requiring exhaustive documentation before data is discoverable. This prevents data sharing. Start with auto-generated metadata (schema, lineage) and enrich over time.
- **One-Size-Fits-All Classification**: Treating all data the same. Marketing analytics and patient health records need very different governance. Classify based on sensitivity and regulatory requirements.
- **Ignoring Shadow IT**: Teams creating "shadow data pipelines" because official governance is too slow. This is a symptom of governance failure, not team misbehavior.
- **No Executive Sponsorship**: Data governance without C-level support fails. It requires cross-functional authority and budget. Get an executive sponsor before starting.

## Output Format
1. **Governance Framework** — organizational structure, roles, and responsibilities
2. **Data Classification Scheme** — levels, criteria, and handling requirements
3. **Policy Documentation** — access, quality, privacy, retention policies
4. **Catalog Implementation** — tool selection, metadata standards, rollout plan
5. **Quality Framework** — metrics, checks, SLAs, and monitoring
6. **Compliance Roadmap** — regulatory requirements, implementation timeline

## Example Interaction
### User Input:
"We need to implement GDPR compliance for our customer data. Where do we start?"

### Expected AI Output:
**GDPR Compliance Roadmap**:

**Phase 1 (Month 1-2) — Discovery**:
- Data mapping: Identify all systems storing EU customer data (CRM, database, analytics, backups, third parties)
- Legal basis audit: Document lawful basis for each processing activity (consent, contract, legitimate interest)
- DPIA: Data Protection Impact Assessment for high-risk processing

**Phase 2 (Month 2-4) — Implementation**:
- Consent management: Implement granular consent collection with audit trail
- Right to erasure: Build data deletion workflow that removes data from all systems (including backups within retention limits)
- Data portability: Export customer data in machine-readable format (JSON)
- Privacy notice: Update to include all processing activities, retention periods, and DPA contact

**Phase 3 (Month 4-6) — Operations**:
- DPO appointment: If required (core processing or large-scale monitoring)
- SAR workflow: Subject Access Request process with 30-day response SLA
- Data retention: Automated deletion after retention period expires
- Vendor DPAs: Data Processing Agreements with all subprocessors

**Ongoing**: Quarterly access reviews, annual DPIA refresh, privacy training for all staff handling personal data.

## Related Skills
- [data-engineer.md](data-engineer.md) — for technical data pipeline implementation
- [security-auditor.md](../01-coding/security-auditor.md) — for data security controls
- [database-designer.md](../02-backend/database-designer.md) — for data classification in schema design

## References & Standards
- DAMA-DMBOK (Data Management Body of Knowledge)
- "Data Mesh" by Zhamak Dehghani
- GDPR Regulation (EU) 2016/679
- CCPA/CPRA (California Consumer Privacy Act)
- NIST Privacy Framework
- "Designing Data-Intensive Applications" by Martin Kleppmann — Chapter 12: Future of Data Systems

---

## Universal AI Execution Upgrade

This section upgrades the skill so it can be used by any AI assistant, coding agent, or workflow system as a reliable expert mode.

### Activation Trigger
Use **Data Governance** when the task requires specialized judgment in **Data**, especially when the user needs one of these outputs:

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
Useful tools and platforms for this skill often include: Google Sheets, Power BI, Tableau, SQL databases.

### Strong Prompt Template
```text
Use the Data Governance skill.
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
