# Testing and Quality Strategy

## Required test layers

### Unit tests

Test module business rules in isolation:

- room filters and status mapping;
- roommate expiration;
- lead source validation;
- role/permission decisions;
- media fallback behavior.

### Integration tests

Verify backend modules against Supabase test data:

- room listing/detail;
- roommate listing/detail;
- lead creation;
- image cache resolution;
- authorization and RLS behavior.

### Contract tests

Verify that Web and Admin consume the API response schemas from `packages/shared` and that breaking changes are versioned.

### Smoke tests

Before rollout, verify:

- public home page;
- room listing and detail;
- roommate coming-soon/read flow;
- Zalo CTA;
- lead creation;
- admin login and one protected read/write flow;
- image loading and download.

## Quality gates

Every migration phase must pass lint, typecheck, tests and production build before the next phase starts. Existing public behavior must be compared before and after each read-path migration.
