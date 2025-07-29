import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
    const location = useLocation();

    const navItems = [
        { path: '/dashboard', icon: '📊', label: 'Dashboard' },
        { path: '/training-areas', icon: '📚', label: 'Utbildningsområden' },
        { path: '/samband-quiz', icon: '📡', label: 'Sambandsquiz' },
        { path: '/leaderboard', icon: '🏆', label: 'Leaderboard' },
        { path: '/profile', icon: '👤', label: 'Profil' }
    ];

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        window.location.href = '/login';
    };

    return (
        <nav className="sidebar">
            <div className="sidebar-header">
                <span className="fire-icon">🔥</span>
                <h3>Brandman</h3>
            </div>
            <ul className="nav-menu">
                {navItems.map((item) => (
                    <li key={item.path}>
                        <Link 
                            to={item.path}
                            className={location.pathname === item.path ? 'active' : ''}
                        >
                            {item.icon} {item.label}
                            {item.path === '/samband-quiz' && <span className="new-badge">NYTT</span>}
                        </Link>
                    </li>
                ))}
                <li>
                    <button 
                        onClick={handleLogout}
                        className="logout"
                        style={{ 
                            background: 'none', 
                            border: 'none', 
                            width: '100%', 
                            textAlign: 'left',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '12px 20px',
                            color: 'rgba(255, 255, 255, 0.8)',
                            cursor: 'pointer',
                            marginTop: '20px',
                            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                            paddingTop: '15px'
                        }}
                    >
                        🚪 Logga ut
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;