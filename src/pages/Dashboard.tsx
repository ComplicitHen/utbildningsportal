import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';
import { DataService } from '../services/dataService';

interface DashboardProps {
    user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
    const trainingAreas = DataService.getAllTrainingAreas();
    const recentActivity = user.progress ? Object.keys(user.progress).slice(0, 3) : [];

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">
                    Välkommen tillbaka, {user.displayName || user.email}! 🔥
                </h1>
                <p className="page-subtitle">
                    Fortsätt din brandmansutbildning där du slutade.
                </p>
            </div>

            {/* Snabbstatistik */}
            <div className="grid" style={{ marginBottom: '40px' }}>
                <div className="card stat-card stat-card-danger">
                    <div className="stat-icon-large">📊</div>
                    <h3 className="stat-title">Din progress</h3>
                    <div className="stat-number">
                        {user.completedQuizzes?.length || 0}
                    </div>
                    <p className="stat-description">Genomförda quiz</p>
                </div>
                
                <div className="card stat-card stat-card-success">
                    <div className="stat-icon-large">🎯</div>
                    <h3 className="stat-title">Aktivitet</h3>
                    <div className="stat-number">
                        {recentActivity.length}
                    </div>
                    <p className="stat-description">Aktiva områden</p>
                </div>
            </div>

            {/* Utbildningsområden */}
            <div className="section">
                <h2 className="section-title">🏫 Utbildningsområden</h2>
                <div className="grid">
                    {trainingAreas.map((area) => (
                        <Link 
                            key={area.id} 
                            to={`/training-areas`}
                            className="card-link"
                        >
                            <div className="card">
                                <div className="card-icon-large">
                                    {area.icon}
                                </div>
                                <h3 className="card-title">
                                    {area.name}
                                </h3>
                                <p className="card-description">
                                    {area.description}
                                </p>
                                <div className="card-stats">
                                    <div className="stat-item">
                                        <span className="stat-icon">📚</span>
                                        <span>{area.flashcardDecks.length} Kortlekar</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-icon">🧪</span>
                                        <span>{area.quizzes.length} Quiz</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-icon">🎭</span>
                                        <span>{area.scenarios.length} Scenarios</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Snabblänkar */}
            <div className="section">
                <h2 className="section-title">🚀 Snabblänkar</h2>
                <div className="grid">
                    <Link to="/training-areas" className="card-link">
                        <div className="card quick-link-card">
                            <div className="card-icon-large">📚</div>
                            <h3 className="card-title">Alla utbildningsområden</h3>
                            <p className="card-description">Bläddra bland alla tillgängliga kurser</p>
                        </div>
                    </Link>
                    
                    <Link to="/samband-quiz" className="card-link">
                        <div className="card quick-link-card featured-link">
                            <div className="card-icon-large">📡</div>
                            <h3 className="card-title">Sambandsquiz</h3>
                            <p className="card-description">Träna samband med anpassningsbara quiz</p>
                            <span className="new-badge">NYTT</span>
                        </div>
                    </Link>
                    
                    <Link to="/leaderboard" className="card-link">
                        <div className="card quick-link-card">
                            <div className="card-icon-large">🏆</div>
                            <h3 className="card-title">Leaderboard</h3>
                            <p className="card-description">Se vem som presterar bäst</p>
                        </div>
                    </Link>
                    
                    <Link to="/profile" className="card-link">
                        <div className="card quick-link-card">
                            <div className="card-icon-large">👤</div>
                            <h3 className="card-title">Min profil</h3>
                            <p className="card-description">Se din progress och uppdatera inställningar</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;