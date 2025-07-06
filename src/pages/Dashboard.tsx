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
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '30px' }}>
                <h1 style={{ color: '#333', marginBottom: '10px' }}>
                    Välkommen tillbaka, {user.displayName || user.email}! 🔥
                </h1>
                <p style={{ color: '#666', fontSize: '1.1rem' }}>
                    Fortsätt din brandmansutbildning där du slutade.
                </p>
            </div>

            {/* Snabbstatistik */}
            <div className="grid" style={{ marginBottom: '40px' }}>
                <div className="card" style={{ background: 'linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)', color: 'white' }}>
                    <h3 style={{ margin: '0 0 10px 0' }}>📊 Din progress</h3>
                    <p style={{ fontSize: '2rem', margin: '10px 0' }}>
                        {user.completedQuizzes?.length || 0}
                    </p>
                    <p style={{ margin: 0, opacity: 0.9 }}>Genomförda quiz</p>
                </div>
                
                <div className="card" style={{ background: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)', color: 'white' }}>
                    <h3 style={{ margin: '0 0 10px 0' }}>🎯 Aktivitet</h3>
                    <p style={{ fontSize: '2rem', margin: '10px 0' }}>
                        {recentActivity.length}
                    </p>
                    <p style={{ margin: 0, opacity: 0.9 }}>Aktiva områden</p>
                </div>
            </div>

            {/* Utbildningsområden */}
            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ color: '#333', marginBottom: '20px' }}>🏫 Utbildningsområden</h2>
                <div className="grid">
                    {trainingAreas.map((area) => (
                        <Link 
                            key={area.id} 
                            to={`/training-areas`}
                            style={{ textDecoration: 'none' }}
                        >
                            <div className="card" style={{ height: '100%' }}>
                                <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '15px' }}>
                                    {area.icon}
                                </div>
                                <h3 className="card-title" style={{ textAlign: 'center' }}>
                                    {area.name}
                                </h3>
                                <p className="card-description" style={{ textAlign: 'center' }}>
                                    {area.description}
                                </p>
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-around', 
                                    marginTop: '15px',
                                    fontSize: '0.9rem',
                                    color: '#666'
                                }}>
                                    <span>📚 {area.flashcardDecks.length} Kortlekar</span>
                                    <span>🧪 {area.quizzes.length} Quiz</span>
                                    <span>🎭 {area.scenarios.length} Scenarios</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Snabblänkar */}
            <div>
                <h2 style={{ color: '#333', marginBottom: '20px' }}>🚀 Snabblänkar</h2>
                <div className="grid">
                    <Link to="/training-areas" style={{ textDecoration: 'none' }}>
                        <div className="card" style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📚</div>
                            <h3>Alla utbildningsområden</h3>
                            <p style={{ color: '#666' }}>Bläddra bland alla tillgängliga kurser</p>
                        </div>
                    </Link>
                    
                    <Link to="/leaderboard" style={{ textDecoration: 'none' }}>
                        <div className="card" style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🏆</div>
                            <h3>Leaderboard</h3>
                            <p style={{ color: '#666' }}>Se vem som presterar bäst</p>
                        </div>
                    </Link>
                    
                    <Link to="/profile" style={{ textDecoration: 'none' }}>
                        <div className="card" style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>👤</div>
                            <h3>Min profil</h3>
                            <p style={{ color: '#666' }}>Se din progress och uppdatera inställningar</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;