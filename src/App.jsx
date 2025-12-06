import { useState } from 'react'
import LanguageCard from './components/LanguageCard'
import QuizComponent from './components/QuizComponent'
import { quizData } from './data/quizData'

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const [quizStarted, setQuizStarted] = useState(false)

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang)
    setQuizStarted(false)
  }

  const handleRetry = () => {
    setQuizStarted(false)
    setTimeout(() => setQuizStarted(true), 0);
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
      </header>

      {/* Main Content */}
      <main className="z-10 w-full max-w-7xl flex-1 flex flex-col items-center justify-center min-h-[600px]">
        {!selectedLanguage ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full place-items-center animate-fade-in-up">
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
        ) : (
          <>
            {!quizStarted ? (
              <div className="flex flex-col items-center animate-fade-in-up text-center max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                  Bienvenida al Test de Nivelación
                </h2>
                <div className="bg-cyber-dark border border-neon-cyan rounded-2xl p-8 shadow-[0_0_30px_rgba(0,243,255,0.15)] w-full">
                  <p className="text-2xl mb-4 text-gray-300">Has seleccionado:</p>
                  <div className="text-5xl mb-6 font-bold text-neon-cyan drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]">
                    {selectedLanguage.name} <span className="ml-4">{selectedLanguage.flag}</span>
                  </div>
                  <p className="text-gray-400 mb-8 font-mono">
                    Iniciando protocolos de evaluación. El test consta de 10 preguntas de dificultad progresiva.
                  </p>

                  <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <button
                      onClick={() => setQuizStarted(true)}
                      className="px-8 py-3 rounded-full bg-neon-cyan text-black font-bold border border-neon-cyan hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] transition-all duration-300 uppercase tracking-wider"
                    >
                      Comenzar Test
                    </button>
                    <button
                      onClick={() => setSelectedLanguage(null)}
                      className="px-8 py-3 rounded-full border border-gray-600 hover:border-neon-purple hover:text-neon-purple hover:bg-neon-purple/10 transition-all duration-300 text-gray-400 uppercase tracking-wider"
                    >
                      Cambiar Idioma
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <QuizComponent
                languageId={selectedLanguage.id}
                languageName={selectedLanguage.name}
                questions={quizData[selectedLanguage.id]}
                onRetry={handleRetry}
                onExit={() => setSelectedLanguage(null)}
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
