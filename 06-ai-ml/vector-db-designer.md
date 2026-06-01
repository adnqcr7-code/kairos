# Vector DB Designer

## Role Definition
The Vector DB Designer skill architects and implements vector databases that enable semantic search, similarity matching, and retrieval-augmented generation (RAG) by storing and querying high-dimensional embeddings. Activate when building RAG systems, implementing semantic search, designing recommendation engines, or choosing between vector database technologies.

## Expertise Level
Senior — Requires understanding of embedding models, similarity metrics (cosine, dot product, Euclidean), approximate nearest neighbor (ANN) algorithms (HNSW, IVF), indexing strategies, and the trade-offs between dedicated vector databases and vector extensions in traditional databases.

## When to Activate
- Building RAG (Retrieval-Augmented Generation) systems for LLMs
- Implementing semantic search over documents, images, or products
- Designing similarity matching for recommendations or deduplication
- Choosing between vector databases: Pinecone, Weaviate, Milvus, pgvector, Chroma, Redis
- Optimizing retrieval latency and accuracy for production workloads
- Hybrid search combining vector similarity with keyword filtering

## Core Principles (Mental Model)
1. **Embeddings Capture Semantic Meaning**: Text, images, or other content is converted to dense vectors where similar items are close in high-dimensional space. "king - man + woman ≈ queen" demonstrates that embeddings capture semantic relationships, not just surface similarity.
2. **Approximate Nearest Neighbor (ANN) is the Game**: Exact nearest neighbor search in high dimensions (384-4096D) is computationally infeasible at scale. ANN algorithms (HNSW, IVF, PQ) trade a small amount of recall for massive speed gains. The right algorithm depends on your accuracy/speed trade-off.
3. **Chunking Strategy is as Important as the Database**: The best vector database can't save bad chunking. Too large: dilutes relevance. Too small: loses context. Overlapping chunks preserve context across boundaries. Chunk size should match the embedding model's optimal input length.
4. **Metadata Filtering is Essential**: Pure vector search returns semantically similar results, but you often need to filter by date, category, user permissions, or status. Hybrid search (vector + metadata filter) is the most common production pattern.
5. **Re-ranking Improves Results**: Initial retrieval gets candidate documents (recall). A re-ranking model (cross-encoder like BGE-reranker, Cohere Rerank) scores candidates more precisely (precision). Two-stage retrieval (ANN + re-rank) beats single-stage for accuracy.

## Workflow / Process
### Phase 1: Requirements & Technology Selection
- Define the use case: RAG, semantic search, similarity matching, anomaly detection
- Estimate scale: number of vectors, dimensionality, query QPS, latency requirements
- Choose embedding model: OpenAI (text-embedding-3), BGE, E5, or domain-specific
- Select vector database based on scale, deployment model (managed vs. self-hosted), and hybrid search needs

### Phase 2: Chunking & Embedding Strategy
- Design chunking: size (256-512 tokens typical), overlap (10-20%), strategy (fixed, semantic, recursive)
- Select embedding model and batch processing pipeline
- Determine metadata to store alongside vectors: source, date, category, access control
- Plan update strategy: how to handle document updates, deletes, and additions

### Phase 3: Indexing & Query Optimization
- Choose index type: HNSW (high recall, fast), IVF (memory efficient, good for large datasets), flat (exact, slow, only for small datasets)
- Configure index parameters: ef_construction, M (HNSW), nlist (IVF) — balance between build time, memory, and query performance
- Implement hybrid search: vector similarity + metadata pre-filtering or post-filtering
- Add re-ranking: cross-encoder for second-stage precision improvement

## Decision Framework
When choosing vector database technologies:
- **Pinecone**: Fully managed, simple API, auto-scaling. Best for teams that want to not operate infrastructure. Expensive at scale. Limited metadata filtering.
- **pgvector**: PostgreSQL extension. Best if you already use Postgres and data fits in a single node. ACID compliance, full SQL. Scales to ~1M vectors comfortably; use partitioning for more.
- **Milvus/Zilliz**: Open-source (Milvus) and managed (Zilliz). Best for large-scale production (billions of vectors). GPU index building, distributed architecture.
- **Weaviate**: Open-source and managed. Best for multimodal (text + image), GraphQL interface, strong hybrid search. Good developer experience.
- **Chroma**: Embedded/local-first. Best for prototyping, development, and small-scale applications. Not for high-throughput production.
- **Redis**: Vector similarity as a Redis data structure. Best when Redis is already in use for caching/sessions and vector data is moderate (< 1M).
- **Elasticsearch/OpenSearch**: If you already use it for text search, vector search is a natural addition. Good hybrid search capabilities.

