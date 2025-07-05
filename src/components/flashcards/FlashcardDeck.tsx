import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DataService } from '../../services/dataService';
import { FirebaseService } from '../../services/firebaseService';
import { FlashcardDeck as FlashcardDeckType, Flashcard, User } from '../../types';
import FlashcardItem from './FlashcardItem';

interface FlashcardDeckProps {
    user: User;
}

const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ user }) => {
    const { areaId, deckId } = useParams<{ areaId: string; deckId: string }>();
    const [deck, setDeck] = useState<FlashcardDeckType | null>(null);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (areaId && deckId) {
            const foundDeck = DataService.getFlashcardDeck(areaId, deckId);
            setDeck(foundDeck || null);
        }
        setLoading(false);
    }, [areaId, deckId]);

    const handleNext = () => {
        if (deck && currentCardIndex < deck.cards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
            setShowAnswer(false);
            updateProgress();
        }
    };

    const handlePrevious = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex(currentCardIndex - 1);
            setShowAnswer(false);
        }
    };

    const handleFlip = () => {
        setShowAnswer(!showAnswer);
    };

    const updateProgress = async () => {
        if (!deck || !areaId || !deckId) return;
        
        try {
            const progress = ((currentCardIndex + 1) / deck.cards.length) * 100;
            await FirebaseService.updateFlashcardProgress(user.id, areaId, deckId, progress);
        } catch (error) {
            console.error('Error updating flashcard progress:', error);
        }
    };

    // Uppdatera progress när användaren når slutet
    useEffect(() => {
        if (deck && currentCardIndex === deck.cards.length - 1 && showAnswer) {
            updateProgress();
        }
    }, [currentCardIndex, showAnswer, deck]);

    if (loading) {
        return <div className="loading-screen">Laddar flashcards...</div>;
    }

    if (!deck) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Flashcard-deck hittades inte</h2>
                <Link to="/training-areas" className="btn">
                    Tillbaka till utbildningsområden
                </Link>
            </div>
        );
    }

    const currentCard = deck.cards[currentCardIndex];

    return (
        <div style={{ padding: '20px' }}>
            {/* Header */}
            <div style={{ marginBottom: '30px' }}>
                <Link to="/training-areas" style={{ color: '#667eea', textDecoration: 'none' }}>
                    ← Tillbaka till utbildningsområden
                </Link>
                <h1 style={{ color: '#333', margin: '10px 0' }}>🗃️ {deck.title}</h1>
                <p style={{ color: '#666' }}>{deck.description}</p>
            </div>

            {/* Flashcard */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginBottom: '30px' 
            }}>
                <FlashcardItem 
                    flashcard={currentCard}
                    showAnswer={showAnswer}
                    onFlip={handleFlip}
                />
            </div>

            {/* Controls */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                maxWidth: '500px',
                margin: '0 auto'
            }}>
                <button 
                    onClick={handlePrevious}
                    disabled={currentCardIndex === 0}
                    className="btn btn-secondary"
                >
                    ← Föregående
                </button>

                <button 
                    onClick={handleFlip}
                    className="btn"
                    style={{ margin: '0 20px' }}
                >
                    {showAnswer ? '🔄 Dölj svar' : '🔄 Visa svar'}
                </button>

                <button 
                    onClick={handleNext}
                    disabled={currentCardIndex === deck.cards.length - 1}
                    className="btn btn-secondary"
                >
                    Nästa →
                </button>
            </div>
        </div>
    );
};

export default FlashcardDeck;