import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DataService } from '../../services/dataService';
import { Quiz as QuizType, User, QuizResult } from '../../types';
import QuizQuestion from './QuizQuestion';

interface QuizProps {
    user: User;
}

const Quiz: React.FC<QuizProps> = ({ user }) => {
    const { areaId, quizId } = useParams<{ areaId: string; quizId: string }>();
    const [quiz, setQuiz] = useState<QuizType | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (areaId && quizId) {
            const foundQuiz = DataService.getQuiz(areaId, quizId);
            setQuiz(foundQuiz || null);
            if (foundQuiz) {
                setSelectedAnswers(new Array(foundQuiz.questions.length).fill(-1));
            }
        }
        setLoading(false);
    }, [areaId, quizId]);

    const handleAnswer = (selectedAnswer: number) => {
        const currentQuestion = quiz!.questions[currentQuestionIndex];
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
        if (nextQuestion < quiz!.questions.length) {
            setCurrentQuestionIndex(nextQuestion);
        } else {
            setQuizCompleted(true);
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

    const scorePercentage = Math.round((score / quiz.questions.length) * 100);
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
                        Du fick {score} av {quiz.questions.length} rätt
                    </p>
                    <p style={{ color: '#666' }}>
                        Godkänt: {quiz.passingScore}% | 
                        Ditt resultat: {passed ? 'GODKÄNT' : 'UNDERKÄNT'}
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '30px' }}>
                    <button 
                        onClick={() => {
                            setCurrentQuestionIndex(0);
                            setScore(0);
                            setQuizCompleted(false);
                            setSelectedAnswers(new Array(quiz.questions.length).fill(-1));
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
                        Fråga {currentQuestionIndex + 1} av {quiz.questions.length}
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
                        width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`,
                        transition: 'width 0.3s ease'
                    }} />
                </div>
            </div>

            {/* Quiz Question */}
            <QuizQuestion 
                question={currentQuestion}
                onAnswer={handleAnswer}
                questionNumber={currentQuestionIndex + 1}
            />
        </div>
    );
};

export default Quiz;