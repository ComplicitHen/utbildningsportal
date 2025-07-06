import React from 'react';
import { logoutUser } from '../../services/auth';
import { User } from '../../types';

interface HeaderProps {
    user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <header style={{
            background: 'linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)',
            color: 'white',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '2rem' }}>🔥</span>
                <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Brandmansutbildning</h1>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                    Välkommen, {user.displayName || user.email}!
                </span>
                <button 
                    onClick={handleLogout}
                    style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        padding: '8px 16px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        transition: 'background 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                >
                    Logga ut
                </button>
            </div>
        </header>
    );
};

export default Header;