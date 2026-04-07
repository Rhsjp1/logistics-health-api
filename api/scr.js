create table api_keys (
  id uuid default gen_random_uuid() primary key,
  key text unique not null,
  client_name text,
  active boolean default true,
  created_at timestamp default now()
);

insert into api_keys (key, client_name)
values ('rhs_demo_key_001', 'Demo Client');
