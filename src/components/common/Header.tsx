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
        <header className="header">
            <div className="header-brand">
                <span className="header-icon">🔥</span>
                <h1 className="header-title">Brandmansutbildning</h1>
            </div>
            
            <div className="header-user">
                <span className="header-welcome">
                    Välkommen, {user.displayName || user.email}!
                </span>
                <button 
                    onClick={handleLogout}
                    className="btn btn-outline header-logout"
                >
                    Logga ut
                </button>
            </div>
        </header>
    );
};

export default Header;