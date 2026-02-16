-- AGRON lead capture schema

create extension if not exists "pgcrypto";

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  locale text,
  name text,
  email text not null,
  interest text,
  message text,
  source_page text,
  utm_source text,
  utm_medium text,
  utm_campaign text
);
create index if not exists idx_leads_email on leads(email);

create table if not exists corporate_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  locale text,
  company text not null,
  name text not null,
  email text not null,
  phone text,
  team_size text,
  use_case text,
  timeline text,
  message text,
  source_page text,
  utm_source text,
  utm_medium text,
  utm_campaign text
);
create index if not exists idx_corporate_email on corporate_inquiries(email);

create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  locale text,
  email text not null,
  platform text,
  source_page text,
  utm_source text,
  utm_medium text,
  utm_campaign text
);
create index if not exists idx_waitlist_email on waitlist(email);
