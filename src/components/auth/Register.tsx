import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/auth';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [serviceNumber, setServiceNumber] = useState('');
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
            await registerUser(email, password, displayName, serviceNumber);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Ett fel uppstod vid registreringen');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <div className="brand">
                        <div className="brand-icon">🔥</div>
                        <h1>Brandmanutbildning</h1>
                    </div>
                    <h2>Skapa nytt konto</h2>
                    <p>Registrera dig för att börja din brandmanutbildning</p>
                </div>
                
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="displayName">Namn</label>
                        <input
                            id="displayName"
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            disabled={loading}
                            placeholder="Ditt namn"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="serviceNumber">Tjänstenummer</label>
                        <input
                            id="serviceNumber"
                            type="text"
                            value={serviceNumber}
                            onChange={(e) => setServiceNumber(e.target.value)}
                            disabled={loading}
                            placeholder="Ex. 761"
                            pattern="[0-9]*"
                            title="Endast siffror tillåtna"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">E-postadress</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                            placeholder="din@email.com"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Lösenord</label>
                        <input
                            id="password"
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
                        <label htmlFor="confirmPassword">Bekräfta lösenord</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={loading}
                            placeholder="Upprepa lösenordet"
                        />
                    </div>
                    
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Registrerar...' : 'Skapa konto'}
                    </button>
                </form>
                
                <div className="login-footer">
                    <p>
                        Har du redan ett konto? <Link to="/login">Logga in här</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;