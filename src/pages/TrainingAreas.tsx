import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataService } from '../services/dataService';
import { TrainingCategory } from '../types';
import { SambandsQuizService } from '../services/sambandsQuizService';

const TrainingAreas: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<TrainingCategory | 'all'>('all');
    const trainingAreas = DataService.getAllTrainingAreas();
    const sambandsQuizStats = SambandsQuizService.getQuizMetadata();

    const categories: { value: TrainingCategory | 'all', label: string }[] = [
        { value: 'all', label: 'Alla områden' },
        { value: 'brandkunskap', label: 'Brandkunskap' },
        { value: 'fordonskännedom', label: 'Fordonskännedom' },
        { value: 'radiokunskap', label: 'Radiokunskap' },
        { value: 'sjukvård', label: 'Sjukvård' },
        { value: 'räddningstjänst', label: 'Räddningstjänst' },
        { value: 'kemikalier', label: 'Kemikalier' },
        { value: 'säkerhet', label: 'Säkerhet' },
        { value: 'ledarskap', label: 'Ledarskap' }
    ];

    const filteredAreas = selectedCategory === 'all' 
        ? trainingAreas 
        : trainingAreas.filter(area => area.category === selectedCategory);

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">
                    📚 Utbildningsområden
                </h1>
                <p className="page-subtitle">
                    Välj ett område för att börja din träning inom brandväsendet.
                </p>
            </div>

            {/* Kategorifilter */}
            <div className="filter-section">
                <div className="filter-buttons">
                    {categories.map(category => (
                        <button
                            key={category.value}
                            onClick={() => setSelectedCategory(category.value)}
                            className={`category-btn ${selectedCategory === category.value ? 'active' : ''}`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Träningsområden */}
            <div className="grid">
                {/* Specialiserat Sambandsquiz */}
                {(selectedCategory === 'all' || selectedCategory === 'radiokunskap') && (
                    <div className="card highlight-card">
                        <div className="card-header">
                            <span className="card-icon">📡</span>
                            <h3 className="card-title">Sambandsquiz</h3>
                            <span className="card-badge">NYTT</span>
                        </div>
                        
                        <div className="card-description">
                            Testa dina kunskaper om samband vid räddningsinsats enligt RSG:s instruktioner. 
                            Välj mellan olika svårighetsgrader och anpassa antal frågor efter dina behov.
                        </div>
                        
                        <div className="card-stats">
                            <div className="stat-item">
                                <span className="stat-icon">📊</span>
                                <span>3 Svårighetsgrader</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-icon">❓</span>
                                <span>{sambandsQuizStats.totalQuestions} Frågor totalt</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-icon">⚙️</span>
                                <span>Anpassningsbara quiz</span>
                            </div>
                        </div>

                        <div className="difficulty-preview">
                            <div className="difficulty-item">
                                <span className="difficulty-label easy">Grundläggande</span>
                                <span className="difficulty-count">{sambandsQuizStats.questionsPerDifficulty.easy} frågor</span>
                            </div>
                            <div className="difficulty-item">
                                <span className="difficulty-label advanced">Avancerad</span>
                                <span className="difficulty-count">{sambandsQuizStats.questionsPerDifficulty.advanced} frågor</span>
                            </div>
                            <div className="difficulty-item">
                                <span className="difficulty-label expert">Expert</span>
                                <span className="difficulty-count">{sambandsQuizStats.questionsPerDifficulty.expert} frågor</span>
                            </div>
                        </div>
                        
                        <div className="card-actions">
                            <Link 
                                to="/samband-quiz" 
                                className="action-btn action-btn-primary featured"
                            >
                                📡 Starta Sambandsquiz
                            </Link>
                        </div>
                    </div>
                )}

                {/* Vanliga träningsområden */}
                {filteredAreas.map(area => (
                    <div key={area.id} className="card">
                        <div className="card-header">
                            <span className="card-icon">{area.icon}</span>
                            <h3 className="card-title">{area.name}</h3>
                        </div>
                        
                        <div className="card-description">
                            {area.description}
                        </div>
                        
                        <div className="card-stats">
                            <div className="stat-item">
                                <span className="stat-icon">🎴</span>
                                <span>{area.flashcardDecks.length} Flashcard sets</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-icon">🧪</span>
                                <span>{area.quizzes.length} Quiz</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-icon">🎭</span>
                                <span>{area.scenarios?.length || 0} Scenarios</span>
                            </div>
                        </div>
                        
                        <div className="card-actions">
                            {area.flashcardDecks.length > 0 && (
                                <Link 
                                    to={`/flashcards/${area.id}`} 
                                    className="action-btn action-btn-warning"
                                >
                                    🎴 Flashcards
                                </Link>
                            )}
                            {area.quizzes.length > 0 && (
                                <Link 
                                    to={`/quiz/${area.id}`} 
                                    className="action-btn action-btn-success"
                                >
                                    🧪 Quiz
                                </Link>
                            )}
                            {area.scenarios && area.scenarios.length > 0 && (
                                <Link 
                                    to={`/scenarios/${area.id}`} 
                                    className="action-btn action-btn-primary"
                                >
                                    🎭 Scenarios
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {filteredAreas.length === 0 && (
                <div className="empty-state">
                    <p>Inga utbildningsområden hittades för vald kategori.</p>
                </div>
            )}
        </div>
    );
};

export default TrainingAreas;