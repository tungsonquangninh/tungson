-- Chạy file này trong Supabase: SQL Editor → New query → dán vào → Run

-- 1) Bảng tin tức (Điểm tin hằng ngày)
create table if not exists public.tin_tuc (
  id bigint generated always as identity primary key,
  ngay date not null default current_date,
  chuyen_muc text not null default 'thi-truong-son', -- gia-vlxd | thi-truong-son | phap-ly | xu-huong | quang-ninh
  tieu_de text not null,
  tom_tat text not null,
  goc_nhin text,
  nguon text,
  link text,
  created_at timestamptz not null default now()
);
alter table public.tin_tuc enable row level security;
drop policy if exists "Ai cũng xem được tin" on public.tin_tuc;
create policy "Ai cũng xem được tin" on public.tin_tuc for select to anon, authenticated using (true);
-- Không có policy insert/update cho anon: chỉ thêm tin qua Dashboard hoặc khóa bí mật phía máy chủ.

-- 2) Bảng khách để lại liên hệ
create table if not exists public.lien_he (
  id bigint generated always as identity primary key,
  ho_ten text not null check (char_length(ho_ten) between 1 and 120),
  so_dien_thoai text not null check (char_length(so_dien_thoai) between 9 and 15),
  khu_vuc text check (char_length(khu_vuc) <= 120),
  nhu_cau text check (char_length(nhu_cau) <= 60),
  noi_dung text check (char_length(noi_dung) <= 2000),
  da_xu_ly boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.lien_he enable row level security;
drop policy if exists "Khách gửi được liên hệ" on public.lien_he;
create policy "Khách gửi được liên hệ" on public.lien_he for insert to anon with check (da_xu_ly = false);
-- Không có policy select cho anon: người ngoài KHÔNG xem được danh sách khách.
-- Bạn xem khách trong Dashboard → Table Editor → lien_he.
