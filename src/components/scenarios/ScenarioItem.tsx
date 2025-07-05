import React from 'react';
import { ScenarioStep } from '../../types';

interface ScenarioItemProps {
    step: ScenarioStep;
    stepNumber: number;
    onChoice: (choiceIndex: number) => void;
    selectedChoice: number;
}

const ScenarioItem: React.FC<ScenarioItemProps> = ({ step, stepNumber, onChoice, selectedChoice }) => {
    const hasChoices = step.choices && step.choices.length > 0;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="card">
                <div style={{ marginBottom: '25px' }}>
                    <h2 style={{ color: '#333', marginBottom: '20px' }}>
                        Steg {stepNumber}: {step.instruction}
                    </h2>
                    
                    {step.image && (
                        <img 
                            src={step.image} 
                            alt="Scenario illustration"
                            style={{ 
                                maxWidth: '100%', 
                                height: 'auto', 
                                borderRadius: '8px',
                                marginBottom: '20px' 
                            }}
                        />
                    )}
                </div>

                {hasChoices ? (
                    <div>
                        <h3 style={{ color: '#333', marginBottom: '15px' }}>
                            Vad gör du?
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {step.choices!.map((choice, index) => {
                                const isSelected = selectedChoice === index;
                                const showFeedback = isSelected;
                                
                                return (
                                    <div key={index}>
                                        <button
                                            onClick={() => onChoice(index)}
                                            disabled={selectedChoice !== -1}
                                            style={{
                                                padding: '15px 20px',
                                                border: `2px solid ${
                                                    isSelected 
                                                        ? (choice.isCorrect ? '#28a745' : '#dc3545')
                                                        : '#e1e5e9'
                                                }`,
                                                borderRadius: '8px',
                                                background: isSelected 
                                                    ? (choice.isCorrect ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)')
                                                    : 'white',
                                                textAlign: 'left',
                                                cursor: selectedChoice === -1 ? 'pointer' : 'default',
                                                fontSize: '1rem',
                                                transition: 'all 0.3s ease',
                                                width: '100%',
                                                opacity: selectedChoice !== -1 && !isSelected ? 0.6 : 1
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                <span style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: '30px',
                                                    height: '30px',
                                                    borderRadius: '50%',
                                                    background: isSelected 
                                                        ? (choice.isCorrect ? '#28a745' : '#dc3545')
                                                        : '#f8f9fa',
                                                    fontWeight: '600',
                                                    color: isSelected ? 'white' : '#667eea'
                                                }}>
                                                    {isSelected 
                                                        ? (choice.isCorrect ? '✓' : '✗')
                                                        : String.fromCharCode(65 + index)
                                                    }
                                                </span>
                                                <span>{choice.text}</span>
                                            </div>
                                        </button>
                                        
                                        {showFeedback && (
                                            <div style={{
                                                marginTop: '10px',
                                                padding: '15px',
                                                background: choice.isCorrect 
                                                    ? 'rgba(40, 167, 69, 0.1)' 
                                                    : 'rgba(220, 53, 69, 0.1)',
                                                border: `1px solid ${choice.isCorrect ? '#28a745' : '#dc3545'}`,
                                                borderRadius: '8px',
                                                fontSize: '0.95rem'
                                            }}>
                                                <strong>
                                                    {choice.isCorrect ? '✅ Bra val!' : '❌ Inte optimalt.'}
                                                </strong>
                                                <p style={{ margin: '5px 0 0 0' }}>
                                                    {choice.consequence}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '20px',
                        background: '#f8f9fa',
                        borderRadius: '8px' 
                    }}>
                        <p style={{ fontSize: '1.1rem', margin: 0 }}>
                            Information att tänka på för nästa steg.
                        </p>
                    </div>
                )}

                {step.explanation && selectedChoice !== -1 && (
                    <div style={{
                        marginTop: '20px',
                        padding: '15px',
                        background: '#f8f9fa',
                        borderRadius: '8px',
                        borderLeft: '4px solid #667eea'
                    }}>
                        <strong>💡 Förklaring:</strong> {step.explanation}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScenarioItem;