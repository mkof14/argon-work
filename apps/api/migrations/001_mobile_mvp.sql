-- AGRON Mobile MVP schema

create extension if not exists "pgcrypto";

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  locale text not null default 'en',
  created_at timestamptz not null default now()
);

create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  token text not null unique,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists simulator_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  scenario_id text not null,
  stability_score integer not null,
  precision_score integer,
  safety_score integer not null,
  completion_time_ms integer not null,
  wind_level integer not null,
  mode_used text not null,
  app_version text,
  device_os text,
  created_at timestamptz not null default now()
);

create table if not exists entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  plan text not null check (plan in ('free', 'pro', 'enterprise')),
  status text not null check (status in ('active', 'grace', 'canceled', 'expired')),
  platform text not null check (platform in ('ios', 'android', 'web')),
  product_id text not null,
  renew_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_sessions_user_id on sessions(user_id);
create index if not exists idx_runs_user_created on simulator_runs(user_id, created_at desc);
create index if not exists idx_entitlements_user on entitlements(user_id);
