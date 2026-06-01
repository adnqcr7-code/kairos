# ETL Pipeline

## Role Definition
The ETL Pipeline skill designs and implements Extract, Transform, Load (or ELT) workflows that move data from source systems to destination systems with appropriate cleansing, enrichment, and transformation. Activate when building data integration workflows, migrating data between systems, creating data synchronization processes, or implementing batch/streaming data processing.

## Expertise Level
Senior — Requires understanding of data integration patterns, change data capture (CDC), slowly changing dimensions (SCD), data quality frameworks, error handling strategies, and the trade-offs between batch and streaming processing.

## When to Activate
- Building pipelines to move data from operational databases to data warehouses
- Implementing CDC for real-time data synchronization
- Creating batch processing jobs for reporting and analytics
- Designing data quality checks and validation within pipelines
- Handling slowly changing dimensions in dimensional models
- Choosing between ETL tools (Airflow, dbt, Spark, Fivetran, Stitch)

## Core Principles (Mental Model)
1. **ELT Over ETL When Possible**: Modern cloud warehouses (Snowflake, BigQuery) are powerful enough to handle transformations. Extract and load raw data first, then transform in SQL (dbt). This preserves raw history and simplifies debugging. ETL is for complex transformations that warehouses can't handle.
2. **Idempotency is Mandatory**: Running a pipeline twice should produce the same result. Use MERGE/UPSERT, overwrite partitions, or track processed files with a watermark. Idempotency enables safe retries and backfills.
3. **Schema Drift Will Happen**: Source schemas change — columns are added, renamed, or removed. Design pipelines that handle drift: use schema registries, landing zones with flexible schemas, and automated alerting on schema changes.
4. **Data Quality is a Pipeline Concern**: Don't wait for analysts to discover bad data. Embed quality checks in pipelines: null checks, range validations, referential integrity, uniqueness constraints. Fail fast on critical issues, quarantine on non-critical.
5. **Observability for Pipelines**: Pipelines need the same observability as production services. Monitor: latency (time from extract to load), freshness (how stale is the data?), volume (row counts, file sizes), and quality (error rates).

## Workflow / Process
### Phase 1: Source Analysis & Extraction Design
- Catalog source systems: databases, APIs, files, SaaS applications, event streams
- Determine extraction strategy: full extracts (small tables), incremental (CDC, timestamp columns, auto-increment IDs), or streaming (Kafka, Kinesis)
- Assess data quality at source: null rates, data types, consistency, documentation
- Design extraction schedule based on business requirements and source system impact

### Phase 2: Transformation Design
- Define cleansing rules: deduplication, null handling, standardization (dates, addresses, names), encoding fixes
- Design enrichment: lookups to reference data, geocoding, derived calculations
- Apply business rules: filtering, aggregation, currency conversion, unit standardization
- Handle SCDs: Type 1 (overwrite), Type 2 (history tracking with effective dates), Type 3 (previous value column)

### Phase 3: Loading & Orchestration
- Design load strategy: truncate-and-load, upsert/merge, append-only, partition overwrite
- Choose orchestration: Airflow (flexible, code-based), Dagster (data-aware), Prefect (modern), dbt Cloud (SQL transformations), Fivetran (managed SaaS)
- Implement error handling: retry logic, dead letter queues, alerting, partial failure handling
- Set up monitoring: pipeline duration, row counts, data freshness, quality check results

## Decision Framework
When choosing ETL vs. ELT and tools:
- **ELT (Extract → Load → Transform)**: Use with modern cloud warehouses (Snowflake, BigQuery, Redshift). Transform in SQL with dbt. Best for: SQL-savvy teams, schema-on-read flexibility, preserving raw data.
- **ETL (Extract → Transform → Load)**: Use when complex non-SQL transformations needed (ML preprocessing, heavy text processing, complex business logic). Tools: Spark, Python scripts, Informatica.
- **Managed SaaS (Fivetran, Stitch, Airbyte)**: Use for common SaaS connectors (Salesforce, HubSpot, Zendesk). Fast to set up, less flexible. Pay per MAR (Monthly Active Rows).
- **Streaming (Kafka, Spark Streaming, Flink)**: Use when latency matters (real-time analytics, fraud detection). More complex but enables sub-second data freshness.

