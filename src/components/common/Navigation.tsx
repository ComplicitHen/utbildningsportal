import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
    const location = useLocation();

    const navItems = [
        { path: '/dashboard', icon: '📊', label: 'Dashboard' },
        { path: '/training-areas', icon: '📚', label: 'Utbildningsområden' },
        { path: '/leaderboard', icon: '🏆', label: 'Leaderboard' },
        { path: '/profile', icon: '👤', label: 'Profil' }
    ];

    return (
        <nav style={{
            background: 'white',
            width: '250px',
            minHeight: 'calc(100vh - 80px)',
            boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
            padding: '20px 0'
        }}>
            <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
            }}>
                {navItems.map((item) => (
                    <li key={item.path} style={{ margin: '5px 0' }}>
                        <Link 
                            to={item.path}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px 20px',
                                textDecoration: 'none',
                                color: location.pathname === item.path ? 'var(--primary-red)' : 'var(--black)',
                                background: location.pathname === item.path ? 'rgba(211, 47, 47, 0.1)' : 'transparent',
                                borderRight: location.pathname === item.path ? '3px solid var(--primary-red)' : 'none',
                                transition: 'all 0.3s ease',
                                fontSize: '1rem'
                            }}
                            onMouseOver={(e) => {
                                if (location.pathname !== item.path) {
                                    e.currentTarget.style.background = 'rgba(0,0,0,0.05)';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (location.pathname !== item.path) {
                                    e.currentTarget.style.background = 'transparent';
                                }
                            }}
                        >
                            <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navigation;