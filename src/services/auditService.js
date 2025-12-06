
import { supabase } from '../supabaseClient';

/**
 * Registra una acción del usuario en el log de auditoría.
 * Captura automáticamente la IP pública y el User Agent.
 * @param {string} userId - ID del usuario autenticado (UUID).
 * @param {string} actionType - Tipo de acción (e.g., 'LOGIN', 'TERMS_ACCEPTED', 'CERTIFICATE_DOWNLOADED').
 */
export const logUserAction = async (userId, actionType) => {
    if (!userId) {
        console.warn("Audit Log: No userId provided.");
        return;
    }

    try {
        // 1. Obtener IP del usuario
        let ipAddress = 'UNKNOWN';
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            if (response.ok) {
                const data = await response.json();
                ipAddress = data.ip;
            }
        } catch (ipError) {
            console.error("Audit Log: Failed to fetch IP", ipError);
        }

        // 2. Obtener User Agent
        const userAgent = navigator.userAgent;

        // 3. Insertar en Supabase
        const { error } = await supabase
            .from('audit_logs')
            .insert([
                {
                    user_id: userId,
                    action_type: actionType,
                    ip_address: ipAddress,
                    user_agent: userAgent
                }
            ]);

        if (error) {
            console.error("Audit Log: DB Insert Failed", error);
        } else {
            console.log(`Audit Log: [${actionType}] recorded for ${ipAddress}`);
        }

    } catch (err) {
        console.error("Audit Log: Critical Failure", err);
    }
};

/**
 * Recupera el historial de logs del usuario actual.
 * @returns {Promise<Array>} Lista de logs.
 */
export const getUserLogs = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Audit Log: Fetch Failed", error);
        return [];
    }
    return data;
};
