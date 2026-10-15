# Slice 1 - Admin Room Schema and Safety Audit

## Status

Complete on `codex/urgent-admin-rooms-crud`.

This audit is read-only. No Production data or schema was changed.

## Evidence reviewed

- `src/services/room.service.ts`
- `src/types/room.ts`
- `src/app/api/images/download/route.ts`
- `scripts/build-image-cache.ts`
- `apps-script/rooms.js`
- `docs/03-data/database-structure.md`
- `docs/03-data/api-contracts.md`
- `docs/03-data/image-download-mechanism.md`
- read-only Supabase introspection using the existing anon configuration

The introspection returned column names only. It did not print row values,
tokens or credentials.

## Verified Production tables

### `phongtro`

Primary business identifier:

```text
idphong
```

Verified columns:

```text
idphong, maphong, hinhanhchinh, loaiphong,
sonha, duong, phuong, khuvuc,
hopdong, gia, dientich,
maylanh, kebep, gac, tulanh, nhavs, cuaso, bancong, dexe,
thucung, xedien, giogiac, maygiat, thangmay,
lau, dien, nuoc, phiquanly, phigiuxe,
tienich, trangthai, hoahong, ghichu, idchunha,
slug, ngaytao, ngaycapnhat
```

### `hinhanh`

Verified columns:

```text
idanh, idphong, hinhanh, sortorder, createdat
```

Expected relationship:

```text
hinhanh.idphong -> phongtro.idphong
```

The actual foreign-key constraint still needs verification from a privileged
schema export. An anon row query cannot prove constraint metadata.

### `imagecache`

Verified columns:

```text
path, drive_url, updated_at
```

Expected key:

```text
path
```

The existing builder already relies on `path` as the upsert conflict target.

## Current public behavior

Room listing:

- reads `phongtro`;
- includes only `trangthai = "Trong"` (`Trống` in UTF-8 data);
- sorts by `idphong` descending;
- supports area and price filters in Supabase;
- applies amenity filters in the browser;
- resolves `hinhanhchinh` through `imagecache`.

Room detail:

- reads one `phongtro` row by `idphong`;
- reads `hinhanh` by `idphong`;
- sorts gallery by `sortorder`;
- resolves main and gallery paths through `imagecache`.

Public status mapping:

| Database value | Public API value |
|---|---|
| `Trong` (`Trống`) | `ACTIVE` |
| `Da thue` (`Đã thuê`) | `RENTED` |
| `An` (`Ẩn`) | `HIDDEN` |
| unknown/empty | `HIDDEN` |

The Public Web currently has no distinct `DRAFT` or `ARCHIVED` state.

## Database-to-domain mapping

| Database column | Admin/API field | Read conversion | Write conversion |
|---|---|---|---|
| `idphong` | `id` | string | server generated, immutable |
| `maphong` | `code` | string | trimmed string |
| `loaiphong` | `roomType` | string | allowlisted/trimmed string |
| `hinhanhchinh` | `mainImagePath` | resolve via cache | server-owned image path |
| `sonha` | `address.houseNumber` | string | trimmed string |
| `duong` | `address.street` | string | trimmed string |
| `phuong` | `address.ward` | string | trimmed string |
| `khuvuc` | `address.area` | string | trimmed string |
| `gia` | `price` | number | non-negative number |
| `dientich` | `area` | numeric prefix | non-negative numeric value |
| `hopdong` | `contractType` | string | trimmed string |
| `lau` | `floor` | string | trimmed string |
| `dien` | `costs.electricity` | parse formatted cost | formatted legacy string |
| `nuoc` | `costs.water` | parse formatted cost | formatted legacy string |
| `phiquanly` | `costs.management` | parse formatted cost | formatted legacy string |
| `phigiuxe` | `costs.parking` | parse formatted cost | formatted legacy string |
| `tienich` | `description` | string | text |
| `giogiac` | `rules.hours` | string | trimmed string |
| `trangthai` | `status` | legacy map | controlled state transition |
| `slug` | `slug` | string | generated/validated string |
| `ngaytao` | `createdAt` | date/time | server generated |
| `ngaycapnhat` | `updatedAt` | date/time | server generated |
| `hoahong` | `commission` | private string | Admin/Sale only |
| `ghichu` | `internalNotes` | private text | Admin/Sale only |
| `idchunha` | `ownerReference` | private string | Admin/Sale only |

### Amenities

Legacy values are strings, not booleans.

| Database column | API field |
|---|---|
| `maylanh` | `amenities.airConditioner` |
| `kebep` | `amenities.kitchenShelf` |
| `gac` | `amenities.loft` |
| `tulanh` | `amenities.refrigerator` |
| `nhavs` | `amenities.privateBathroom` |
| `cuaso` | `amenities.window` |
| `bancong` | `amenities.balcony` |
| `dexe` | `amenities.parking` |
| `thucung` | `amenities.petsAllowed` |
| `xedien` | `amenities.evSupport` |
| `maygiat` | `amenities.washingMachine` |
| `thangmay` | `amenities.elevator` |

Read behavior treats `Co`, `Rieng` and `Bai de xe` (their Vietnamese forms in
Production) as true. The write API must use per-field legacy values instead of
blindly writing the same string for every boolean:

- generic yes/no: `Co` / `Khong`;
- bathroom: `Rieng` / `Chung` / `Khong`;
- parking: `Bai de xe` / `Co` / `Khong`;
- washing machine may preserve `Rieng`.

The Admin form must therefore model bathroom, parking and washing-machine
fields as enums where required, not only booleans.

## Image mapping

### `hinhanh`

| Database column | API field | Ownership |
|---|---|---|
| `idanh` | `id` | Backend |
| `idphong` | `roomId` | Backend relationship |
| `hinhanh` | `path` | Backend media workflow |
| `sortorder` | `sortOrder` | Admin/Sale |
| `createdat` | `createdAt` | Backend |

### `imagecache`

| Database column | API field | Ownership |
|---|---|---|
| `path` | `path` | Backend media workflow |
| `drive_url` | `resolvedUrl` | Backend media workflow |
| `updated_at` | `updatedAt` | Database/backend |

## ImageCache automation decision

### Current limitation

`scripts/build-image-cache.ts` is a manual full reconciliation job:

1. list every file in two Google Drive folders;
2. read every image path from Supabase;
3. match by filename;
4. batch upsert all matched entries.

New CRUD uploads would not appear until this script runs again.

### Target write-through flow

```text
POST room image
    -> validate file
    -> generate unique server filename/path
    -> upload to the configured Drive folder
    -> receive Drive file ID
    -> build thumbnail URL from that exact ID
    -> database RPC:
         insert hinhanh
         upsert imagecache(path, drive_url)
         optionally update phongtro.hinhanhchinh
    -> return image record
```

This makes `ImageCache` available immediately after CRUD. It also removes the
ambiguous filename scan for newly uploaded files because the Drive API returns
the exact file ID.

### Consistency model

Google Drive and PostgreSQL cannot share one distributed transaction. Use a
small saga:

1. Upload Drive file.
2. Execute one PostgreSQL RPC transaction for `hinhanh`, `imagecache` and
   optional main-image update.
3. If the database transaction fails, attempt to delete the just-uploaded Drive
   file.
4. If cleanup fails, emit a structured reconciliation record/log containing
   the Drive file ID and request ID.

The API must be idempotent:

- server-generated unique path;
- `imagecache` upsert on `path`;
- optional idempotency key for retrying multipart requests.

### Role of the existing builder

Keep `scripts/build-image-cache.ts`, but redefine it as:

- legacy backfill;
- scheduled reconciliation;
- repair tool for AppSheet/manual Drive changes;
- drift report for missing/orphan mappings.

