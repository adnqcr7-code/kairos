# State Management

## Role Definition
The State Management skill designs and implements strategies for handling application data that changes over time, including server state, client/UI state, form state, and URL state. Activate when deciding how to manage data flow, choosing state management libraries, or refactoring complex state logic.

## Expertise Level
Senior — Requires understanding of unidirectional data flow, reactive programming, state normalization, selector patterns, and the distinction between server state and client state.

## When to Activate
- Choosing a state management approach for a new application
- Refactoring spaghetti state logic (prop drilling, cascading updates)
- Designing data synchronization between client and server
- Implementing optimistic updates and rollback strategies
- Managing complex form state with validation
- Handling real-time collaborative state (WebSocket, CRDT)

## Core Principles (Mental Model)
1. **Server State != Client State**: Server state (data from API) is asynchronous, remote, and owned by the server. Client state (UI flags, form inputs) is synchronous, local, and owned by the client. Mixing them creates confusion. Use libraries like React Query/TanStack Query or SWR for server state.
2. **State Should Live as Low as Possible**: Avoid global state. If state is only used by one component and its children, keep it there. Global state should be a last resort, not a default.
3. **Normalize Complex State**: For nested relational data, normalize into flat structures (like a database). Use IDs for references. This prevents stale data duplication and makes updates predictable.
4. **Immutability is Mandatory**: State mutations create bugs that are hard to trace. Always create new objects/arrays when updating state. Use Immer if immutable updates are verbose.
5. **Actions Describe What Happened, Not What to Do**: `userLoggedIn(user)` not `setUser(user)`. Event-based actions are more descriptive, debuggable, and enable time-travel debugging.

## Workflow / Process
### Phase 1: State Inventory
- Categorize all state: server state, client/UI state, form state, URL state, global shared state
- Map state ownership: which component/module owns each piece of state?
- Identify derived state: what can be computed from other state? (Don't store computed values)
- Document state flow: how does state change? (user actions, API responses, WebSocket events)

### Phase 2: Architecture Design
- Choose state location: React Context (simple, low frequency), Zustand/Jotai (moderate), Redux (complex, time-travel needed), React Query (server state)
- Design the state shape: normalized or nested? Use `createEntityAdapter` (Redux) or manual normalization.
- Define actions/reducers: what events can change state? What are the transitions?
- Plan for side effects: thunks, sagas, or React Query for async operations

### Phase 3: Implementation & Optimization
- Implement selectors to prevent unnecessary re-renders (Reselect, Zustand selectors)
- Use memoization (React.memo, useMemo, useCallback) for derived data and callbacks
- Set up devtools: Redux DevTools, React Query DevTools, or Zustand middleware
- Write tests for state logic: pure reducer tests, integration tests for async flows

## Decision Framework
When choosing state management solutions:
- **React Query / SWR**: For server state (API data). Automatic caching, background refetching, optimistic updates, deduping, and pagination. This should be your default for API data.
- **Zustand**: For global client state. Minimal boilerplate, TypeScript-friendly, excellent DX. Good for theme, auth state, sidebar toggle, modals.
- **Jotai / Recoil**: For atom-based state. Fine-grained reactivity, derived atoms, no unnecessary re-renders. Good when different parts of UI need different slices of state.
- **Redux Toolkit**: For complex state with many interactions, time-travel debugging, or strict action logging. More boilerplate but powerful for large teams.
- **Context + useReducer**: For simple global state or dependency injection. Don't use for high-frequency updates (causes re-renders of all consumers).
- **URL State**: For shareable page state (filters, search, pagination). Use query parameters with libraries like `nuqs`.

## Quality Standards (Checklist)
- [ ] Server state is managed separately from client state (React Query/SWR)
- [ ] State is normalized for relational data (no nested duplication)
- [ ] Selectors are used to prevent unnecessary re-renders
- [ ] Actions are descriptive events, not imperative setters
- [ ] Side effects are isolated from UI components (in thunks/sagas/query hooks)
- [ ] State shape is serializable (enables persistence, hydration, devtools)
- [ ] Tests exist for reducer logic and state transitions
- [ ] No prop drilling (state is either local or properly lifted/injected)

## Anti-Patterns (What NOT to do)
- **Global State for Everything**: Putting form inputs, toggle states, and animation values in Redux. This creates unnecessary complexity and re-renders.
- **Storing Derived State**: Keeping a `fullName` field in state when it can be computed from `firstName + lastName`. Derived state gets out of sync.
- **Mutating State Directly**: `state.items.push(newItem)` instead of creating a new array. This breaks React's change detection and causes subtle bugs.
- **Prop Drilling**: Passing state through 5 layers of components that don't use it. Use Context or state management library instead.
- **Fetching in useEffect Without Caching**: Every component fetch creates redundant requests and loading states. Use a caching data-fetching library.

## Output Format
1. **State Inventory** — categorized list of all state with ownership
2. **Architecture** — chosen libraries and their responsibilities
3. **State Shape** — normalized schema with TypeScript types
4. **Action/Flow Design** — events, reducers, and side effects
5. **Component Integration** — how components connect to state
6. **Testing Strategy** — how to test state logic

## Example Interaction
### User Input:
"Our app has complex state with API data, user preferences, and real-time notifications. How should we manage it?"

### Expected AI Output:
**State Inventory**:
- **Server State**: User profile, notifications, dashboard data → React Query
- **Client State**: Theme, sidebar open/close, active modal → Zustand
- **URL State**: Active tab, filters → nuqs (query params)
- **Form State**: Settings form → React Hook Form (local, not global)

**Architecture**: React Query for server data (caching, refetching), Zustand for global UI state (minimal, typed store).

**Notifications**: Real-time via WebSocket. On incoming event, invalidate React Query cache → UI updates automatically. No manual state management needed.

## Related Skills
- [ui-architect.md](ui-architect.md) — for overall frontend architecture
- [frontend-performance.md](frontend-performance.md) — for optimizing re-renders
- [component-library.md](component-library.md) — for component-level state patterns

## References & Standards
- "Redux Essentials" and "RTK Query" documentation (redux.js.org)
- TanStack Query (React Query) documentation
- Zustand documentation (github.com/pmndrs/zustand)
- Jotai documentation (jotai.org)
- React Documentation — "Thinking in React" (state lifting)

---

## Universal AI Execution Upgrade

This section upgrades the skill so it can be used by any AI assistant, coding agent, or workflow system as a reliable expert mode.

### Activation Trigger
Use **State Management** when the task requires specialized judgment in **Frontend**, especially when the user needs one of these outputs:

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
Use the State Management skill.
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
