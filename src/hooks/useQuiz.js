import { useState, useCallback, useEffect } from 'react';
import { calcularNivelMCER, getMensajeMotivacional } from '../domain/evaluation';

export const useQuiz = (questions) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);
    const [wrongAnswers, setWrongAnswers] = useState([]); // Nuevo estado

    // Security State
    const [securityViolations, setSecurityViolations] = useState(0);
    const [showSecurityWarning, setShowSecurityWarning] = useState(false);
    const [isIntruder, setIsIntruder] = useState(false);

    // Proctoring Logic
    useEffect(() => {
        if (showResult || isIntruder) return;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                setSecurityViolations(prev => {
                    const newCount = prev + 1;
                    if (newCount > 2) {
                        // 3rd Strike: Terminate Exam
                        setIsIntruder(true);
                        setShowResult(true);
                        return newCount;
                    }
                    setShowSecurityWarning(true);
                    return newCount;
                });
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, [showResult, isIntruder]);

    const closeSecurityWarning = () => {
        setShowSecurityWarning(false);
    };

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / questions.length) * 100;

    const handleOptionClick = useCallback((index) => {
        if (isAnswerChecked) return;

        setSelectedOption(index);
        setIsAnswerChecked(true);

        if (index === currentQuestion.correctAnswer) {
            setScore(prev => prev + 1);
        } else {
            setWrongAnswers(prev => [...prev, currentQuestion]);
        }

        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setSelectedOption(null);
                setIsAnswerChecked(false);
            } else {
                setShowResult(true);
            }
        }, 1000);
    }, [currentQuestionIndex, questions, currentQuestion, isAnswerChecked]);

    // Determine Result Data based on Intruder status
    let resultData = null;
    if (showResult) {
        if (isIntruder) {
            resultData = {
                score: 0,
                total: questions.length,
                nivel: "INTRUSO",
                nombre: "ACCESO DENEGADO",
                color: "text-neon-red",
                mensaje: "Intento de intrusión detectado. Prueba fallida. Sus credenciales han sido reportadas."
            };
        } else {
            const evalData = calcularNivelMCER(score);
            resultData = {
                score,
                total: questions.length,
                ...evalData,
                mensaje: getMensajeMotivacional(evalData.nivel)
            };
        }
    }

    const retry = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowResult(false);
        setSelectedOption(null);
        setIsAnswerChecked(false);
        setSecurityViolations(0);
        setIsIntruder(false);
        setShowSecurityWarning(false);
    };

    return {
        currentQuestionIndex,
        currentQuestion,
        progress,
        selectedOption,
        isAnswerChecked,
        handleOptionClick,
        showResult,
        resultData,
        retry,
        wrongAnswers, // Nuevo
        showSecurityWarning,
        securityViolations,
        closeSecurityWarning
    };
};
