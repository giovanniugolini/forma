/**
 * QuizAlgebraDemo - Quiz random sulle equazioni di secondo grado
 */
import React, { useState, useCallback } from "react";
import {
    QuizContainer,
    QuizStartScreen,
    QuizProgress,
    QuizQuestionCard,
    QuizNavigation,
    QuizResults,
} from "../../components/ui/Quiz";
import { useQuiz } from "../../hooks/useQuiz";
import { useSaveQuizResult } from "../../hooks/useQuizResults";
import { useAuth } from "../../hooks/useAuth";
import type { QuizDefinition, QuizScore } from "../../types/quiz";
import { generateAlgebraQuiz } from "../../utils/quiz/generators";

const QUIZ_LENGTH = 7;

function createRandomQuiz(): QuizDefinition {
    return {
        id: `algebra-random-${Date.now()}`,
        title: "Quiz Equazioni di 2° grado",
        description:
            "Verifica le tue conoscenze sulle equazioni di secondo grado",
        questions: generateAlgebraQuiz(QUIZ_LENGTH),
        shuffleQuestions: false,
        shuffleOptions: false,
        passingScore: 60,
    };
}

export default function QuizAlgebraDemo(): React.ReactElement {
    const [quiz, setQuiz] = useState<QuizDefinition>(createRandomQuiz);
    const [showImmediateFeedback, setShowImmediateFeedback] = useState(true);
    const [resultSaved, setResultSaved] = useState(false);
    
    const { user } = useAuth();
    const { save: saveQuizResult } = useSaveQuizResult();

    const {
        state,
        questions,
        currentQuestion,
        score,
        start,
        answer,
        next,
        prev,
        submit,
        reset,
        isFirst,
        isLast,
        answeredCount,
        canSubmit,
        currentFeedback,
        showFeedback,
    } = useQuiz({
        quiz,
        showImmediateFeedback,
        onComplete: async (finalScore: QuizScore) => {
            if (!user || resultSaved) return;
            
            const result = await saveQuizResult({
                quizId: quiz.id,
                score: finalScore,
                answers: state.answers,
                timeSpent: state.startedAt ? Math.floor((Date.now() - state.startedAt) / 1000) : undefined
            });
            
            if (result) {
                setResultSaved(true);
                console.log('Quiz result saved:', result);
            }
        },
    });

    const handleRetry = useCallback(() => {
        setQuiz(createRandomQuiz());
        setResultSaved(false);
        reset();
    }, [reset]);

    const handleNewQuiz = useCallback(() => {
        setQuiz(createRandomQuiz());
        setResultSaved(false);
        reset();
    }, [reset]);

    return (
        <QuizContainer
            title="Quiz: Equazioni di 2° grado"
            description="Domande generate casualmente sulle equazioni di secondo grado"
        >
            {/* Schermata iniziale */}
            {state.status === "not_started" && (
                <>
                    <QuizStartScreen
                        title={quiz.title}
                        description={quiz.description}
                        questionCount={quiz.questions.length}
                        onStart={start}
                    />
                    <div style={{ marginTop: 16, textAlign: "center" }}>
                        <label
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 8,
                                cursor: "pointer",
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={showImmediateFeedback}
                                onChange={(e) =>
                                    setShowImmediateFeedback(e.target.checked)
                                }
                            />
                            <span style={{ fontSize: 14, color: "#64748b" }}>
                                Mostra feedback immediato
                            </span>
                        </label>
                    </div>
                    {user && (
                        <p style={{ marginTop: 12, fontSize: 12, color: "#64748b", textAlign: "center" }}>
                            🔐 I risultati verranno salvati nel tuo profilo
                        </p>
                    )}
                    {!user && (
                        <p style={{ marginTop: 12, fontSize: 12, color: "#f59e0b", textAlign: "center" }}>
                            ⚠️ Effettua il login per salvare i risultati
                        </p>
                    )}
                </>
            )}

            {/* Quiz in corso */}
            {state.status === "in_progress" && currentQuestion && (
                <>
                    <QuizProgress
                        current={state.currentIndex + 1}
                        total={questions.length}
                        answeredCount={answeredCount}
                    />

                    <QuizQuestionCard
                        question={currentQuestion}
                        currentAnswer={state.answers[currentQuestion.id] ?? null}
                        onAnswer={(value) => {
                            answer(currentQuestion.id, value);
                            if (showImmediateFeedback) {
                                showFeedback();
                            }
                        }}
                        showFeedback={currentFeedback?.shown ?? false}
                        isCorrect={currentFeedback?.isCorrect}
                    />

                    <QuizNavigation
                        onPrev={prev}
                        onNext={next}
                        onSubmit={submit}
                        isFirst={isFirst}
                        isLast={isLast}
                        canSubmit={canSubmit && isLast}
                    />

                    {/* Indicatori domande */}
                    <div
                        style={{
                            display: "flex",
                            gap: 6,
                            justifyContent: "center",
                            marginTop: 24,
                            flexWrap: "wrap",
                        }}
                    >
                        {questions.map((q, index) => {
                            const isAnswered =
                                state.answers[q.id] !== null &&
                                state.answers[q.id] !== undefined;
                            const isCurrent = index === state.currentIndex;
                            return (
                                <div
                                    key={q.id}
                                    style={{
                                        width: 28,
                                        height: 28,
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 12,
                                        fontWeight: 600,
                                        background: isCurrent
                                            ? "#3b82f6"
                                            : isAnswered
                                            ? "#22c55e"
                                            : "#e2e8f0",
                                        color: isCurrent || isAnswered ? "#fff" : "#64748b",
                                        border: isCurrent ? "2px solid #1d4ed8" : "none",
                                    }}
                                >
                                    {index + 1}
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {/* Risultati */}
            {state.status === "completed" && score && (
                <>
                    <QuizResults
                        score={score}
                        questions={questions}
                        answers={state.answers}
                        onRetry={handleRetry}
                        onBack={() => (window.location.href = "#/")}
                    />
                    {resultSaved && (
                        <p style={{ marginTop: 16, fontSize: 14, color: "#22c55e", textAlign: "center" }}>
                            ✅ Risultato salvato nel tuo profilo!
                        </p>
                    )}
                    {user && !resultSaved && (
                        <p style={{ marginTop: 16, fontSize: 14, color: "#f59e0b", textAlign: "center" }}>
                            ⏳ Salvataggio in corso...
                        </p>
                    )}
                </>
            )}
        </QuizContainer>
    );
}
