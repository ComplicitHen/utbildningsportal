import React, { useState, useEffect } from 'react';
import { FirebaseService } from '../../services/firebaseService';
import { LeaderboardEntry } from '../../types';

const Leaderboard: React.FC = () => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [timeFrame, setTimeFrame] = useState<'all' | 'month' | 'week'>('all');

    useEffect(() => {
        loadLeaderboard();
    }, [timeFrame]);

    const loadLeaderboard = async () => {
        setLoading(true);
        try {
            const data = await FirebaseService.getLeaderboard(timeFrame);
            setLeaderboard(data);
        } catch (error) {
            console.error('Error loading leaderboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1: return '🥇';
            case 2: return '🥈';
            case 3: return '🥉';
            default: return `${rank}.`;
        }
    };

    const getTimeFrameText = () => {
        switch (timeFrame) {
            case 'week': return 'Denna vecka';
            case 'month': return 'Denna månad';
            default: return 'All-time';
        }
    };

    if (loading) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <div className="loading-spinner">📊</div>
                <p>Laddar leaderboard...</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                <h1 style={{ color: 'var(--black)', marginBottom: '10px' }}>
                    🏆 Leaderboard
                </h1>
                <p style={{ color: 'var(--dark-gray)' }}>
                    Bästa prestationer från våra brandmän
                </p>
            </div>

            {/* Tidsperiod väljare */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '10px', 
                marginBottom: '30px' 
            }}>
                {(['all', 'month', 'week'] as const).map((period) => (
                    <button
                        key={period}
                        onClick={() => setTimeFrame(period)}
                        className="btn"
                        style={{
                            background: timeFrame === period 
                                ? 'var(--primary-red)' 
                                : 'var(--medium-gray)',
                            padding: '8px 16px',
                            fontSize: '0.9rem'
                        }}
                    >
                        {period === 'all' ? 'All-time' : 
                         period === 'month' ? 'Månad' : 'Vecka'}
                    </button>
                ))}
            </div>

            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'var(--dark-gray)' }}>
                {getTimeFrameText()}
            </h2>

            {leaderboard.length === 0 ? (
                <div className="card" style={{ textAlign: 'center' }}>
                    <p style={{ color: 'var(--medium-gray)' }}>
                        Inga resultat finns ännu för denna period.
                    </p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {leaderboard.map((entry, index) => (
                        <div 
                            key={entry.userId}
                            className="card"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '20px',
                                padding: '20px',
                                background: index < 3 
                                    ? `linear-gradient(135deg, ${
                                        index === 0 ? '#ffd700, #ffed4e' :
                                        index === 1 ? '#c0c0c0, #e8e8e8' :
                                        '#cd7f32, #daa520'
                                    })` 
                                    : 'var(--white)',
                                color: index < 3 ? 'var(--black)' : 'inherit',
                                border: index < 3 ? '2px solid var(--primary-red)' : undefined
                            }}
                        >
                            {/* Rank */}
                            <div style={{ 
                                fontSize: '1.5rem', 
                                fontWeight: 'bold',
                                minWidth: '50px',
                                textAlign: 'center'
                            }}>
                                {getRankIcon(index + 1)}
                            </div>

                            {/* Användarinfo */}
                            <div style={{ flex: 1 }}>
                                <h3 style={{ margin: '0 0 5px 0' }}>
                                    {entry.userDisplayName}
                                </h3>
                                <p style={{ 
                                    margin: 0, 
                                    color: index < 3 ? 'rgba(0,0,0,0.7)' : 'var(--medium-gray)',
                                    fontSize: '0.9rem'
                                }}>
                                    Tjänstenummer: {entry.serviceNumber}
                                </p>
                            </div>

                            {/* Statistik */}
                            <div style={{ 
                                display: 'grid', 
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '20px',
                                textAlign: 'center',
                                minWidth: '300px'
                            }}>
                                <div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                                        {entry.totalScore}
                                    </div>
                                    <div style={{ 
                                        fontSize: '0.8rem', 
                                        color: index < 3 ? 'rgba(0,0,0,0.7)' : 'var(--medium-gray)'
                                    }}>
                                        Totalpoäng
                                    </div>
                                </div>
                                
                                <div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                                        {entry.completedQuizzes}
                                    </div>
                                    <div style={{ 
                                        fontSize: '0.8rem', 
                                        color: index < 3 ? 'rgba(0,0,0,0.7)' : 'var(--medium-gray)'
                                    }}>
                                        Quiz
                                    </div>
                                </div>
                                
                                <div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                                        {Math.round(entry.averageScore)}%
                                    </div>
                                    <div style={{ 
                                        fontSize: '0.8rem', 
                                        color: index < 3 ? 'rgba(0,0,0,0.7)' : 'var(--medium-gray)'
                                    }}>
                                        Snitt
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Info om poängsystem */}
            <div className="card" style={{ marginTop: '30px', textAlign: 'center' }}>
                <h3 style={{ marginBottom: '15px' }}>📈 Hur fungerar poängsystemet?</h3>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '15px',
                    textAlign: 'left'
                }}>
                    <div>
                        <strong>Poäng per quiz:</strong><br />
                        Antal rätta svar × frågans svårighetsgrad
                    </div>
                    <div>
                        <strong>Svårighetsgrader:</strong><br />
                        Lätt: 1p | Medium: 2p | Svår: 3p
                    </div>
                    <div>
                        <strong>Uppdatering:</strong><br />
                        Leaderboard uppdateras i realtid
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
