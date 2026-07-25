alter table public.phongtro
  add column if not exists archived_at timestamptz,
  add column if not exists archived_by uuid references auth.users(id)
    on delete set null,
  add column if not exists row_version bigint not null default 1;

create table if not exists public.admin_profile (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null,
  display_name text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint admin_profile_role_check check (role in ('ADMIN', 'SALE'))
);

create table if not exists public.admin_audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  actor_role text not null,
  request_id text not null,
  action text not null,
  entity_type text not null,
  entity_id text not null,
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz not null default now(),
  constraint admin_audit_log_role_check
    check (actor_role in ('ADMIN', 'SALE', 'SYSTEM'))
);

create index if not exists phongtro_archived_status_idx
  on public.phongtro (archived_at, trangthai, idphong desc);

create index if not exists admin_profile_role_active_idx
  on public.admin_profile (role, active);

create index if not exists admin_audit_entity_idx
  on public.admin_audit_log (entity_type, entity_id, created_at desc);

create index if not exists admin_audit_actor_idx
  on public.admin_audit_log (actor_id, created_at desc);

create or replace function public.bump_room_row_version()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.row_version := old.row_version + 1;
  new.ngaycapnhat := now();
  return new;
end;
$$;

drop trigger if exists phongtro_bump_row_version on public.phongtro;
create trigger phongtro_bump_row_version
before update on public.phongtro
for each row execute function public.bump_room_row_version();

create or replace function public.touch_admin_profile_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists admin_profile_touch_updated_at
  on public.admin_profile;
create trigger admin_profile_touch_updated_at
before update on public.admin_profile
for each row execute function public.touch_admin_profile_updated_at();

alter table public.admin_profile enable row level security;
alter table public.admin_audit_log enable row level security;
