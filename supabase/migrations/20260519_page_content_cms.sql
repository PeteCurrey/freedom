-- ============================================================
-- Amplios CMS: page_content table
-- Migration: 20260519_page_content_cms.sql
-- ============================================================

create table if not exists public.page_content (
  id uuid default gen_random_uuid() primary key,
  page_key text not null,
  section_key text not null,
  field_key text not null,
  field_type text not null
    check (field_type in ('text','textarea','richtext','image','url','boolean')),
  value text,
  updated_at timestamptz default now(),
  updated_by text,
  constraint page_content_unique unique (page_key, section_key, field_key)
);

-- Fast lookup by page
create index if not exists idx_page_content_page_key
  on public.page_content(page_key);

-- Row Level Security
alter table public.page_content enable row level security;

-- Public can read all content
create policy "Public read"
  on public.page_content for select
  using (true);

-- Only authenticated users (admins) can write
create policy "Admin write"
  on public.page_content for all
  using (auth.role() = 'authenticated');
