import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/common/Navigation';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './pages/Dashboard';
import TrainingAreas from './pages/TrainingAreas';
import Profile from './pages/Profile';
import Leaderboard from './components/leaderboard/Leaderboard';
import FlashcardDeck from './components/flashcards/FlashcardDeck';
import Quiz from './components/quiz/Quiz';
import SambandsQuiz from './components/quiz/SambandsQuiz';
import ScenarioTraining from './components/scenarios/ScenarioTraining';
import { onAuthStateChanged } from './services/auth';
import { User, AuthState } from './types';
import './App.css';

const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user: User | null) => {
      setAuthState({
        user,
        loading: false,
        error: null
      });
    });

    return () => unsubscribe();
  }, []);

  if (authState.loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">🔥</div>
        <p>Laddar...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        {authState.user && <Navigation />}
        <Routes>
          <Route 
            path="/" 
            element={authState.user ? <Navigate to="/dashboard" /> : <Login />} 
          />
          <Route 
            path="/login" 
            element={authState.user ? <Navigate to="/dashboard" /> : <Login />} 
          />
          <Route 
            path="/register" 
            element={authState.user ? <Navigate to="/dashboard" /> : <Register />} 
          />
          
          {/* Skyddade rutter */}
          <Route 
            path="/dashboard" 
            element={authState.user ? <Dashboard user={authState.user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/training-areas" 
            element={authState.user ? <TrainingAreas /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/leaderboard" 
            element={authState.user ? <Leaderboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/profile" 
            element={authState.user ? <Profile user={authState.user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/flashcards/:areaId/:deckId" 
            element={authState.user ? <FlashcardDeck user={authState.user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/quiz/:areaId/:quizId" 
            element={authState.user ? <Quiz user={authState.user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/scenarios/:areaId/:scenarioId" 
            element={authState.user ? <ScenarioTraining user={authState.user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/samband-quiz" 
            element={authState.user ? <SambandsQuiz /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;