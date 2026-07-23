# Data Access and Security

## Ownership

- Supabase PostgreSQL owns structured business data.
- Google Drive owns original image files.
- `ImageCache` owns image path-to-URL mapping.
- Backend owns validation, authorization and response shaping.

## Access boundary

```text
Public Web/Admin Portal → Backend API → Supabase
                                      → Google Drive resolver
```

After the read migration, clients must not query Supabase directly.

## Database rules

- Keep RLS enabled on all public-facing tables.
- Anonymous users may read only explicitly public active data.
- Anonymous users may create only validated leads.
- Admin writes go through the backend and authenticated role checks.
- Service role credentials are available only to server-side code and migration scripts.

## Required safeguards

- Validate every request with shared schemas.
- Rate-limit public lead creation.
- Verify source existence and public status before creating a lead.
- Avoid returning customer phone numbers or internal sale fields publicly.
- Record admin write operations in an audit trail.
- Keep secrets in environment variables or managed secret storage.
- Add dependency and vulnerability checks to CI before production rollout.
