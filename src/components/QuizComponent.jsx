import React, { useEffect } from 'react';
import { useQuiz } from '../hooks/useQuiz';
import QuizQuestionView from './QuizQuestionView';
import QuizResultUI from './QuizResultUI';
import SecurityWarningModal from './SecurityWarningModal';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';

const QuizComponent = ({ languageId, languageName, questions, onRetry, onExit }) => {
    const { user } = useAuth();

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

    // Save result to DB when finished
    useEffect(() => {
        if (showResult && resultData && user) {
            const saveResult = async () => {
                const { error } = await supabase
                    .from('exam_results')
                    .insert([
                        {
                            user_id: user.id,
                            language: languageName,
                            score: resultData.score,
                            level: resultData.nivel
                        }
                    ]);

                if (error) {
                    console.error("Error saving result to DB:", error);
                } else {
                    console.log("Exam result saved successfully.");
                }
            };
            saveResult();
        }
    }, [showResult, resultData, user, languageName]);


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
