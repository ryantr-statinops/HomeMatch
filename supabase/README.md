# Supabase Development

This directory is the version-controlled source for HomeMatch database changes.

## Safety rules

- Link local CLI work to Staging before Production.
- Never commit database passwords, API keys or generated `.temp` files.
- Review every migration before `db push`.
- Do not use `db reset --linked`.
- Baseline migrations recreate the current room/media shape for an empty
  Staging project; they are not a destructive Production migration.
- Production changes must remain additive during the Admin Rooms CRUD rollout.

## Intended workflow

```text
supabase login
supabase link --project-ref <staging-project-ref>
supabase migration list
supabase db push --dry-run
supabase db push
```

Run seed data only in local or Staging environments.
