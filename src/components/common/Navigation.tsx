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

    return (
        <nav className="navigation">
            <ul className="nav-list">
                {navItems.map((item) => (
                    <li key={item.path} className="nav-item">
                        <Link 
                            to={item.path}
                            className={`nav-link ${location.pathname === item.path ? 'nav-link-active' : ''}`}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navigation;