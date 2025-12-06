import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { logUserAction } from '../services/auditService';

export default function Auth() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    const { playClick, playError, playSuccess } = useSoundEffects();

    const handleLogin = async (e) => {
        e.preventDefault();
        playClick();
        setLoading(true);

        let result;
        if (isSignUp) {
            result = await supabase.auth.signUp({ email, password });
        } else {
            result = await supabase.auth.signInWithPassword({ email, password });
        }

        const { data, error } = result;

        if (error) {
            playError();
            alert(error.error_description || error.message);
        } else {
            if (isSignUp) {
                alert('Registro exitoso! Por favor verifica tu correo para iniciar sesión.');
            } else {
                playSuccess();
                // Log Login Action
                if (data?.user) {
                    logUserAction(data.user.id, 'LOGIN');
                }
            }
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cyber-black text-white p-4">
            <div className="w-full max-w-md bg-cyber-dark border border-neon-purple p-8 rounded-2xl shadow-[0_0_50px_rgba(189,0,255,0.2)] relative overflow-hidden animate-fade-in-up">

                {/* Decor */}
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-purple to-transparent"></div>

                <h1 className="text-3xl font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple animate-glitch title-glitch">
                    LinguaSec Access
                </h1>
                <p className="text-gray-400 text-center mb-8 font-mono text-xs uppercase tracking-widest">
                    Identificación de Agente Requerida
                </p>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <input
                            className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-neon-cyan focus:outline-none transition-colors font-mono"
                            type="email"
                            placeholder="Correo Electrónico"
                            value={email}
                            required={true}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-neon-cyan focus:outline-none transition-colors font-mono"
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            required={true}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className={`w-full p-3 rounded font-bold uppercase tracking-wider transition-all duration-300 ${loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-neon-purple text-white hover:bg-neon-purple/80 hover:shadow-[0_0_15px_rgba(189,0,255,0.5)]'}`}
                        disabled={loading}
                    >
                        {loading ? 'Procesando...' : (isSignUp ? 'Registrar Agente' : 'Iniciar Sesión')}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    import React, {useState} from 'react';
                    import {supabase} from '../supabaseClient';
                    import {useSoundEffects} from '../hooks/useSoundEffects';
                    import {logUserAction} from '../services/auditService';
                    import {useAuth} from '../context/AuthContext';

                    export default function Auth() {
    const [loading, setLoading] = useState(false);
                    const [email, setEmail] = useState('');
                    const [password, setPassword] = useState('');
                    const [isSignUp, setIsSignUp] = useState(false);

                    const {playClick, playError, playSuccess} = useSoundEffects();

    const handleLogin = async (e) => {
                        e.preventDefault();
                    playClick();
                    setLoading(true);

                    let result;
                    if (isSignUp) {
                        result = await supabase.auth.signUp({ email, password });
        } else {
                        result = await supabase.auth.signInWithPassword({ email, password });
        }

                    const {data, error} = result;

                    if (error) {
                        playError();
                    alert(error.error_description || error.message);
        } else {
            if (isSignUp) {
                        alert('Registro exitoso! Por favor verifica tu correo para iniciar sesión.');
            } else {
                        playSuccess();
                    // Log Login Action
                    if (data?.user) {
                        logUserAction(data.user.id, 'LOGIN');
                }
            }
        }
                    setLoading(false);
    };

                    return (
                    <div className="flex flex-col items-center justify-center min-h-screen bg-cyber-black text-white p-4">
                        <div className="w-full max-w-md bg-cyber-dark border border-neon-purple p-8 rounded-2xl shadow-[0_0_50px_rgba(189,0,255,0.2)] relative overflow-hidden animate-fade-in-up">

                            {/* Decor */}
                            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-purple to-transparent"></div>

                            <h1 className="text-3xl font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple animate-glitch title-glitch">
                                LinguaSec Access
                            </h1>
                            <p className="text-gray-400 text-center mb-8 font-mono text-xs uppercase tracking-widest">
                                Identificación de Agente Requerida
                            </p>

                            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                                <div>
                                    <input
                                        className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-neon-cyan focus:outline-none transition-colors font-mono"
                                        type="email"
                                        placeholder="Correo Electrónico"
                                        value={email}
                                        required={true}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <input
                                        className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-neon-cyan focus:outline-none transition-colors font-mono"
                                        type="password"
                                        placeholder="Contraseña"
                                        value={password}
                                        required={true}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button
                                    className={`w-full p-3 rounded font-bold uppercase tracking-wider transition-all duration-300 ${loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-neon-purple text-white hover:bg-neon-purple/80 hover:shadow-[0_0_15px_rgba(189,0,255,0.5)]'}`}
                                    disabled={loading}
                                >
                                    {loading ? 'Procesando...' : (isSignUp ? 'Registrar Agente' : 'Iniciar Sesión')}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <button
                                    onClick={() => { playClick(); setIsSignUp(!isSignUp); }}
                                    className="text-gray-400 hover:text-neon-cyan text-sm underline transition-colors"
                                >
                                    {isSignUp ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Solicita acceso'}
                                </button>
                            </div>
                        </div>
                    </div>
                    );
}
