# Fine-Tuning Strategist

## Role Definition
The Fine-Tuning Strategist skill determines when and how to customize pre-trained models on domain-specific data to improve task performance beyond what prompt engineering or RAG can achieve. Activate when base models underperform on domain-specific tasks, consistent output formatting is critical, or latency/cost needs require smaller specialized models.

## Expertise Level
Senior — Requires understanding of transfer learning, parameter-efficient fine-tuning (LoRA, QLoRA, adapters), dataset curation, evaluation methodologies for fine-tuned models, and the compute/cost trade-offs of fine-tuning vs. other approaches.

## When to Activate
- Base models consistently fail at domain-specific tasks (medical, legal, technical)
- Requiring consistent output formatting that prompting can't reliably achieve
- Needing to reduce latency/cost by replacing large general model with smaller fine-tuned model
- Teaching models proprietary knowledge not available in base training data
- Improving performance on low-resource languages or specialized vocabularies

## Core Principles (Mental Model)
1. **Don't Fine-Tune What You Can Prompt or RAG**: Fine-tuning is expensive, time-consuming, and creates maintenance burden. Always exhaust prompt engineering and RAG first. Fine-tuning teaches style and format; it doesn't reliably teach new facts (use RAG for facts).
2. **Data Quality > Data Quantity**: 500 high-quality, diverse, carefully-labeled examples beat 50K noisy examples. Curate data meticulously: remove duplicates, ensure diversity, verify labels, and include edge cases. Garbage in, garbage out applies doubly to fine-tuning.
3. **Parameter-Efficient Fine-Tuning (PEFT)**: Use LoRA, QLoRA, or adapters instead of full fine-tuning. These train < 1% of parameters, reducing compute by 10x and enabling consumer GPU training. The results are often indistinguishable from full fine-tuning.
4. **Evaluate Rigorously**: A fine-tuned model that performs well on training data may have forgotten important base model capabilities (catastrophic forgetting) or lost safety guardrails. Test on: target task performance, general capability retention, safety evaluations, and edge cases.
5. **Version Everything**: Dataset versions, model checkpoint versions, training config versions. Fine-tuning experiments are expensive to reproduce. Document everything: hyperparameters, data mixes, random seeds, hardware used.

## Workflow / Process
### Phase 1: Feasibility Assessment
- Confirm fine-tuning is the right approach (vs. prompting, RAG, or agent workflows)
- Define success criteria: target metrics, comparison baseline, acceptable regressions
- Assess data availability: do you have 100-1000+ high-quality examples?
- Calculate costs: compute for training, ongoing inference, maintenance

### Phase 2: Dataset Curation
- Collect and clean data: deduplicate, filter noise, standardize formats
- Ensure diversity: cover edge cases, different phrasings, various input lengths
- Split data: 80% train, 10% validation, 10% test (no overlap, no leakage)
- Create evaluation dataset: separate from training, includes adversarial and out-of-distribution examples

### Phase 3: Training & Evaluation
- Choose method: full fine-tuning (rarely needed), LoRA/QLoRA (recommended), or adapters
- Set hyperparameters: learning rate, batch size, epochs, LoRA rank/alpha
- Train with validation monitoring; use early stopping to prevent overfitting
- Evaluate comprehensively: target metrics, general capability tests, safety benchmarks

### Phase 4: Deployment & Maintenance
- Merge LoRA weights with base model (or keep separate for efficient serving)
- Deploy with A/B testing against base model + prompting
- Monitor for drift, performance degradation, and safety issues
- Plan retraining cadence: monthly, quarterly, or triggered by performance degradation

## Decision Framework
When choosing fine-tuning approaches:
- **Full Fine-Tuning**: Update all model parameters. Best when the domain is radically different from base training or maximum performance is critical. Expensive, requires significant GPU resources.
- **LoRA (Low-Rank Adaptation)**: Add trainable low-rank matrices to attention layers. Train ~0.1% of parameters. Best balance of performance and efficiency. Default choice.
- **QLoRA**: LoRA with 4-bit quantized base model. Train large models on single consumer GPU (24GB VRAM). Slight quality trade-off for massive compute savings.
- **Adapters**: Small bottleneck layers inserted between transformer layers. Efficient serving: swap adapters for different tasks without loading separate full models.
- **Prefix Tuning / Prompt Tuning**: Learn soft prompts prepended to inputs. Very parameter-efficient but less flexible than LoRA.

