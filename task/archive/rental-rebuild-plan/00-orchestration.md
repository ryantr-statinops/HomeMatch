# Orchestration protocol

## Roles and authority

Coordinator (primary agent) owns shared glossary/decisions, task board, cross-service contracts, task assignment, integration, conflict resolution and commits on `main`. Subagents own only assigned paths and provide implementation/review artifacts; they do not stage, commit, switch branches, alter shared decisions or edit outside ownership.

## Wave policy

1. **Decision wave:** coordinator accepts product scope, glossary, service boundaries and data concepts.
2. **Parallel foundations:** up to three exclusive work packages (for example data/crawling, ML, API/architecture).
3. **Dependent build:** UI, engineering, operations, implementation plans begin after relevant contracts are accepted.
4. **Review wave:** independent review checks links, terminology, security, test evidence and ownership; coordinator resolves disagreements.

Parallelism is justified only when file ownership and interfaces do not overlap. A shared contract has one owner; other agents consume it and report proposed changes instead of editing it.

## Task packet

Every assignment includes task ID, objective, dependency and accepted input revision, owned file paths, excluded scope, interface, expected output, verification, exit criteria, rollback and handoff destination.

## Handoff schema

Report files changed; summary of behavior/document; decisions consumed; commands/checks and results; assumptions; unresolved questions; risks; recommended next task. Coordinator independently checks acceptance before marking complete.

## Conflict and failure

Stop dependent agents if a shared assumption changes. Coordinator decides or asks product owner only for product choices that cannot be discovered. Failed agent work remains unaccepted until repaired/reassigned. Never merge contradictory API, data or model definitions.
