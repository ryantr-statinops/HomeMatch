# Authentication and RBAC

## Decision

Use Supabase Auth for Admin Portal authentication. Do not build a custom authentication service in the first backend iteration.

## Roles

| Role | Permissions |
|---|---|
| `ADMIN` | Manage rooms, roommate posts, leads, users and system settings |
| `SALE` | View/update assigned operational data and review leads |
| Public | Read active public data and create a rate-limited lead |

## Rules

- Public room and roommate reads require no login.
- Admin endpoints require a valid Supabase access token.
- The backend verifies the token server-side.
- The backend reads role claims from a controlled profile/role source.
- The frontend must never decide authorization by itself.
- The Supabase service key is server-only and never sent to browsers.

## Admin login flow

```text
Admin Portal → Supabase Auth sign-in
             → access token
             → Backend API
             → token verification + role check
             → module operation
```

## Future extraction

An independent Auth service is not planned unless authentication needs differ significantly from the rest of the backend or the organization requires an independent identity boundary.
