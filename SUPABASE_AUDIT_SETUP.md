# 🕵️‍♂️ Supabase Audit Setup (Parte 2: Trazabilidad)

**EJECUTA ESTOS COMANDOS NUEVOS** para habilitar el sistema de auditoría forense.

## 1. Crear Tabla de Auditoría (`audit_logs`)

```sql
create table audit_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  action_type text not null,
  ip_address text,
  user_agent text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

## 2. Habilitar Seguridad RLS

```sql
alter table audit_logs enable row level security;
```

## 3. Políticas de Auditoría (Policies)

```sql
-- Permitir a usuarios ver solo sus propios logs
create policy "Users can view their own audit logs"
on audit_logs for select
using ( auth.uid() = user_id );

-- Permitir a usuarios insertar sus propias acciones (logging desde frontend)
create policy "Users can insert their own audit logs"
on audit_logs for insert
with check ( auth.uid() = user_id );
```