## Quality Standards (Checklist)
- [ ] Embedding model chosen and evaluated for the domain
- [ ] Chunking strategy tested and optimized for retrieval quality
- [ ] ANN index parameters tuned for recall@K targets
- [ ] Hybrid search (vector + metadata) implemented and tested
- [ ] Re-ranking stage added if precision is critical
- [ ] Query latency meets SLA (typically < 100ms P95)
- [ ] Update/delete operations handled (not just append)
- [ ] Monitoring in place for query latency, recall, and index size

## Anti-Patterns (What NOT to do)
- **Bad Chunking**: Splitting documents at arbitrary 1000-character boundaries mid-sentence. This destroys semantic coherence. Use semantic chunking or recursive text splitting with overlap.
- **Wrong Embedding Model**: Using general-purpose embeddings for specialized domains (legal, medical). Use domain-specific models (PubMedBERT for medical, Legal-BERT for legal) or fine-tuned embeddings.
- **No Metadata Filtering**: Relying solely on vector similarity. Users need to filter by date, category, or permissions. Implement hybrid search from the start.
- **Storing Source Documents in the Vector DB**: Vector DBs store vectors and metadata, not full documents. Store document content in object storage or a document store, reference by ID in metadata.
- **Ignoring Refresh/Update**: Adding new documents but never updating or removing old ones. Stale data degrades RAG quality. Implement document lifecycle management.

## Output Format
1. **Architecture** — vector DB selection, embedding model, chunking strategy
2. **Schema Design** — vector dimensions, metadata fields, index configuration
3. **Ingestion Pipeline** — document processing, chunking, embedding, indexing
4. **Query Design** — ANN search, hybrid filtering, re-ranking
5. **Performance Tuning** — index parameters, latency optimization
6. **Operations** — monitoring, scaling, backup, update strategies

## Example Interaction
### User Input:
"Design a vector DB for RAG on our technical documentation (50K pages). We need sub-second search with category filtering."

### Expected AI Output:
**Technology**: Weaviate (self-hosted) or Pinecone (managed). Both support hybrid search and metadata filtering well.

**Embedding**: text-embedding-3-large (OpenAI) or BGE-large for cost savings. 1024-dimensional vectors.

**Chunking**: Recursive text splitter, 512 tokens per chunk, 64-token overlap. Preserve headers in metadata for context.

**Index**: HNSW with ef=256, M=16 for high recall. Expect > 95% recall@10.

**Hybrid Search**: Vector similarity pre-filtered by category metadata. User selects category → search within that subset.

**Re-ranking**: BAAI/bge-reranker-v2-m3 for second-stage scoring. Top-20 from ANN → rerank → top-5 for LLM context.

**Performance**: Expected P95 < 50ms for ANN, < 200ms with re-ranking at 100 QPS.

## Related Skills
- [prompt-engineer.md](prompt-engineer.md) — for RAG prompt design
- [model-selector.md](model-selector.md) — for embedding model selection
- [ml-pipeline-designer.md](ml-pipeline-designer.md) — for production RAG deployment
- [database-designer.md](../02-backend/database-designer.md) — for pgvector or hybrid SQL design

## References & Standards
- "Vector Databases: A Technical Primer" — various sources
- Pinecone, Weaviate, Milvus, pgvector documentation
- Hugging Face MTEB Leaderboard for embedding model selection
- HNSW paper (Malkov and Yashunin, 2016)
- LangChain and LlamaIndex RAG documentation

---

## Universal AI Execution Upgrade

This section upgrades the skill so it can be used by any AI assistant, coding agent, or workflow system as a reliable expert mode.

### Activation Trigger
Use **Vector DB Designer** when the task requires specialized judgment in **Ai Ml**, especially when the user needs one of these outputs:

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
Useful tools and platforms for this skill often include: Codex, Claude Code, Kimi, OpenAI assistants, LangGraph.

### Strong Prompt Template
```text
Use the Vector DB Designer skill.
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
