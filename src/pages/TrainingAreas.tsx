import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataService } from '../services/dataService';
import { TrainingCategory } from '../types';

const TrainingAreas: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<TrainingCategory | 'all'>('all');
    const trainingAreas = DataService.getAllTrainingAreas();

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
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '30px' }}>
                <h1 style={{ color: '#333', marginBottom: '10px' }}>📚 Utbildningsområden</h1>
                <p style={{ color: '#666', fontSize: '1.1rem' }}>
                    Välj ett område för att börja din träning inom brandväsendet.
                </p>
            </div>

            {/* Kategorifilter */}
            <div style={{ marginBottom: '30px' }}>
                <div style={{ 
                    display: 'flex', 
                    gap: '10px', 
                    flexWrap: 'wrap',
                    justifyContent: 'center' 
                }}>
                    {categories.map(category => (
                        <button
                            key={category.value}
                            onClick={() => setSelectedCategory(category.value)}
                            className="btn"
                            style={{
                                background: selectedCategory === category.value 
                                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                                    : '#f8f9fa',
                                color: selectedCategory === category.value ? 'white' : '#333',
                                border: selectedCategory === category.value ? 'none' : '2px solid #e1e5e9',
                                padding: '8px 16px',
                                fontSize: '0.9rem',
                                width: 'auto'
                            }}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Träningsområden */}
            <div className="grid">
                {filteredAreas.map(area => (
                    <div key={area.id} className="card">
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '15px',
                            marginBottom: '15px' 
                        }}>
                            <span style={{ fontSize: '2.5rem' }}>{area.icon}</span>
                            <div>
                                <h3 className="card-title">{area.name}</h3>
                                <p className="card-description">{area.description}</p>
                            </div>
                        </div>

                        {/* Innehållsöversikt */}
                        <div style={{ 
                            display: 'flex', 
                            gap: '20px', 
                            marginBottom: '20px',
                            fontSize: '0.9rem',
                            color: '#666'
                        }}>
                            <span>🗃️ {area.flashcardDecks.length} Flashcard sets</span>
                            <span>🧪 {area.quizzes.length} Quiz</span>
                            <span>🎭 {area.scenarios.length} Scenarios</span>
                        </div>

                        {/* Aktivitetsknappar */}
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
                            gap: '10px' 
                        }}>
                            {area.flashcardDecks.length > 0 && (
                                <Link 
                                    to={`/flashcards/${area.id}/${area.flashcardDecks[0].id}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <button className="btn btn-secondary" style={{ 
                                        width: '100%', 
                                        fontSize: '0.8rem',
                                        padding: '8px'
                                    }}>
                                        🗃️ Flashcards
                                    </button>
                                </Link>
                            )}
                            
                            {area.quizzes.length > 0 && (
                                <Link 
                                    to={`/quiz/${area.id}/${area.quizzes[0].id}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <button className="btn btn-success" style={{ 
                                        width: '100%', 
                                        fontSize: '0.8rem',
                                        padding: '8px'
                                    }}>
                                        🧪 Quiz
                                    </button>
                                </Link>
                            )}
                            
                            {area.scenarios.length > 0 && (
                                <Link 
                                    to={`/scenarios/${area.id}/${area.scenarios[0].id}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <button className="btn btn-danger" style={{ 
                                        width: '100%', 
                                        fontSize: '0.8rem',
                                        padding: '8px'
                                    }}>
                                        🎭 Scenarios
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {filteredAreas.length === 0 && (
                <div style={{ 
                    textAlign: 'center', 
                    padding: '40px',
                    color: '#666' 
                }}>
                    <p>Inga utbildningsområden hittades för vald kategori.</p>
                </div>
            )}
        </div>
    );
};

export default TrainingAreas;