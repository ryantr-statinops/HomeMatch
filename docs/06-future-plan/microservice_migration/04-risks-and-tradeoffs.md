# Risks and Tradeoffs

## Risk 1 - Overengineering

If we split into too many services too early, the project becomes harder to maintain than the current system.

### Mitigation

- start with one backend service
- split by module, not by unnecessary process boundary
- only extract separate services when a real need appears

## Risk 2 - Duplicate Source of Truth Confusion

Keeping Supabase and Google Drive can create confusion if the ownership rules are not clear.

### Mitigation

- database owns structured business data
- Google Drive owns file storage
- ImageCache owns path-to-URL mapping
- backend owns resolution and validation

## Risk 3 - Admin Security

Admin operations introduce the need for authentication and authorization.

### Mitigation

- role-based access control
- protected endpoints
- audit logs for write operations

## Risk 4 - Migration Breakage

Moving logic from the current Next.js services into a backend can break filters, image resolution, or lead tracking.

### Mitigation

- migrate feature by feature
- keep contract parity
- compare outputs before and after migration
- preserve old behavior until the new path is verified

## Tradeoff Summary

- Simplicity now vs scale later
- One backend boundary vs many independently deployed services
- Google Drive stability vs future storage consolidation
- Faster migration vs a cleaner long-term architecture

## Recommendation

The best tradeoff for this project is:

- one backend service
- two frontend apps
- Supabase as database
- Google Drive kept as image storage
- shared contracts for the whole system

