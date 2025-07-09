import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, onAuthStateChanged } from '../../services/auth';
import { User } from '../../types';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Lyssna på auth-state ändringar för att navigera när användaren är inloggad
    useEffect(() => {
        const unsubscribe = onAuthStateChanged((user: User | null) => {
            if (user && !loading) {
                // Om användaren är inloggad och vi inte håller på att logga in, navigera till dashboard
                navigate('/dashboard');
            }
        });

        return () => unsubscribe();
    }, [navigate, loading]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            await loginUser(email, password);
            // Ta bort direkt navigering - låt auth-state listener hantera det
            // navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Felaktig e-post eller lösenord');
            setLoading(false);
        }
        // Loading state kommer att sättas till false av auth-state listener
    };

    return (
        <div className="form-container">
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1 style={{ color: '#667eea', fontSize: '2.5rem' }}>🔥</h1>
                <h2 style={{ color: '#333', marginBottom: '10px' }}>Brandmannutbildning</h2>
                <p style={{ color: '#666' }}>Logga in för att fortsätta din utbildning</p>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>E-post:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        placeholder="din@email.com"
                    />
                </div>
                <div className="form-group">
                    <label>Lösenord:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                        placeholder="Ditt lösenord"
                    />
                </div>
                <button type="submit" className="btn" disabled={loading}>
                    {loading ? 'Loggar in...' : 'Logga in'}
                </button>
            </form>
            
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p style={{ color: '#666' }}>
                    Har du inget konto? {' '}
                    <Link to="/register" style={{ color: '#667eea', textDecoration: 'none' }}>
                        Registrera dig här
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;