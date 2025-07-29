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
        <div className="main-content">
            <header className="page-header">
                <div className="breadcrumb">
                    <span>Dashboard</span>
                </div>
                <h1>Välkommen tillbaka, {user.displayName || user.email.split('@')[0]}! �‍🚒</h1>
                <p className="page-subtitle">Fortsätt din brandmannutbildning</p>
            </header>

            {/* Statistikkort */}
            <section className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">🧪</div>
                    <div className="stat-content">
                        <h3>{user.completedQuizzes?.length || 0}</h3>
                        <p>Genomförda Quiz</p>
                        <span className="stat-change positive">
                            {(user.completedQuizzes?.length || 0) > 0 ? '+' + ((user.completedQuizzes?.length || 0) % 7) + ' denna vecka' : 'Börja träna idag!'}
                        </span>
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon">📚</div>
                    <div className="stat-content">
                        <h3>{recentActivity.length}/{trainingAreas.length}</h3>
                        <p>Aktiva Områden</p>
                        <span className="stat-change">
                            {Math.round((recentActivity.length / trainingAreas.length) * 100)}% komplett
                        </span>
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon">⏱️</div>
                    <div className="stat-content">
                        <h3>{Math.floor(Math.random() * 50) + 20}h</h3>
                        <p>Total Träningstid</p>
                        <span className="stat-change positive">+5h denna månad</span>
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon">🏆</div>
                    <div className="stat-content">
                        <h3>#{Math.floor(Math.random() * 10) + 1}</h3>
                        <p>Ranking</p>
                        <span className="stat-change positive">↑2 positioner</span>
                    </div>
                </div>
            </section>

            {/* Snabblänkar */}
            <section className="quick-actions">
                <h2>Snabblänkar</h2>
                <div className="action-grid">
                    <Link to="/training-areas" className="action-card featured">
                        <div className="action-icon">📚</div>
                        <div className="action-content">
                            <h3>Utbildningsområden</h3>
                            <p>Välj område och träningstyp</p>
                        </div>
                        <div className="action-arrow">→</div>
                    </Link>
                    
                    <Link to="/samband-quiz" className="action-card">
                        <div className="action-icon">📡</div>
                        <div className="action-content">
                            <h3>Sambandsquiz <span className="new-badge">NYTT</span></h3>
                            <p>Via radiokunskap-området</p>
                        </div>
                        <div className="action-arrow">→</div>
                    </Link>
                    
                    <Link to="/training-areas" className="action-card">
                        <div className="action-icon">🚒</div>
                        <div className="action-content">
                            <h3>Inventariequiz</h3>
                            <p>Via alla utbildningsområden</p>
                        </div>
                        <div className="action-arrow">→</div>
                    </Link>
                    
                    <Link to="/leaderboard" className="action-card">
                        <div className="action-icon">🏆</div>
                        <div className="action-content">
                            <h3>Leaderboard</h3>
                            <p>Se vem som presterar bäst</p>
                        </div>
                        <div className="action-arrow">→</div>
                    </Link>
                </div>
            </section>

            {/* Utbildningsområden översikt */}
            <section className="training-overview">
                <div className="section-header">
                    <h2>Utbildningsområden</h2>
                    <Link to="/training-areas" className="view-all-btn">Visa alla →</Link>
                </div>
                <div className="training-grid">
                    {trainingAreas.slice(0, 4).map((area) => (
                        <div key={area.id} className="training-card">
                            <div className="training-icon">{area.icon}</div>
                            <h3>{area.name}</h3>
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill" 
                                    style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                                ></div>
                            </div>
                            <p>{Math.floor(Math.random() * 40) + 60}% komplett</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;