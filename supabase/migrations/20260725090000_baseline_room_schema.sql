create table if not exists public.phongtro (
  idphong text primary key,
  maphong text,
  hinhanhchinh text,
  loaiphong text,
  sonha text,
  duong text,
  phuong text,
  khuvuc text,
  hopdong text,
  gia text,
  dientich text,
  maylanh text,
  kebep text,
  gac text,
  tulanh text,
  nhavs text,
  cuaso text,
  bancong text,
  dexe text,
  thucung text,
  xedien text,
  giogiac text,
  maygiat text,
  thangmay text,
  lau text,
  dien text,
  nuoc text,
  phiquanly text,
  phigiuxe text,
  tienich text,
  trangthai text,
  hoahong text,
  ghichu text,
  idchunha text,
  slug text,
  ngaytao timestamptz,
  ngaycapnhat timestamptz
);

create table if not exists public.hinhanh (
  idanh text primary key,
  idphong text not null references public.phongtro(idphong) on delete restrict,
  hinhanh text not null,
  sortorder integer,
  createdat timestamptz
);

create table if not exists public.imagecache (
  path text primary key,
  drive_url text not null,
  updated_at timestamptz not null default now()
);

create index if not exists phongtro_status_id_idx
  on public.phongtro (trangthai, idphong desc);

create index if not exists phongtro_area_idx
  on public.phongtro (khuvuc);

create index if not exists hinhanh_room_sort_idx
  on public.hinhanh (idphong, sortorder);

alter table public.phongtro enable row level security;
alter table public.hinhanh enable row level security;
alter table public.imagecache enable row level security;
