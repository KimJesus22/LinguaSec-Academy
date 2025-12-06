-- Migración para añadir soporte de Repetición Espaciada (SM-2)
-- Ejecuta esto en el Editor SQL de Supabase

ALTER TABLE user_progress 
ADD COLUMN IF NOT EXISTS repetition_number INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS easiness_factor FLOAT DEFAULT 2.5,
ADD COLUMN IF NOT EXISTS interval_days INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS next_review_date TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Índice para consultas rápidas de "Lecciones pendiente para hoy"
CREATE INDEX IF NOT EXISTS idx_user_progress_next_review ON user_progress(user_id, next_review_date);
