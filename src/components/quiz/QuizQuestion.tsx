import React from 'react';
import { QuizQuestion as QuizQuestionType } from '../../types';

interface QuizQuestionProps {
    question: QuizQuestionType;
    onAnswer: (selectedAnswer: number) => void;
    questionNumber: number;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, onAnswer, questionNumber }) => {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="card">
                <div style={{ marginBottom: '20px' }}>
                    <h2 style={{ color: '#333', marginBottom: '20px' }}>
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
                    {question.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => onAnswer(index)}
                            style={{
                                padding: '15px 20px',
                                border: '2px solid #e1e5e9',
                                borderRadius: '8px',
                                background: 'white',
                                textAlign: 'left',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.borderColor = '#667eea';
                                e.currentTarget.style.background = 'rgba(102, 126, 234, 0.05)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.borderColor = '#e1e5e9';
                                e.currentTarget.style.background = 'white';
                            }}
                        >
                            <span style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                background: '#f8f9fa',
                                fontWeight: '600',
                                color: '#667eea'
                            }}>
                                {String.fromCharCode(65 + index)}
                            </span>
                            <span>{option}</span>
                        </button>
                    ))}
                </div>

                {question.explanation && (
                    <div style={{
                        marginTop: '20px',
                        padding: '15px',
                        background: '#f8f9fa',
                        borderRadius: '8px',
                        borderLeft: '4px solid #667eea'
                    }}>
                        <strong>💡 Tips:</strong> {question.explanation}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizQuestion;