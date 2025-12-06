import { useState, useCallback } from 'react';
import { calcularNivelMCER, getMensajeMotivacional } from '../domain/evaluation';

export const useQuiz = (questions) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / questions.length) * 100;

    const handleOptionClick = useCallback((index) => {
        if (isAnswerChecked) return;

        setSelectedOption(index);
        setIsAnswerChecked(true);

        if (index === currentQuestion.correctAnswer) {
            setScore(prev => prev + 1);
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

    const resultData = showResult ? {
        score,
        total: questions.length,
        ...calcularNivelMCER(score),
        mensaje: getMensajeMotivacional(calcularNivelMCER(score).nivel)
    } : null;

    const retry = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowResult(false);
        setSelectedOption(null);
        setIsAnswerChecked(false);
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
        retry
    };
};