It is no longer the normal path for Admin CRUD uploads.

## ID strategy

Current `idphong` values are string identifiers generated by AppSheet, and the
Public Web relies on descending lexical sort matching creation order.

MVP compatibility decision:

- Backend generates a server-side string ID.
- Do not let Admin Portal submit `idphong`.
- Preserve the existing sortable string format until AppSheet compatibility is
  tested.
- Add collision handling at the database boundary.
- Do not change existing IDs or foreign keys.

Before implementation, inspect a privileged schema export to confirm field
length/default constraints. A future UUID/ULID migration is out of urgent scope.

## Additive migration proposal

No migration was executed in Slice 1.

### `phongtro`

Add nullable/defaulted fields only:

```text
archived_at timestamptz null
archived_by uuid null
row_version bigint not null default 1
```

State interpretation:

| Admin state | `trangthai` | `archived_at` |
|---|---|---|
| `DRAFT` | `An` (`Ẩn`) | null |
| `ACTIVE` | `Trong` (`Trống`) | null |
| `RENTED` | `Da thue` (`Đã thuê`) | null |
| `ARCHIVED` | `An` (`Ẩn`) | not null |

This preserves the Public Web filter and existing AppSheet status values.

### Auth profile

Create a protected profile/role table:

```text
admin_profile
  user_id uuid primary key references auth.users(id)
  role text check role in ('ADMIN', 'SALE')
  display_name text
  active boolean default true
  created_at timestamptz
  updated_at timestamptz
```

Only trusted backend/admin operations may change role.

### Audit

Create:

```text
admin_audit_log
  id uuid primary key
  actor_id uuid
  actor_role text
  request_id text
  action text
  entity_type text
  entity_id text
  before_data jsonb
  after_data jsonb
  created_at timestamptz
```

Application users do not update or delete audit rows.

### Database RPCs

Proposed transaction boundaries:

```text
admin_create_room
admin_update_room
admin_transition_room
admin_attach_room_image
admin_reorder_room_images
admin_remove_room_image_mapping
```

Exact SQL is deferred to the migration slice after a privileged schema/constraint
export is reviewed.

## Security and RLS requirements

- Public anon keeps only the current required room/image read access.
- Admin writes do not use the browser Supabase client.
- FastAPI service credentials are server-only.
- Preview must not receive the Production service-role key.
- Auth token role is looked up from the protected profile source.
- `hoahong`, `ghichu` and `idchunha` never enter public room responses.
- Drive service-account credentials stay only in the API project.
- Download-by-URL must be allowlisted or replaced by image ID/path to avoid SSRF.

## Backup and rollback

Before the first Production mutation:

1. Export `phongtro`, `hinhanh` and `imagecache`.
2. Record row counts and export timestamp.
3. Verify the export can be read.
4. Apply additive migrations only.
5. Test one owner-created `DRAFT`.
6. Verify Public Web behavior.
7. Archive the draft and verify audit records.

Rollback:

- disable Admin mutation routes with an API environment flag;
- keep Public Web on its existing direct read path;
- restore affected rows from the pre-test export if needed;
- do not delete added nullable columns during the incident window.

## Open items before Slice 2

Required:

- privileged schema export confirming PK, FK, defaults, data types and RLS;
- Supabase Preview/staging project or isolated write sandbox;
- Google Drive test folder;
- decision on maximum file size and images per room;
- database migration review.

No secret should be sent through chat or committed to Git.

## Slice 1 exit criteria

- [x] Current code and legacy adapter reviewed.
- [x] Production column names verified read-only.
- [x] `phongtro`, `hinhanh` and `imagecache` mapped.
- [x] Public behavior and private fields identified.
- [x] Additive migration proposal documented.
- [x] ImageCache write-through and reconciliation flow documented.
- [x] Backup and rollback procedure documented.
- [x] No Production write or schema change performed.
