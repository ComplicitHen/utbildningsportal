import React, { useState, useEffect } from 'react';
import { 
  SambandsQuizService, 
  SambandsDifficulty, 
  SambandsQuizSettings, 
  SambandsQuizResult 
} from '../../services/sambandsQuizService';
import { SambandsQuizQuestion } from '../../data/sambandsQuizGenerator';

const SambandsQuiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'settings' | 'quiz' | 'results'>('settings');
  const [settings, setSettings] = useState<SambandsQuizSettings>({
    difficulty: 'easy',
    questionCount: 10
  });
  const [questions, setQuestions] = useState<SambandsQuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizResult, setQuizResult] = useState<SambandsQuizResult | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Hämta metadata om quiz
  const quizMetadata = SambandsQuizService.getQuizMetadata();

  const handleStartQuiz = () => {
    const validationError = SambandsQuizService.validateSettings(settings);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    const generatedQuestions = SambandsQuizService.generateQuiz(settings);
    setQuestions(generatedQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setStartTime(new Date());
    setCurrentStep('quiz');
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      finishQuiz(newAnswers);
    }
  };

  const handleShowExplanation = () => {
    setShowExplanation(true);
  };

  const finishQuiz = (answers: number[]) => {
    if (!startTime) return;

    const score = answers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);

    const endTime = new Date();
    const timeSpent = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
    const percentage = Math.round((score / questions.length) * 100);

    const result: SambandsQuizResult = {
      score,
      totalQuestions: questions.length,
      percentage,
      difficulty: settings.difficulty,
      completedAt: endTime,
      timeSpent
    };

    SambandsQuizService.saveQuizResult(result);
    setQuizResult(result);
    setCurrentStep('results');
  };

  const handleRestart = () => {
    setCurrentStep('settings');
    setQuizResult(null);
    setStartTime(null);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (percentage: number): string => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-danger';
  };

  // Settings Step
  if (currentStep === 'settings') {
    return (
      <div className="samband-quiz-container">
        <div className="card modern-card">
          <div className="card-header">
            <h2 className="card-title">
              <i className="fas fa-radio" style={{ marginRight: '8px' }}></i>
              Sambandsquiz
            </h2>
            <p className="card-subtitle">
              Testa dina kunskaper om samband vid räddningsinsats
            </p>
          </div>

          <div className="card-body">
            <div className="quiz-settings">
              <div className="setting-group">
                <label className="setting-label">
                  <i className="fas fa-chart-line" style={{ marginRight: '8px' }}></i>
                  Svårighetsgrad
                </label>
                <div className="difficulty-options">
                  {(['easy', 'advanced', 'expert'] as SambandsDifficulty[]).map(difficulty => (
                    <button
                      key={difficulty}
                      className={`difficulty-btn ${settings.difficulty === difficulty ? 'active' : ''}`}
                      onClick={() => setSettings({ ...settings, difficulty })}
                    >
                      <div className="difficulty-label">
                        {SambandsQuizService.getDifficultyLabel(difficulty)}
                      </div>
                      <div className="difficulty-description">
                        {SambandsQuizService.getDifficultyDescription(difficulty)}
                      </div>
                      <div className="difficulty-count">
                        {SambandsQuizService.getMaxQuestionsForDifficulty(difficulty)} frågor
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="setting-group">
                <label className="setting-label">
                  <i className="fas fa-list-ol" style={{ marginRight: '8px' }}></i>
                  Antal frågor
                </label>
                <div className="question-count-container">
                  <input
                    type="range"
                    min="1"
                    max={SambandsQuizService.getMaxQuestionsForDifficulty(settings.difficulty)}
                    value={settings.questionCount}
                    onChange={(e) => setSettings({ ...settings, questionCount: parseInt(e.target.value) })}
                    className="question-count-slider"
                  />
                  <div className="question-count-display">
                    {settings.questionCount} frågor
                  </div>
                </div>
              </div>

              {error && (
                <div className="error-message">
                  <i className="fas fa-exclamation-triangle" style={{ marginRight: '8px' }}></i>
                  {error}
                </div>
              )}

              <button
                className="btn btn-primary start-quiz-btn"
                onClick={handleStartQuiz}
              >
                <i className="fas fa-play" style={{ marginRight: '8px' }}></i>
                Starta Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Step
  if (currentStep === 'quiz' && questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
      <div className="samband-quiz-container">
        <div className="card modern-card">
          <div className="card-header">
            <div className="quiz-progress-header">
              <h3 className="quiz-title">
                {SambandsQuizService.getDifficultyLabel(settings.difficulty)} - 
                Fråga {currentQuestionIndex + 1} av {questions.length}
              </h3>
              <div className="quiz-progress-bar">
                <div 
                  className="quiz-progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="question-container">
              <div className="question-category">
                <i className="fas fa-tag" style={{ marginRight: '4px' }}></i>
                {currentQuestion.category}
              </div>
              
              <h4 className="question-text">
                {currentQuestion.question}
              </h4>

              <div className="answers-container">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    className={`answer-btn ${
                      selectedAnswer === index ? 'selected' : ''
                    } ${
                      showExplanation ? 
                        (index === currentQuestion.correctAnswer ? 'correct' : 
                         selectedAnswer === index ? 'incorrect' : '') : ''
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showExplanation}
                  >
                    <span className="answer-letter">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="answer-text">{option}</span>
                  </button>
                ))}
              </div>

              {showExplanation && (
                <div className="explanation-container">
                  <div className="explanation-header">
                    <i className="fas fa-info-circle" style={{ marginRight: '8px' }}></i>
                    Förklaring
                  </div>
                  <p className="explanation-text">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}

              <div className="quiz-actions">
                {selectedAnswer !== null && !showExplanation && (
                  <button
                    className="btn btn-secondary"
                    onClick={handleShowExplanation}
                  >
                    <i className="fas fa-lightbulb" style={{ marginRight: '8px' }}></i>
                    Visa förklaring
                  </button>
                )}
                
                {selectedAnswer !== null && (
                  <button
                    className="btn btn-primary"
                    onClick={handleNextQuestion}
                  >
                    {currentQuestionIndex < questions.length - 1 ? 
                      <>
                        <i className="fas fa-arrow-right" style={{ marginRight: '8px' }}></i>
                        Nästa fråga
                      </> : 
                      <>
                        <i className="fas fa-check" style={{ marginRight: '8px' }}></i>
                        Avsluta quiz
                      </>
                    }
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results Step
  if (currentStep === 'results' && quizResult) {
    return (
      <div className="samband-quiz-container">
        <div className="card modern-card">
          <div className="card-header">
            <h2 className="card-title">
              <i className="fas fa-trophy" style={{ marginRight: '8px' }}></i>
              Quiz Slutförd!
            </h2>
          </div>

          <div className="card-body">
            <div className="results-container">
              <div className="score-summary">
                <div className={`score-display ${getScoreColor(quizResult.percentage)}`}>
                  {quizResult.score} / {quizResult.totalQuestions}
                </div>
                <div className={`percentage-display ${getScoreColor(quizResult.percentage)}`}>
                  {quizResult.percentage}%
                </div>
              </div>

              <div className="result-details">
                <div className="result-item">
                  <span className="result-label">Svårighetsgrad:</span>
                  <span className="result-value">
                    {SambandsQuizService.getDifficultyLabel(quizResult.difficulty)}
                  </span>
                </div>
                <div className="result-item">
                  <span className="result-label">Tid:</span>
                  <span className="result-value">{formatTime(quizResult.timeSpent)}</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Genomsnittlig tid per fråga:</span>
                  <span className="result-value">
                    {formatTime(Math.round(quizResult.timeSpent / quizResult.totalQuestions))}
                  </span>
                </div>
              </div>

              <div className="performance-feedback">
                {quizResult.percentage >= 90 && (
                  <div className="feedback excellent">
                    <i className="fas fa-star" style={{ marginRight: '8px' }}></i>
                    Excellent! Du behärskar samband mycket bra!
                  </div>
                )}
                {quizResult.percentage >= 70 && quizResult.percentage < 90 && (
                  <div className="feedback good">
                    <i className="fas fa-thumbs-up" style={{ marginRight: '8px' }}></i>
                    Bra jobbat! Du har god kunskap om samband.
                  </div>
                )}
                {quizResult.percentage >= 50 && quizResult.percentage < 70 && (
                  <div className="feedback okay">
                    <i className="fas fa-book" style={{ marginRight: '8px' }}></i>
                    Okej resultat. Repetera materialet och försök igen.
                  </div>
                )}
                {quizResult.percentage < 50 && (
                  <div className="feedback poor">
                    <i className="fas fa-study" style={{ marginRight: '8px' }}></i>
                    Studera materialet mer grundligt och försök igen.
                  </div>
                )}
              </div>

              <div className="result-actions">
                <button
                  className="btn btn-secondary"
                  onClick={handleRestart}
                >
                  <i className="fas fa-redo" style={{ marginRight: '8px' }}></i>
                  Nytt Quiz
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => window.location.href = '/training-areas'}
                >
                  <i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i>
                  Tillbaka till Träning
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SambandsQuiz;
