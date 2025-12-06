# 🗄️ Supabase Database Setup (Parte 1: Inicial)

Estos comandos ya deberían haberse ejecutado. Solo ejecútalos si estás configurando el proyecto desde cero.

## 1. Crear Tabla para Resultados (`exam_results`)

```sql
create table exam_results (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  language text not null,
  score int not null,
  level text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

## 2. Habilitar Row Level Security (RLS)

```sql
alter table exam_results enable row level security;
```

## 3. Políticas de Seguridad (Policies)

```sql
create policy "Users can view their own results"
on exam_results for select
using ( auth.uid() = user_id );

create policy "Users can insert their own results"
on exam_results for insert
with check ( auth.uid() = user_id );
```

---

## ⚙️ Variables de Entorno

Asegúrate de tener un archivo `.env` en la raíz de tu proyecto:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key
```
