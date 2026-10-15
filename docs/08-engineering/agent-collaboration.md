# Agent collaboration protocol

## Roles

- **Coordinator (primary agent):** owns task board, decisions, shared contracts, dependencies, integrations and final quality gate.
- **Subagent:** owns only assigned directories/files and produces a reviewable artifact with tests/evidence and handoff.
- Maximum three active subagents alongside the coordinator.

## Waves

1. Coordinator publishes product glossary, architecture boundaries and task/file ownership.
2. Parallel work: data+crawling; ML; architecture+API (separate exclusive paths).
3. After contract acceptance: product/UI; engineering/operations; implementation phases.
4. Cross-review, resolve conflicts centrally, validate links/contracts and integrate.

## Handoff and conflict rules

Each task states IDs, inputs, outputs, allowed paths, excluded scope, dependency, acceptance, verification and rollback. Handoff reports changed files, decisions consumed, checks run, open questions and risks. Subagents do not change shared decisions, stage/commit, switch branches or edit files outside ownership. The coordinator resolves contract conflict before dependent work proceeds. Parallel edits are limited to disjoint paths; a shared file has one named owner.

## Completion

Coordinator verifies task acceptance, link integrity, consistent terminology, status labels and no accidental application/data changes. A task is not complete until its artifacts are accepted and the task board is updated.