## Quality Standards (Checklist)
- [ ] Pipeline is idempotent and can be safely re-run
- [ ] Data quality checks embedded at extract, transform, and load stages
- [ ] Schema drift detection and handling implemented
- [ ] Error handling with retry logic and dead letter queues
- [ ] Monitoring for latency, freshness, volume, and quality metrics
- [ ] Backfill capability tested and documented
- [ ] Sensitive data masked or encrypted in non-production environments
- [ ] Pipeline documentation includes data lineage and transformation logic

## Anti-Patterns (What NOT to do)
- **Full Extracts Every Run**: Extracting entire source tables every pipeline run. This doesn't scale. Use incremental extraction (CDC or watermark-based) for large tables.
- **No Error Handling**: Pipelines that fail completely on a single bad row. Implement quarantine patterns: write bad rows to a quarantine table, process good rows, alert on quarantine count.
- **Transforming Before Loading (When ELT Would Work)**: Using complex Python ETL when SQL dbt transformations in the warehouse would be simpler and more maintainable.
- **No Data Lineage**: Pipelines where no one knows where data came from or what transformations were applied. Document lineage and use tools (DataHub, Monte Carlo, dbt docs) to track it.
- **Untested Backfills**: Discovering that backfills don't work when you urgently need to reprocess 6 months of data. Test backfill procedures regularly.

## Output Format
1. **Pipeline Architecture** — sources, destinations, transformations, tool selection
2. **Extraction Design** — strategy (full/incremental/CDC), schedule, watermark column
3. **Transformation Logic** — cleansing, enrichment, business rules, SCD handling
4. **Load Strategy** — target schema, merge logic, partitioning
5. **Quality Framework** — validation rules, quarantine strategy, alerting
6. **Monitoring & Operations** — metrics, runbooks, backfill procedures

## Example Interaction
### User Input:
"Design an ELT pipeline to load Salesforce data into Snowflake for analytics."

### Expected AI Output:
**Architecture**: Fivetran (extract/load) + dbt (transform) + Snowflake (warehouse).

**Extract/Load**: Fivetran connector for Salesforce → Snowflake `RAW.SALESFORCE` schema. Incremental sync every hour. Handles API quotas and schema drift.

**Transform** (dbt):
- **Staging**: `stg_salesforce__accounts`, `stg_salesforce__opportunities` — clean column names, type casts, basic filtering
- **Intermediate**: `int_opportunity_pipeline` — join opportunities with accounts and users, calculate stage durations
- **Mart**: `fct_opportunities`, `dim_accounts` — star schema for BI tools. SCD Type 2 on `dim_accounts` for historical tracking.

**Quality**: dbt tests — uniqueness on keys, referential integrity between facts and dims, non-null on critical columns, custom singular tests for business rules.

## Related Skills
- [data-engineer.md](data-engineer.md) — for overall data engineering architecture
- [sql-optimizer.md](sql-optimizer.md) — for transformation query optimization
- [database-designer.md](../02-backend/database-designer.md) — for target schema design

## References & Standards
- "The Data Warehouse Toolkit" by Ralph Kimball — ETL and dimensional modeling
- Apache Airflow documentation (airflow.apache.org)
- dbt documentation (docs.getdbt.com)
- Fivetran and Airbyte documentation
- "Data Pipelines Pocket Reference" by James Densmore

---

## Universal AI Execution Upgrade

This section upgrades the skill so it can be used by any AI assistant, coding agent, or workflow system as a reliable expert mode.

### Activation Trigger
Use **ETL Pipeline** when the task requires specialized judgment in **Data**, especially when the user needs one of these outputs:

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
Use the ETL Pipeline skill.
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
