revoke insert, update, delete on public.phongtro
  from anon, authenticated;
revoke insert, update, delete on public.hinhanh
  from anon, authenticated;
revoke insert, update, delete on public.imagecache
  from anon, authenticated;
revoke insert, update, delete on public.admin_profile
  from anon, authenticated;
revoke all on public.admin_audit_log
  from anon, authenticated;

grant select on public.phongtro to anon, authenticated;
grant select on public.hinhanh to anon, authenticated;
grant select on public.imagecache to anon, authenticated;
grant select on public.admin_profile to authenticated;

drop policy if exists public_read_active_rooms on public.phongtro;
create policy public_read_active_rooms
on public.phongtro
for select
to anon, authenticated
using (
  trangthai = 'Trống'
  and archived_at is null
);

drop policy if exists public_read_active_room_images on public.hinhanh;
create policy public_read_active_room_images
on public.hinhanh
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.phongtro
    where phongtro.idphong = hinhanh.idphong
      and phongtro.trangthai = 'Trống'
      and phongtro.archived_at is null
  )
);

drop policy if exists public_read_image_cache on public.imagecache;
create policy public_read_image_cache
on public.imagecache
for select
to anon, authenticated
using (true);

drop policy if exists users_read_own_admin_profile on public.admin_profile;
create policy users_read_own_admin_profile
on public.admin_profile
for select
to authenticated
using (
  auth.uid() = user_id
  and active = true
);
