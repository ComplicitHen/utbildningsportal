import React from 'react';
import { User } from '../types';

interface ProfileProps {
    user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
    const getProgressPercentage = () => {
        if (!user.progress) return 0;
        const areas = Object.keys(user.progress);
        if (areas.length === 0) return 0;
        
        const totalProgress = areas.reduce((sum, areaId) => {
            const areaProgress = user.progress![areaId];
            return sum + areaProgress.completedQuizzes.length + areaProgress.completedScenarios.length;
        }, 0);
        
        return Math.min(100, (totalProgress / areas.length) * 10);
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '30px' }}>
                <h1 style={{ color: '#333', marginBottom: '10px' }}>👤 Min profil</h1>
                <p style={{ color: '#666', fontSize: '1.1rem' }}>
                    Hantera ditt konto och se din utbildningsprogress.
                </p>
            </div>

            <div className="grid">
                {/* Användarinfo */}
                <div className="card">
                    <h3 className="card-title">📋 Kontoinformation</h3>
                    <div style={{ marginBottom: '15px' }}>
                        <strong>Namn:</strong> {user.displayName || 'Inte angivet'}
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <strong>E-post:</strong> {user.email}
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <strong>Roll:</strong> {user.role === 'student' ? 'Elev' : user.role === 'instructor' ? 'Instruktör' : 'Administratör'}
                    </div>
                    <div>
                        <strong>Medlem sedan:</strong> Nyligen
                    </div>
                </div>

                {/* Progress översikt */}
                <div className="card">
                    <h3 className="card-title">📊 Utbildningsprogress</h3>
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <span>Övergripande progress</span>
                            <span>{Math.round(getProgressPercentage())}%</span>
                        </div>
                        <div style={{
                            background: '#e1e5e9',
                            height: '10px',
                            borderRadius: '5px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                height: '100%',
                                width: `${getProgressPercentage()}%`,
                                transition: 'width 0.3s ease'
                            }} />
                        </div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                        <div style={{ textAlign: 'center', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                            <div style={{ fontSize: '2rem', color: '#667eea' }}>
                                {user.completedQuizzes?.length || 0}
                            </div>
                            <div style={{ fontSize: '0.9rem', color: '#666' }}>Genomförda quiz</div>
                        </div>
                        <div style={{ textAlign: 'center', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                            <div style={{ fontSize: '2rem', color: '#28a745' }}>
                                {user.progress ? Object.keys(user.progress).length : 0}
                            </div>
                            <div style={{ fontSize: '0.9rem', color: '#666' }}>Aktiva områden</div>
                        </div>
                    </div>
                </div>

                {/* Senaste aktivitet */}
                <div className="card">
                    <h3 className="card-title">🕒 Senaste aktivitet</h3>
                    {user.progress && Object.keys(user.progress).length > 0 ? (
                        <div>
                            {Object.entries(user.progress).slice(0, 3).map(([areaId, progress]) => (
                                <div key={areaId} style={{ 
                                    padding: '10px', 
                                    borderBottom: areaId === Object.keys(user.progress!)[Object.keys(user.progress!).length - 1] ? 'none' : '1px solid #e1e5e9'
                                }}>
                                    <div style={{ fontWeight: '600', color: '#333' }}>
                                        {areaId.charAt(0).toUpperCase() + areaId.slice(1)}
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                                        {progress.completedQuizzes.length} quiz, {progress.completedScenarios.length} scenarios
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: '#666', fontStyle: 'italic' }}>
                            Ingen aktivitet ännu. Börja med att välja ett utbildningsområde!
                        </p>
                    )}
                </div>

                {/* Inställningar */}
                <div className="card">
                    <h3 className="card-title">⚙️ Inställningar</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                            ✏️ Redigera profil
                        </button>
                        <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                            🔒 Ändra lösenord
                        </button>
                        <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                            📊 Exportera progress
                        </button>
                        <button className="btn btn-danger" style={{ justifyContent: 'flex-start' }}>
                            🗑️ Ta bort konto
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;