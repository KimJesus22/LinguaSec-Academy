# 🗄️ Supabase Database Setup

Para habilitar la persistencia de datos y la seguridad, corre los siguientes comandos en el **SQL Editor** de tu proyecto en Supabase.

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

Esto activa el sistema de seguridad para que nadie pueda leer/escribir datos sin permiso explícito.

```sql
alter table exam_results enable row level security;
```

## 3. Crear Políticas de Seguridad (Policies)

### Política de Lectura (Select)
*Permite a los usuarios leer SOLO sus propios exámenes.*

```sql
create policy "Users can view their own results"
on exam_results for select
using ( auth.uid() = user_id );
```

### Política de Escritura (Insert)
*Permite a los usuarios insertar resultados SOLO si el `user_id` coincide con su propio ID autenticado.*

```sql
create policy "Users can insert their own results"
on exam_results for insert
with check ( auth.uid() = user_id );
```

---

## ⚙️ Variables de Entorno

Asegúrate de tener un archivo `.env` en la raíz de tu proyecto con las siguientes claves (Obtenlas en *Project Settings > API*):

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key
```
