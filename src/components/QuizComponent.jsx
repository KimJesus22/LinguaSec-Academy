import React from 'react';
import { useQuiz } from '../hooks/useQuiz';
import QuizQuestionView from './QuizQuestionView';
import QuizResultUI from './QuizResultUI';
import SecurityWarningModal from './SecurityWarningModal';

const QuizComponent = ({ languageId, languageName, questions, onRetry, onExit }) => {
    const {
        currentQuestionIndex,
        currentQuestion,
        progress,
        selectedOption,
        isAnswerChecked,
        handleOptionClick,
        showResult,
        resultData,
        retry: hookRetry,
        showSecurityWarning,
        securityViolations,
        closeSecurityWarning
    } = useQuiz(questions);

    const handleRetry = () => {
        hookRetry();
        onRetry();
    };

    // If intruder, resultData will be blocked
    if (showResult && resultData) {
        return (
            <QuizResultUI
                score={resultData.score}
                totalQuestions={resultData.total}
                levelData={{ nivel: resultData.nivel, nombre: resultData.nombre, color: resultData.color }}
                mensaje={resultData.mensaje}
                onRetry={handleRetry}
                onExit={onExit}
                languageName={languageName}
                isIntruder={resultData.nivel === "INTRUSO"}
            />
        );
    }

    return (
        <>
            {showSecurityWarning && (
                <SecurityWarningModal
                    onClose={closeSecurityWarning}
                    attempts={securityViolations}
                />
            )}

            <QuizQuestionView
                currentQuestion={currentQuestion}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                progress={progress}
                selectedOption={selectedOption}
                isAnswerChecked={isAnswerChecked}
                onOptionClick={handleOptionClick}
            />
        </>
    );
};

export default QuizComponent;
