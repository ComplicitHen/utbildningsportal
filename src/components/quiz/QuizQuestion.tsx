import React, { useState, useEffect } from 'react';
import { QuizQuestion as QuizQuestionType } from '../../types';

interface QuizQuestionProps {
    question: QuizQuestionType;
    onAnswer: (selectedAnswer: number) => void;
    questionNumber: number;
}

interface ShuffledOption {
    text: string;
    originalIndex: number;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, onAnswer, questionNumber }) => {
    const [shuffledOptions, setShuffledOptions] = useState<ShuffledOption[]>([]);

    useEffect(() => {
        // Skapa array med svarsalternativ och deras ursprungliga index
        const optionsWithIndex = question.options.map((option, index) => ({
            text: option,
            originalIndex: index
        }));
        
        // Blanda svarsalternativen
        const shuffled = [...optionsWithIndex].sort(() => Math.random() - 0.5);
        setShuffledOptions(shuffled);
    }, [question]);

    const handleAnswer = (shuffledIndex: number) => {
        // Få det ursprungliga indexet för det valda alternativet
        const originalIndex = shuffledOptions[shuffledIndex].originalIndex;
        onAnswer(originalIndex);
    };
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="card">
                <div style={{ marginBottom: '20px' }}>
                    <h2 style={{ color: 'var(--black)', marginBottom: '20px' }}>
                        {questionNumber}. {question.question}
                    </h2>
                    {question.image && (
                        <img 
                            src={question.image} 
                            alt="Question illustration"
                            style={{ 
                                maxWidth: '100%', 
                                height: 'auto', 
                                borderRadius: '8px',
                                marginBottom: '20px' 
                            }}
                        />
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {shuffledOptions.map((option, index) => (
                        <button
                            key={`${questionNumber}-${index}`}
                            onClick={() => handleAnswer(index)}
                            style={{
                                padding: '15px 20px',
                                border: '2px solid var(--light-gray)',
                                borderRadius: '8px',
                                background: 'var(--white)',
                                textAlign: 'left',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.borderColor = 'var(--primary-red)';
                                e.currentTarget.style.background = 'rgba(211, 47, 47, 0.05)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.borderColor = 'var(--light-gray)';
                                e.currentTarget.style.background = 'var(--white)';
                            }}
                        >
                            <span style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                background: 'var(--light-gray)',
                                fontWeight: '600',
                                color: 'var(--primary-red)'
                            }}>
                                {String.fromCharCode(65 + index)}
                            </span>
                            <span>{option.text}</span>
                        </button>
                    ))}
                </div>

                {question.explanation && (
                    <div style={{
                        marginTop: '20px',
                        padding: '15px',
                        background: 'var(--light-gray)',
                        borderRadius: '8px',
                        borderLeft: '4px solid var(--primary-red)'
                    }}>
                        <strong>💡 Tips:</strong> {question.explanation}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizQuestion;