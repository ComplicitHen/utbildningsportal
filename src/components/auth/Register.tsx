import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/auth';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        
        if (password !== confirmPassword) {
            setError('Lösenorden matchar inte');
            return;
        }
        
        if (password.length < 6) {
            setError('Lösenordet måste vara minst 6 tecken');
            return;
        }
        
        setLoading(true);

        try {
            await registerUser(email, password, displayName);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Ett fel uppstod vid registreringen');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1 style={{ color: '#667eea', fontSize: '2.5rem' }}>🔥</h1>
                <h2 style={{ color: '#333', marginBottom: '10px' }}>Skapa konto</h2>
                <p style={{ color: '#666' }}>Registrera dig för att börja din brandmanutbildning</p>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Namn:</label>
                    <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        disabled={loading}
                        placeholder="Ditt namn"
                    />
                </div>
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
                        placeholder="Minst 6 tecken"
                        minLength={6}
                    />
                </div>
                <div className="form-group">
                    <label>Bekräfta lösenord:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={loading}
                        placeholder="Upprepa lösenordet"
                    />
                </div>
                <button type="submit" className="btn" disabled={loading}>
                    {loading ? 'Registrerar...' : 'Skapa konto'}
                </button>
            </form>
            
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p style={{ color: '#666' }}>
                    Har du redan ett konto? {' '}
                    <Link to="/login" style={{ color: '#667eea', textDecoration: 'none' }}>
                        Logga in här
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;