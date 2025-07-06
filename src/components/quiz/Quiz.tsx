import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DataService } from '../../services/dataService';
import { FirebaseService } from '../../services/firebaseService';
import { Quiz as QuizType, User, QuizResult } from '../../types';
import QuizQuestion from './QuizQuestion';

interface QuizProps {
    user: User;
}

const Quiz: React.FC<QuizProps> = ({ user }) => {
    const { areaId, quizId } = useParams<{ areaId: string; quizId: string }>();
    const [quiz, setQuiz] = useState<QuizType | null>(null);
    const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(0);
    const [quizQuestions, setQuizQuestions] = useState<QuizType['questions']>([]);
    const [showQuestionSelector, setShowQuestionSelector] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    const questionCountOptions = [10, 20, 30, 50, 100];

    useEffect(() => {
        if (areaId && quizId) {
            const foundQuiz = DataService.getQuiz(areaId, quizId);
            setQuiz(foundQuiz || null);
            if (foundQuiz) {
                // Sätt standardvärde baserat på användarens preferenser eller 20
                const defaultCount = user.quizSettings?.preferredQuestionCount || 20;
                setSelectedQuestionCount(Math.min(defaultCount, foundQuiz.questions.length));
            }
        }
        setLoading(false);
    }, [areaId, quizId, user.quizSettings]);

    const startQuiz = (questionCount: number) => {
        if (!quiz) return;
        
        // Blanda frågorna och ta rätt antal
        const shuffledQuestions = [...quiz.questions].sort(() => Math.random() - 0.5);
        const selectedQuestions = shuffledQuestions.slice(0, questionCount);
        
        setQuizQuestions(selectedQuestions);
        setSelectedAnswers(new Array(selectedQuestions.length).fill(-1));
        setShowQuestionSelector(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setQuizCompleted(false);
    };

    const handleAnswer = (selectedAnswer: number) => {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
        
        // Uppdatera selectedAnswers
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestionIndex] = selectedAnswer;
        setSelectedAnswers(newAnswers);
        
        if (isCorrect) {
            setScore(score + 1);
        }
        
        // Gå till nästa fråga eller avsluta
        const nextQuestion = currentQuestionIndex + 1;
        if (nextQuestion < quizQuestions.length) {
            setCurrentQuestionIndex(nextQuestion);
        } else {
            // Quiz slutfört - spara resultat till Firebase
            completeQuiz();
        }
    };

    const completeQuiz = async () => {
        setQuizCompleted(true);
        
        if (!quiz || !areaId || !quizId) return;

        try {
            // Spara quiz-resultat
            const quizResult = {
                id: `${user.id}_${quizId}_${Date.now()}`,
                userId: user.id,
                userServiceNumber: user.serviceNumber,
                userDisplayName: user.displayName,
                quizId: quizId,
                score: score,
                totalQuestions: quizQuestions.length,
                answers: quizQuestions.map((question, index) => ({
                    questionId: question.id,
                    selectedAnswer: selectedAnswers[index],
                    correct: selectedAnswers[index] === question.correctAnswer
                })),
                completedAt: new Date(),
                timeSpent: 0 // Du kan lägga till timer senare
            };

            await FirebaseService.saveQuizResult(quizResult);
            
            // Uppdatera användarens progress
            const scorePercentage = Math.round((score / quizQuestions.length) * 100);
            await FirebaseService.updateQuizCompletion(user.id, areaId, quizId, scorePercentage);
            
            console.log('Quiz results saved successfully');
        } catch (error) {
            console.error('Error saving quiz results:', error);
        }
    };

    if (loading) {
        return <div className="loading-screen">Laddar quiz...</div>;
    }

    if (!quiz) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Quiz hittades inte</h2>
                <Link to="/training-areas" className="btn">
                    Tillbaka till utbildningsområden
                </Link>
            </div>
        );
    }

    // Visa frågeväljare innan quiz startar
    if (showQuestionSelector && quiz) {
        return (
            <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
                <div style={{ marginBottom: '30px' }}>
                    <Link to="/training-areas" style={{ color: 'var(--primary-red)', textDecoration: 'none' }}>
                        ← Tillbaka till utbildningsområden
                    </Link>
                    <h1 style={{ color: 'var(--text-primary)', margin: '10px 0' }}>🧪 {quiz.title}</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>{quiz.description}</p>
                </div>

                <div className="card" style={{ textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '20px', color: 'var(--text-primary)' }}>Välj antal frågor</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
                        Totalt tillgängliga frågor: {quiz.questions.length}
                    </p>
                    
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', 
                        gap: '15px',
                        marginBottom: '20px'
                    }}>
                        {questionCountOptions.map(count => (
                            count <= quiz.questions.length && (
                                <button
                                    key={count}
                                    onClick={() => startQuiz(count)}
                                    className="btn"
                                    style={{
                                        padding: '15px',
                                        fontSize: '1.1rem',
                                        background: selectedQuestionCount === count 
                                            ? 'var(--primary-red)' 
                                            : 'var(--medium-gray)'
                                    }}
                                >
                                    {count}
                                </button>
                            )
                        ))}
                        
                        {quiz.questions.length > Math.max(...questionCountOptions) && (
                            <button
                                onClick={() => startQuiz(quiz.questions.length)}
                                className="btn"
                                style={{
                                    padding: '15px',
                                    fontSize: '1.1rem',
                                    background: 'var(--success-green)'
                                }}
                            >
                                Alla ({quiz.questions.length})
                            </button>
                        )}
                    </div>
                    
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-disabled)' }}>
                        Frågorna väljs slumpmässigt från hela samlingen
                    </p>
                </div>
            </div>
        );
    }

    const scorePercentage = Math.round((score / quizQuestions.length) * 100);
    const passed = scorePercentage >= quiz.passingScore;

    if (quizCompleted) {
        return (
            <div style={{ padding: '20px' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h1 style={{ color: passed ? '#28a745' : '#dc3545' }}>
                        {passed ? '🎉 Grattis!' : '😔 Försök igen'}
                    </h1>
                    <h2>Quiz slutfört!</h2>
                    <div style={{ 
                        fontSize: '3rem', 
                        margin: '20px 0',
                        color: passed ? '#28a745' : '#dc3545'
                    }}>
                        {scorePercentage}%
                    </div>
                    <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                        Du fick {score} av {quizQuestions.length} rätt
                    </p>
                    <p style={{ color: '#666' }}>
                        Godkänt: {quiz.passingScore}% | 
                        Ditt resultat: {passed ? 'GODKÄNT' : 'UNDERKÄNT'}
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '30px' }}>
                    <button 
                        onClick={() => {
                            setShowQuestionSelector(true);
                            setCurrentQuestionIndex(0);
                            setScore(0);
                            setQuizCompleted(false);
                            setSelectedAnswers([]);
                        }}
                        className="btn"
                    >
                        🔄 Försök igen
                    </button>
                    <Link to="/training-areas" className="btn btn-secondary">
                        📚 Välj nytt område
                    </Link>
                </div>
            </div>
        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];

    return (
        <div style={{ padding: '20px' }}>
            {/* Header */}
            <div style={{ marginBottom: '30px' }}>
                <Link to="/training-areas" style={{ color: '#667eea', textDecoration: 'none' }}>
                    ← Tillbaka till utbildningsområden
                </Link>
                <h1 style={{ color: '#333', margin: '10px 0' }}>🧪 {quiz.title}</h1>
                <p style={{ color: '#666' }}>{quiz.description}</p>
                <div style={{ 
                    display: 'flex', 
                    gap: '20px', 
                    alignItems: 'center',
                    marginTop: '10px' 
                }}>
                    <span style={{ 
                        background: '#667eea', 
                        color: 'white', 
                        padding: '4px 12px', 
                        borderRadius: '15px',
                        fontSize: '0.8rem'
                    }}>
                        {quiz.difficulty}
                    </span>
                    <span style={{ color: '#666' }}>
                        Fråga {currentQuestionIndex + 1} av {quizQuestions.length}
                    </span>
                    <span style={{ color: '#666' }}>
                        Godkänt: {quiz.passingScore}%
                    </span>
                </div>
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: '30px' }}>
                <div style={{
                    background: '#e1e5e9',
                    height: '6px',
                    borderRadius: '3px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        height: '100%',
                        width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
                        transition: 'width 0.3s ease'
                    }} />
                </div>
            </div>

            {/* Quiz Question */}
            <QuizQuestion 
                question={quizQuestions[currentQuestionIndex]}
                onAnswer={handleAnswer}
                questionNumber={currentQuestionIndex + 1}
            />
        </div>
    );
};

export default Quiz;