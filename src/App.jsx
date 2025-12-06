import { useState } from 'react'
import LanguageCard from './components/LanguageCard'
import QuizComponent from './components/QuizComponent'
import { quizData } from './data/quizData'
import { tacticalData } from './data/tacticalData'
import { useSoundContext } from './context/SoundContext'
import { useSoundEffects } from './hooks/useSoundEffects'
import TermsModal from './components/TermsModal'
import { useAuth } from './context/AuthContext'
import Auth from './components/Auth'

function App() {
  const { user, signOut } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const [quizStarted, setQuizStarted] = useState(false)
  const [isTacticalMode, setIsTacticalMode] = useState(false);

  // Legal State
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const { isMuted, toggleMute } = useSoundContext();
  const { playClick, playHover, playError } = useSoundEffects();

  // Protect Route
  if (!user) {
    return <Auth />
  }

  const handleLanguageSelect = (lang) => {
    playClick();
    setSelectedLanguage(lang)
    setIsTacticalMode(false);
    setQuizStarted(false)
    setTermsAccepted(false); // Reset terms on language change
  }

  const handleTacticalSelect = () => {
    playClick();
    setSelectedLanguage({
      id: 'tactical',
      name: 'Operación: Firewall',
      flag: '🛡️',
      native: 'Tactical Training'
    });
    setIsTacticalMode(true);
    setQuizStarted(false);
    setTermsAccepted(false);
  }

  const handleStartQuiz = () => {
    if (!termsAccepted) {
      playError();
      alert("DEBE ACEPTAR LOS TÉRMINOS LEGALES PARA CONTINUAR.");
      return;
    }
    playClick();
    setQuizStarted(true);
  }

  const handleRetry = () => {
    setQuizStarted(false)
    setTimeout(() => setQuizStarted(true), 0);
  }

  const handleLogout = () => {
    playClick();
    signOut();
  }

  const languages = [
    {
      id: 'en',
      name: 'Inglés',
      flag: '🇬🇧',
      native: 'English',
    },
    {
      id: 'jp',
      name: 'Japonés',
      flag: '🇯🇵',
      native: '日本語',
    },
    {
      id: 'kr',
      name: 'Coreano',
      flag: '🇰🇷',
      native: '한국어',
    }
  ]

  return (
    <div className="min-h-screen w-full bg-cyber-black flex flex-col items-center p-8 relative overflow-hidden text-white font-sans">
      {/* Top Right Controls */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => { toggleMute(); playClick(); }}
          className="p-2 rounded-full border border-gray-700 bg-gray-900/50 hover:border-neon-cyan hover:text-neon-cyan transition-colors"
          onMouseEnter={playHover}
          title="Silenciar Audio"
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-full border border-gray-700 bg-gray-900/50 hover:border-red-500 hover:text-red-500 transition-colors text-xs uppercase tracking-widest font-bold"
          onMouseEnter={playHover}
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Terms Modal */}
      {showTermsModal && <TermsModal onClose={() => setShowTermsModal(false)} />}

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-neon-purple rounded-full blur-[100px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-neon-cyan rounded-full blur-[120px] opacity-10"></div>

      {/* Header */}
      <header className="mb-8 z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-neon-purple drop-shadow-[0_0_10px_rgba(0,243,255,0.3)] mb-2 animate-glitch hover:animate-glitch-slow cursor-default title-glitch" style={{ textShadow: '2px 2px 0px #bd00ff, -2px -2px 0px #00f3ff' }}>
          LinguaSec Academy
        </h1>
        <p className="text-gray-400 text-sm md:text-lg tracking-widest font-mono uppercase">
          Dominio del Idioma. Seguridad Total.
        </p>
        <p className="text-gray-500 text-xs mt-2">Agente ID: {user.email}</p>
      </header>

      {/* Main Content */}
      <main className="z-10 w-full max-w-7xl flex-1 flex flex-col items-center justify-center min-h-[600px]">
        {!selectedLanguage ? (
          <div className="flex flex-col items-center gap-8 w-full animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full place-items-center">
              {languages.map((lang) => (
                <LanguageCard
                  key={lang.id}
                  language={lang.name}
                  flag={lang.flag}
                  nativeText={lang.native}
                  onClick={() => handleLanguageSelect(lang)}
                />
              ))}
            </div>

            {/* Tactical Training Button */}
            <button
              onClick={handleTacticalSelect}
              onMouseEnter={playHover}
              className="group relative px-8 py-4 bg-gray-900 border-2 border-red-900/50 hover:border-red-500 rounded-xl overflow-hidden transition-all duration-300 w-full max-w-md shadow-[0_0_20px_rgba(255,0,0,0.1)] hover:shadow-[0_0_30px_rgba(255,0,0,0.4)]"
            >
              <div className="absolute inset-0 bg-red-900/10 group-hover:bg-red-900/20 transition-colors"></div>
              <div className="relative z-10 flex items-center justify-center gap-4">
                <span className="text-3xl">🛡️</span>
                <div className="text-left">
                  <h3 className="text-red-500 font-bold text-lg uppercase tracking-widest group-hover:text-red-400">Entrenamiento Táctico</h3>
                  <p className="text-gray-500 text-xs font-mono uppercase">Operación: Firewall // Tech Vocabulary</p>
                </div>
              </div>
            </button>
          </div>
        ) : (
          <>
            {!quizStarted ? (
              <div className="flex flex-col items-center animate-fade-in-up text-center max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                  {isTacticalMode ? 'Protocolo de Seguridad Activado' : 'Bienvenida al Test de Nivelación'}
                </h2>
                <div className={`bg-cyber-dark border ${isTacticalMode ? 'border-red-500 shadow-[0_0_30px_rgba(255,0,0,0.2)]' : 'border-neon-cyan shadow-[0_0_30px_rgba(0,243,255,0.15)]'} rounded-2xl p-8 w-full transition-all duration-500`}>
                  <p className="text-2xl mb-4 text-gray-300">Misión Actual:</p>
                  <div className={`text-5xl mb-6 font-bold ${isTacticalMode ? 'text-red-500 drop-shadow-[0_0_5px_rgba(255,0,0,0.8)]' : 'text-neon-cyan drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]'}`}>
                    {selectedLanguage.name} <span className="ml-4">{selectedLanguage.flag}</span>
                  </div>
                  <p className="text-gray-400 mb-8 font-mono">
                    {isTacticalMode
                      ? 'Evaluación de vocabulario técnico crítico. Se requiere precisión absoluta en terminología de ciberseguridad.'
                      : 'Iniciando protocolos de evaluación. El test consta de 10 preguntas de dificultad progresiva.'}
                  </p>

                  <div className="mb-8 flex items-start gap-3 text-left bg-gray-900/50 p-4 rounded border border-gray-700">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={termsAccepted}
                      onChange={(e) => { playClick(); setTermsAccepted(e.target.checked); }}
                      className={`mt-1 w-5 h-5 cursor-pointer ${isTacticalMode ? 'accent-red-500' : 'accent-neon-cyan'}`}
                    />
                    <label htmlFor="terms" className="text-sm text-gray-400 cursor-pointer select-none">
                      Acepto los <button onClick={() => setShowTermsModal(true)} className={`${isTacticalMode ? 'text-red-500' : 'text-neon-cyan'} hover:underline mx-1`}>Términos de Servicio</button>
                      y el Aviso de Privacidad conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).
                    </label>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <button
                      onClick={handleStartQuiz}
                      onMouseEnter={playHover}
                      disabled={!termsAccepted}
                      className={`px-8 py-3 rounded-full font-bold border transition-all duration-300 uppercase tracking-wider ${termsAccepted
                          ? (isTacticalMode
                            ? 'bg-red-600 text-white border-red-600 hover:shadow-[0_0_20px_rgba(255,0,0,0.5)] cursor-pointer'
                            : 'bg-neon-cyan text-black border-neon-cyan hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] cursor-pointer')
                          : 'bg-gray-700 text-gray-500 border-gray-700 cursor-not-allowed opacity-50'
                        }`}
                    >
                      Comenzar Test
                    </button>
                    <button
                      onClick={() => { playClick(); setSelectedLanguage(null); setIsTacticalMode(false); }}
                      onMouseEnter={playHover}
                      className="px-8 py-3 rounded-full border border-gray-600 hover:border-gray-400 text-gray-400 hover:text-white transition-all duration-300 uppercase tracking-wider"
                    >
                      Abortar Misión
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <QuizComponent
                languageId={selectedLanguage.id}
                languageName={selectedLanguage.name}
                questions={isTacticalMode ? tacticalData : quizData[selectedLanguage.id]}
                onRetry={handleRetry}
                onExit={() => { setSelectedLanguage(null); setIsTacticalMode(false); }}
              />
            )}
          </>
        )}
      </main>

      <footer className="mt-8 text-gray-600 text-sm font-mono z-10">
        © 2025 LINGUASEC ACADEMY // SECURE LEARNING ENVIRONMENT
      </footer>
    </div>
  )
}

export default App
