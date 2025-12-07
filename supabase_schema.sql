-- Création de la table "chats"
create table public.chats (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  title text not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  primary key (id)
);

-- Création de la table "messages"
create table public.messages (
  id uuid not null default gen_random_uuid(),
  chat_id uuid not null references public.chats(id) on delete cascade,
  sender text not null, -- 'USER' or 'AI'
  content text not null,
  token_count int,
  created_at timestamp with time zone not null default now(),
  primary key (id)
);

-- Activer la sécurité par niveau de ligne (RLS)
alter table public.chats enable row level security;
alter table public.messages enable row level security;

-- Politiques pour les chats
create policy "Users can view their own chats" on public.chats
  for select using (auth.uid() = user_id);

create policy "Users can insert their own chats" on public.chats
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own chats" on public.chats
  for update using (auth.uid() = user_id);

create policy "Users can delete their own chats" on public.chats
  for delete using (auth.uid() = user_id);

-- Politiques pour les messages
create policy "Users can view messages of their chats" on public.messages
  for select using (
    exists ( select 1 from public.chats where id = chat_id and user_id = auth.uid() )
  );

create policy "Users can insert messages into their chats" on public.messages
  for insert with check (
    exists ( select 1 from public.chats where id = chat_id and user_id = auth.uid() )
  );
