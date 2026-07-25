insert into public.phongtro (
  idphong,
  maphong,
  loaiphong,
  sonha,
  duong,
  phuong,
  khuvuc,
  hopdong,
  gia,
  dientich,
  maylanh,
  kebep,
  gac,
  tulanh,
  nhavs,
  cuaso,
  bancong,
  dexe,
  thucung,
  xedien,
  giogiac,
  maygiat,
  thangmay,
  lau,
  dien,
  nuoc,
  phiquanly,
  phigiuxe,
  tienich,
  trangthai,
  slug,
  ngaytao,
  ngaycapnhat,
  hinhanhchinh
)
values
  (
    '2999000000001',
    'STG-001',
    'Studio',
    '12',
    'Duong Staging',
    'Phuong Test',
    'Quan Test',
    '6-12 thang',
    '4500000',
    '25',
    'Co',
    'Co',
    'Khong',
    'Khong',
    'Rieng',
    'Co',
    'Khong',
    'Bai de xe',
    'Khong',
    'Co',
    'Tu do',
    'Co',
    'Co',
    'Lau 2',
    '3800d/kWh',
    '25000d/m3',
    '150000d/phong',
    '100000d/xe',
    'Du lieu gia phuc vu staging.',
    'Trống',
    'staging-active-room',
    now(),
    now(),
    'HINHANH_Images/staging-active-main.webp'
  ),
  (
    '2999000000002',
    'STG-002',
    'Phong tro',
    '34',
    'Duong Preview',
    'Phuong Test',
    'Quan Test',
    '6 thang',
    '3200000',
    '18',
    'Khong',
    'Co',
    'Co',
    'Khong',
    'Rieng',
    'Co',
    'Khong',
    'Co',
    'Khong',
    'Khong',
    '23h',
    'Khong',
    'Khong',
    'Tang tret',
    '4000d/kWh',
    '100000d/nguoi',
    '0',
    '0',
    'Draft gia cho Admin CRUD.',
    'Ẩn',
    'staging-draft-room',
    now(),
    now(),
    'HINHANH_Images/staging-draft-main.webp'
  )
on conflict (idphong) do update
set
  maphong = excluded.maphong,
  loaiphong = excluded.loaiphong,
  ngaycapnhat = now();

insert into public.hinhanh (
  idanh,
  idphong,
  hinhanh,
  sortorder,
  createdat
)
values
  (
    'STG-IMG-001',
    '2999000000001',
    'HINHANH_Images/staging-active-main.webp',
    0,
    now()
  ),
  (
    'STG-IMG-002',
    '2999000000002',
    'HINHANH_Images/staging-draft-main.webp',
    0,
    now()
  )
on conflict (idanh) do update
set
  sortorder = excluded.sortorder;

insert into public.imagecache (
  path,
  drive_url,
  updated_at
)
values
  (
    'HINHANH_Images/staging-active-main.webp',
    'https://example.com/homematch/staging-active-main.webp',
    now()
  ),
  (
    'HINHANH_Images/staging-draft-main.webp',
    'https://example.com/homematch/staging-draft-main.webp',
    now()
  )
on conflict (path) do update
set
  drive_url = excluded.drive_url,
  updated_at = now();
