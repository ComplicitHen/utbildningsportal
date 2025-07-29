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
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <div className="logo">
                        <span className="fire-icon">🔥</span>
                        <h1>Brandmannutbildning</h1>
                    </div>
                    <p className="subtitle">RSG - Räddningstjänsten Storgöteborg</p>
                </div>

                <div className="login-forms">
                    <div className="form-container active">
                        <h2>Logga in</h2>
                        {error && <div className="error-message">{error}</div>}
                        
                        <form onSubmit={handleLogin}>
                            <div className="input-group">
                                <label htmlFor="email">E-postadress</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="password">Lösenord</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <button type="submit" className="btn-primary" disabled={loading}>
                                {loading ? 'Loggar in...' : 'Logga in'}
                            </button>
                        </form>
                        
                        <p className="form-switch">
                            Har du inget konto? {' '}
                            <Link to="/register">Registrera dig här</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;