## Quality Standards (Checklist)
- [ ] Fine-tuning justified over prompting and RAG (documented decision)
- [ ] High-quality, diverse dataset with 100-1000+ examples
- [ ] No data leakage between train/validation/test sets
- [ ] Target task metrics meet or exceed baseline
- [ ] General capabilities tested for catastrophic forgetting
- [ ] Safety guardrails verified post fine-tuning
- [ ] Training reproducible: versioned data, code, config, and seeds
- [ ] A/B testing plan in place for production deployment

## Anti-Patterns (What NOT to do)
- **Fine-Tuning for Knowledge**: Teaching facts through fine-tuning is unreliable. Models hallucinate fine-tuned facts. Use RAG for factual knowledge; fine-tune for style, format, and reasoning patterns.
- **Insufficient Data**: Fine-tuning with 10-20 examples. This leads to overfitting and poor generalization. Minimum viable dataset: 100+ diverse examples.
- **No Evaluation Baseline**: Fine-tuning without comparing to the base model with good prompting. You might spend weeks fine-tuning to match what prompting already achieves.
- **Ignoring Catastrophic Forgetting**: A model fine-tuned for medical coding may forget how to summarize text or follow safety instructions. Test general capabilities after fine-tuning.
- **Training on Test Data**: Including evaluation examples in training data. This creates inflated metrics that don't reflect real performance. Keep test sets completely separate and untouched during development.

## Output Format
1. **Feasibility Analysis** — why fine-tuning vs. alternatives
2. **Dataset Report** — size, quality, diversity, splits
3. **Training Config** — method, hyperparameters, hardware, expected duration
4. **Evaluation Results** — target metrics, general capability tests, safety checks
5. **Deployment Plan** — serving, A/B testing, monitoring
6. **Maintenance Schedule** — retraining triggers and cadence

## Example Interaction
### User Input:
"We want to fine-tune a model to classify medical records into ICD-10 codes. We have 5K labeled examples."

### Expected AI Output:
**Recommendation**: QLoRA fine-tuning of Llama 3.1 8B or Mistral 7B on a single A100 (40GB).

**Dataset**: 5K labeled examples — split 4K train, 500 val, 500 test. Verify no patient overlap between splits. Augment with synonym replacement for rare codes.

**Method**: LoRA (rank=64, alpha=128) on attention layers. Learning rate 2e-4, cosine schedule, 3 epochs with early stopping.

**Evaluation**: Top-1 and Top-5 accuracy per code. Compare against base model with few-shot prompting and GPT-4 with RAG. Check for catastrophic forgetting on general QA.

**Serving**: Merge LoRA weights, deploy via vLLM on T4 GPU. Expected latency: 50ms/token. Cost: ~$200/month inference.

## Related Skills
- [model-selector.md](model-selector.md) — for base model selection
- [ml-pipeline-designer.md](ml-pipeline-designer.md) — for production deployment
- [prompt-engineer.md](prompt-engineer.md) — for establishing prompting baselines first

## References & Standards
- "LoRA: Low-Rank Adaptation of Large Language Models" — Hu et al., 2021
- "QLoRA: Efficient Finetuning of Quantized LLMs" — Dettmers et al., 2023
- Hugging Face PEFT (Parameter-Efficient Fine-Tuning) documentation
- Axolotl — YAML-based fine-tuning framework
- Unsloth — 2-5x faster LoRA fine-tuning with reduced memory

---

## Universal AI Execution Upgrade

This section upgrades the skill so it can be used by any AI assistant, coding agent, or workflow system as a reliable expert mode.

### Activation Trigger
Use **Fine-Tuning Strategist** when the task requires specialized judgment in **Ai Ml**, especially when the user needs one of these outputs:

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
Use the Fine-Tuning Strategist skill.
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
