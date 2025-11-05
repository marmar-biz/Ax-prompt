create extension if not exists pgcrypto;
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique, title text not null, emoji text, order_index int default 0,
  created_at timestamptz default now()
);
create table if not exists public.prompts (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories on delete set null,
  title text not null, cover_url text, prompt_md text not null, preview text,
  is_premium boolean default true, created_at timestamptz default now()
);
create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  slug text unique, title text not null, description text, cover_url text,
  price_rial bigint not null, includes jsonb, created_at timestamptz default now()
);
create table if not exists public.package_items (
  package_id uuid references public.packages on delete cascade,
  prompt_id uuid references public.prompts on delete cascade,
  primary key (package_id, prompt_id)
);
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid, package_id uuid references public.packages on delete set null,
  amount_rial bigint not null, gateway text, status text default 'pending',
  ref_id text, created_at timestamptz default now()
);
create table if not exists public.user_packages (
  user_id uuid, package_id uuid references public.packages on delete cascade,
  purchased_at timestamptz default now(), primary key (user_id, package_id)
);
alter table public.categories enable row level security;
alter table public.prompts enable row level security;
alter table public.packages enable row level security;
create policy "Public read categories" on public.categories for select using (true);
create policy "Public read prompts" on public.prompts for select using (true);
create policy "Public read packages" on public.packages for select using (true);
insert into public.categories (slug,title,emoji,order_index) values
('gold','طلا و جواهر','💍',1),('perfume','عطر و ادکلن','🧴',2),('fashion','لباس و اکسسوری','👗',3)
on conflict do nothing;
insert into public.packages (slug,title,description,cover_url,price_rial,includes) values
('gold-prompts','بانک پرامپت طلا و جواهر','۵۰ پرامپت آماده کپشن و پست.',null,9900000,'["کپشن","استوری","هاشور"]'::jsonb)
on conflict do nothing;
