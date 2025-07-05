import React from 'react';
import { Flashcard } from '../../types';

interface FlashcardItemProps {
    flashcard: Flashcard;
    showAnswer: boolean;
    onFlip: () => void;
}

const FlashcardItem: React.FC<FlashcardItemProps> = ({ flashcard, showAnswer, onFlip }) => {
    return (
        <div 
            onClick={onFlip}
            style={{
                width: '100%',
                maxWidth: '500px',
                height: '300px',
                background: 'white',
                borderRadius: '15px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '30px',
                position: 'relative',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                border: '3px solid transparent',
                backgroundImage: showAnswer 
                    ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.2)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            }}
        >
            {/* Card type indicator */}
            <div style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '5px 10px',
                borderRadius: '10px',
                fontSize: '0.8rem',
                fontWeight: '600'
            }}>
                {showAnswer ? 'SVAR' : 'FRÅGA'}
            </div>

            {/* Difficulty indicator */}
            <div style={{
                position: 'absolute',
                top: '15px',
                left: '15px',
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '5px 10px',
                borderRadius: '10px',
                fontSize: '0.8rem',
                fontWeight: '600'
            }}>
                {flashcard.difficulty === 'easy' ? '🟢 Lätt' : 
                 flashcard.difficulty === 'medium' ? '🟡 Medel' : '🔴 Svår'}
            </div>

            {/* Card content */}
            <div style={{
                textAlign: 'center',
                fontSize: showAnswer ? '1.1rem' : '1.3rem',
                fontWeight: showAnswer ? '400' : '600',
                lineHeight: '1.5',
                margin: '20px 0'
            }}>
                {showAnswer ? flashcard.answer : flashcard.question}
            </div>

            {/* Flip instruction */}
            <div style={{
                position: 'absolute',
                bottom: '15px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '0.9rem',
                opacity: '0.8',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
            }}>
                🔄 Klicka för att {showAnswer ? 'dölj svar' : 'visa svar'}
            </div>

            {/* Category badge */}
            {flashcard.category && (
                <div style={{
                    position: 'absolute',
                    bottom: '15px',
                    right: '15px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '3px 8px',
                    borderRadius: '8px',
                    fontSize: '0.7rem',
                    fontWeight: '500'
                }}>
                    {flashcard.category}
                </div>
            )}
        </div>
    );
};

export default FlashcardItem;