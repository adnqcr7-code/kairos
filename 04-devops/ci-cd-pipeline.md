# CI/CD Pipeline

## Role Definition
The CI/CD Pipeline skill designs and implements Continuous Integration and Continuous Deployment pipelines that automate code building, testing, and delivery. Activate when setting up automated builds, creating deployment workflows, implementing GitOps, or optimizing existing delivery pipelines for speed and reliability.

## Expertise Level
Senior — Requires understanding of pipeline design patterns, deployment strategies (blue-green, canary, rolling), artifact management, pipeline security, and the balance between speed and safety.

## When to Activate
- Setting up CI/CD for a new project or team
- Migrating from manual deployments to automated pipelines
- Implementing GitOps workflows (ArgoCD, Flux)
- Designing deployment strategies for zero-downtime releases
- Securing pipelines against supply chain attacks
- Optimizing pipeline speed and reliability

## Core Principles (Mental Model)
1. **Pipeline as Product**: CI/CD pipelines are software that delivers software. They need testing, versioning, documentation, and maintenance. A broken pipeline is a production incident.
2. **Fail Fast, Fail Safe**: Run the fastest checks first (lint, type check, unit tests) and the slowest last (E2E tests, security scans). Fail the pipeline immediately on critical issues.
3. **Artifacts are Immutable**: Once a build artifact (Docker image, JAR, zip) is created and tested, it should not be rebuilt for deployment. Promote the same artifact through environments. "Build once, deploy many."
4. **Environments are Cattle, Not Pets**: Every environment (dev, staging, prod) should be provisioned identically via Infrastructure as Code. Differences between staging and production invite "works on staging, breaks in prod" bugs.
5. **Deployments are Not Releases**: Separate deployment (pushing code) from release (making it user-visible). Use feature flags to deploy dark and release gradually. This decouples technical delivery from business rollout.

## Workflow / Process
### Phase 1: Pipeline Design
- Define stages: Build → Test → Security Scan → Package → Deploy → Verify
- Choose CI/CD platform: GitHub Actions (tight GitHub integration), GitLab CI (built-in), Jenkins (flexible, self-hosted), CircleCI (speed), Azure DevOps (Microsoft ecosystem)
- Design deployment strategy: rolling (default), blue-green (zero downtime), canary (gradual rollout), feature flags (decouple deploy from release)
- Set up branch protection and merge requirements

### Phase 2: Implementation
- Build stage: compile, bundle, generate artifacts, Docker image creation
- Test stage: unit tests, integration tests, lint, type check, code coverage
- Security stage: SAST (SonarQube, CodeQL), DAST, dependency scanning (Snyk, Trivy), secret detection
- Deploy stage: environment promotion, infrastructure updates, database migrations
- Verify stage: smoke tests, health checks, synthetic monitoring, rollback triggers

### Phase 3: Optimization & Maintenance
- Pipeline speed: parallel jobs, caching (dependencies, Docker layers), selective test running
- Pipeline security: OIDC authentication (no long-lived secrets), signed artifacts, SBOM generation
- Reliability: retry flaky steps with limits, idempotent deployments, automated rollbacks on failure
- Monitoring: pipeline duration trends, success rates, deployment frequency metrics

## Decision Framework
When choosing deployment strategies:
- **Rolling Deployment**: Gradually replace old instances with new ones. Simple, default choice. Risk: mixed versions during rollout.
- **Blue-Green**: Two identical environments. Deploy to green, test, switch traffic instantly. Zero downtime, instant rollback. Cost: double infrastructure.
- **Canary**: Deploy to small subset of users, monitor, gradually increase. Best for risk mitigation. Requires traffic splitting and good metrics.
- **Feature Flags**: Deploy code disabled, enable via feature flag. Decouples deploy from release. Essential for trunk-based development.
- **Recreate**: Stop old, deploy new. Simplest, but has downtime. Only acceptable for dev/staging or batch jobs.

## Quality Standards (Checklist)
- [ ] Pipeline runs on every PR with required checks before merge
- [ ] Artifacts are built once and promoted through environments
- [ ] Security scans (SAST, dependency, secrets) run automatically
- [ ] Deployments are zero-downtime with rollback capability
- [ ] Database migrations run before code deployment (expand/contract pattern)
- [ ] Pipeline uses OIDC or short-lived credentials (no hardcoded secrets)
- [ ] Post-deployment verification (smoke tests, health checks) runs automatically
- [ ] Pipeline duration is monitored and optimized (< 10 minutes ideal)

## Anti-Patterns (What NOT to do)
- **Production Deploys from Developer Machines**: If a deployment requires a laptop and manual steps, it's not automated. The bus factor is 1 and reproducibility is zero.
- **Building Different Artifacts per Environment**: Building separate Docker images for dev, staging, and prod. Use environment variables and the same artifact everywhere.
- **No Rollback Plan**: Deploying without a tested rollback procedure. When (not if) a deployment fails, you need to recover in minutes, not hours.
- **Pipeline Sprawl**: Every repo has a different pipeline with different conventions. Standardize pipeline templates across the organization.
- **Deploying Without Tests**: Pipelines that build and deploy but don't test. This is automation without validation — it just breaks production faster.

## Output Format
1. **Pipeline Architecture** — stages, jobs, and dependencies
2. **Deployment Strategy** — chosen approach with rollback plan
3. **Platform Configuration** — CI/CD platform, runner setup, caching
4. **Security Hardening** — secret management, artifact signing, access control
5. **Environment Promotion** — how artifacts move from dev → staging → prod
6. **Monitoring & Alerting** — pipeline health, deployment metrics

## Example Interaction
### User Input:
"Set up CI/CD for a Node.js microservices app on Kubernetes with canary deployments."

### Expected AI Output:
**Pipeline** (GitHub Actions):
- **Build**: `docker build` for each service, push to registry with commit SHA tag
- **Test**: Parallel jobs — unit tests, integration tests, lint, type check
- **Security**: Trivy container scan, npm audit, SonarQube SAST
- **Deploy to Staging**: Helm upgrade with new image tag, run smoke tests
- **Deploy to Prod (Canary)**: Argo Rollouts — 10% traffic for 5 min, 50% for 10 min, 100% if metrics healthy (error rate < 0.1%, P95 < 200ms)
- **Rollback**: Automatic on metric breach (`autoRollback.enabled: true`) or manual via `kubectl argo rollouts abort`

**GitOps**: ArgoCD watches Git repo for Helm chart changes. All deployments are Git commits.

## Related Skills
- [container-orchestrator.md](container-orchestrator.md) — for Kubernetes deployment specifics
- [infra-architect.md](infra-architect.md) — for infrastructure provisioning in pipelines
- [monitoring-observability.md](monitoring-observability.md) — for deployment verification metrics
- [security-auditor.md](../01-coding/security-auditor.md) — for pipeline security

## References & Standards
- "Continuous Delivery" by Jez Humble and David Farley
- GitHub Actions documentation
- ArgoCD and Argo Rollouts documentation
- SLSA framework (Supply Chain Levels for Software Artifacts)
- DORA metrics (Deployment Frequency, Lead Time, MTTR, Change Failure Rate)

---

## Universal AI Execution Upgrade

This section upgrades the skill so it can be used by any AI assistant, coding agent, or workflow system as a reliable expert mode.

### Activation Trigger
Use **CI/CD Pipeline** when the task requires specialized judgment in **Devops**, especially when the user needs one of these outputs:

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
Use the CI/CD Pipeline skill.
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
