import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DataService } from '../../services/dataService';
import { FirebaseService } from '../../services/firebaseService';
import { Scenario, User } from '../../types';
import ScenarioItem from './ScenarioItem';

interface ScenarioTrainingProps {
    user: User;
}

const ScenarioTraining: React.FC<ScenarioTrainingProps> = ({ user }) => {
    const { areaId, scenarioId } = useParams<{ areaId: string; scenarioId: string }>();
    const [scenario, setScenario] = useState<Scenario | null>(null);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedChoices, setSelectedChoices] = useState<number[]>([]);

    useEffect(() => {
        if (areaId && scenarioId) {
            const foundScenario = DataService.getScenario(areaId, scenarioId);
            setScenario(foundScenario || null);
            if (foundScenario) {
                setSelectedChoices(new Array(foundScenario.steps.length).fill(-1));
            }
        }
        setLoading(false);
    }, [areaId, scenarioId]);

    const handleChoice = (choiceIndex: number) => {
        const newChoices = [...selectedChoices];
        newChoices[currentStepIndex] = choiceIndex;
        setSelectedChoices(newChoices);
        
        // Gå till nästa steg efter 2 sekunder för att visa feedback
        setTimeout(() => {
            if (currentStepIndex < scenario!.steps.length - 1) {
                setCurrentStepIndex(currentStepIndex + 1);
            }
        }, 2000);
    };

    if (loading) {
        return <div className="loading-screen">Laddar scenario...</div>;
    }

    if (!scenario) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Scenario hittades inte</h2>
                <Link to="/training-areas" className="btn">
                    Tillbaka till utbildningsområden
                </Link>
            </div>
        );
    }

    const currentStep = scenario.steps[currentStepIndex];
    const isCompleted = currentStepIndex >= scenario.steps.length;

    // Spara scenario completion när det är slutfört
    useEffect(() => {
        if (isCompleted && scenario && areaId && scenarioId) {
            const saveCompletion = async () => {
                try {
                    await FirebaseService.updateScenarioCompletion(user.id, areaId, scenarioId);
                    console.log('Scenario completion saved');
                } catch (error) {
                    console.error('Error saving scenario completion:', error);
                }
            };
            saveCompletion();
        }
    }, [isCompleted, scenario, areaId, scenarioId, user.id]);

    if (isCompleted) {
        return (
            <div style={{ padding: '20px' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h1 style={{ color: '#28a745' }}>🎉 Scenario slutfört!</h1>
                    <h2>{scenario.title}</h2>
                    <p style={{ fontSize: '1.2rem', color: '#666' }}>
                        Du har genomgått alla steg i scenariot.
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <button 
                        onClick={() => {
                            setCurrentStepIndex(0);
                            setSelectedChoices(new Array(scenario.steps.length).fill(-1));
                        }}
                        className="btn"
                    >
                        🔄 Börja om
                    </button>
                    <Link to="/training-areas" className="btn btn-secondary">
                        📚 Välj nytt scenario
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            {/* Header */}
            <div style={{ marginBottom: '30px' }}>
                <Link to="/training-areas" style={{ color: '#667eea', textDecoration: 'none' }}>
                    ← Tillbaka till utbildningsområden
                </Link>
                <h1 style={{ color: '#333', margin: '10px 0' }}>🎭 {scenario.title}</h1>
                <p style={{ color: '#666' }}>{scenario.description}</p>
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
                        {scenario.difficulty}
                    </span>
                    <span style={{ color: '#666' }}>
                        Steg {currentStepIndex + 1} av {scenario.steps.length}
                    </span>
                    <span style={{ color: '#666' }}>
                        ⏱️ ~{scenario.estimatedTime} min
                    </span>
                </div>
            </div>

            {/* Situation (bara första steget) */}
            {currentStepIndex === 0 && (
                <div className="card" style={{ marginBottom: '20px', background: '#f8f9fa' }}>
                    <h3 style={{ color: '#333', marginBottom: '10px' }}>📋 Situation</h3>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{scenario.situation}</p>
                </div>
            )}

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
                        width: `${((currentStepIndex + 1) / scenario.steps.length) * 100}%`,
                        transition: 'width 0.3s ease'
                    }} />
                </div>
            </div>

            {/* Current Step */}
            <ScenarioItem 
                step={currentStep}
                stepNumber={currentStepIndex + 1}
                onChoice={handleChoice}
                selectedChoice={selectedChoices[currentStepIndex]}
            />
        </div>
    );
};

export default ScenarioTraining;