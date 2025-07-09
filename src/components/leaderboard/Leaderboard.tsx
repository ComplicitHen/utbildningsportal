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
            <div className="page-container">
                <div className="loading-state">
                    <div className="loading-spinner">📊</div>
                    <p>Laddar leaderboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="page-header">
                <h1 className="page-title">
                    🏆 Leaderboard
                </h1>
                <p className="page-subtitle">
                    Bästa prestationer från våra brandmän
                </p>
            </div>

            {/* Tidsperiod väljare */}
            <div className="filter-section">
                <div className="filter-buttons">
                    {(['all', 'month', 'week'] as const).map((period) => (
                        <button
                            key={period}
                            onClick={() => setTimeFrame(period)}
                            className={`category-btn ${timeFrame === period ? 'active' : ''}`}
                        >
                            {period === 'all' ? 'All-time' : 
                             period === 'month' ? 'Månad' : 'Vecka'}
                        </button>
                    ))}
                </div>
            </div>

            <h2 className="section-title" style={{ textAlign: 'center' }}>
                {getTimeFrameText()}
            </h2>

            {leaderboard.length === 0 ? (
                <div className="card empty-state">
                    <p>Inga resultat finns ännu för denna period.</p>
                </div>
            ) : (
                <div className="leaderboard-list">
                    {leaderboard.map((entry, index) => (
                        <div 
                            key={entry.userId}
                            className={`card leaderboard-entry ${index < 3 ? 'leaderboard-podium' : ''}`}
                            data-rank={index + 1}
                        >
                            {/* Rank */}
                            <div className="leaderboard-rank">
                                {getRankIcon(index + 1)}
                            </div>

                            {/* Användarinfo */}
                            <div className="leaderboard-user">
                                <h3 className="leaderboard-name">
                                    {entry.userDisplayName}
                                </h3>
                                <p className="leaderboard-service">
                                    Tjänstenummer: {entry.serviceNumber}
                                </p>
                            </div>

                            {/* Statistik */}
                            <div className="leaderboard-stats">
                                <div className="leaderboard-stat">
                                    <div className="stat-value">
                                        {entry.totalScore}
                                    </div>
                                    <div className="stat-label">
                                        Totalpoäng
                                    </div>
                                </div>
                                
                                <div className="leaderboard-stat">
                                    <div className="stat-value">
                                        {entry.completedQuizzes}
                                    </div>
                                    <div className="stat-label">
                                        Quiz
                                    </div>
                                </div>
                                
                                <div className="leaderboard-stat">
                                    <div className="stat-value">
                                        {Math.round(entry.averageScore)}%
                                    </div>
                                    <div className="stat-label">
                                        Snitt
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Info om poängsystem */}
            <div className="card info-card">
                <h3 className="info-title">📈 Hur fungerar poängsystemet?</h3>
                <div className="info-grid">
                    <div className="info-item">
                        <strong>Poäng per quiz:</strong><br />
                        Antal rätta svar × frågans svårighetsgrad
                    </div>
                    <div className="info-item">
                        <strong>Svårighetsgrader:</strong><br />
                        Lätt: 1p | Medium: 2p | Svår: 3p
                    </div>
                    <div className="info-item">
                        <strong>Uppdatering:</strong><br />
                        Leaderboard uppdateras i realtid
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
