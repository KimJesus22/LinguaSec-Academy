import React, { useEffect, useState } from 'react';
import { getUserLogs } from '../services/auditService';

const ActivityLogModal = ({ onClose }) => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            const data = await getUserLogs();
            setLogs(data);
            setLoading(false);
        };
        fetchLogs();
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in-up p-4">
            <div className="bg-cyber-dark border border-gray-600 w-full max-w-4xl h-[80vh] flex flex-col rounded-xl shadow-[0_0_50px_rgba(255,255,255,0.1)] relative overflow-hidden font-mono">

                {/* Header */}
                <div className="bg-gray-900 p-4 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white uppercase tracking-widest flex items-center gap-2">
                        <span>📠</span> System Activity Logs
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        [X]
                    </button>
                </div>

                {/* Content - Table */}
                <div className="flex-1 overflow-auto bg-black p-4 custom-scrollbar">
                    {loading ? (
                        <div className="text-neon-cyan animate-pulse">Scanning system records...</div>
                    ) : logs.length === 0 ? (
                        <div className="text-gray-500">No activity records found.</div>
                    ) : (
                        <table className="w-full text-left text-xs md:text-sm text-gray-300 border-collapse">
                            <thead className="text-neon-cyan sticky top-0 bg-black z-10">
                                <tr>
                                    <th className="p-2 border-b border-gray-800">TIME (UTC)</th>
                                    <th className="p-2 border-b border-gray-800">ACTION</th>
                                    <th className="p-2 border-b border-gray-800">IP ADDRESS</th>
                                    <th className="p-2 border-b border-gray-800 hidden md:table-cell">USER AGENT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map((log) => (
                                    <tr key={log.id} className="hover:bg-gray-900/50 transition-colors border-b border-gray-800/50">
                                        <td className="p-2 whitespace-nowrap text-gray-400">
                                            {new Date(log.created_at).toLocaleString()}
                                        </td>
                                        <td className="p-2 font-bold select-all">
                                            <span className={`
                                        ${log.action_type === 'LOGIN' ? 'text-neon-green' : ''}
                                        ${log.action_type === 'TERMS_ACCEPTED' ? 'text-neon-purple' : ''}
                                        ${log.action_type === 'CERTIFICATE_DOWNLOADED' ? 'text-neon-cyan' : ''}
                                    `}>
                                                {log.action_type}
                                            </span>
                                        </td>
                                        <td className="p-2 font-mono text-xs select-all">{log.ip_address}</td>
                                        <td className="p-2 font-mono text-xs text-gray-600 truncate max-w-[200px] hidden md:table-cell" title={log.user_agent}>
                                            {log.user_agent}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Footer */}
                <div className="p-2 border-t border-gray-700 bg-gray-900 text-right text-[10px] text-gray-500">
                    SECURE AUDIT TRAIL // RIGHTS RESERVED (ARCO)
                </div>
            </div>
        </div>
    );
};

export default ActivityLogModal;
