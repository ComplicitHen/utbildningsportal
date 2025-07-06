export interface User {
    id: string;
    email: string;
    displayName?: string;
    serviceNumber?: string; // Tjänstenummer (ex. 761)
    role?: 'student' | 'instructor' | 'admin';
    completedQuizzes?: string[];
    progress?: UserProgress;
    quizSettings?: QuizSettings;
    lastActivity?: Date;
}

export interface QuizSettings {
    preferredQuestionCount: number;
}

export interface UserProgress {
    [trainingAreaId: string]: {
        completedQuizzes: string[];
        completedScenarios: string[];
        flashcardProgress: { [deckId: string]: number };
        totalScore: number;
        lastActivity: Date;
    };
}

export interface Flashcard {
    id: string;
    question: string;
    answer: string;
    category: string;
    difficulty: 'easy' | 'medium' | 'hard';
    image?: string;
}

export interface FlashcardDeck {
    id: string;
    title: string;
    description: string;
    category: TrainingCategory;
    cards: Flashcard[];
    difficulty: 'easy' | 'medium' | 'hard';
}

export interface Quiz {
    id: string;
    title: string;
    description: string;
    category: TrainingCategory;
    questions: QuizQuestion[];
    timeLimit?: number; // i minuter
    passingScore: number; // procent
    difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number; // index för rätt svar
    explanation?: string;
    image?: string;
}

export interface QuizResult {
    id: string;
    userId: string;
    userServiceNumber?: string;
    userDisplayName?: string;
    quizId: string;
    score: number;
    totalQuestions: number;
    answers: { questionId: string; selectedAnswer: number; correct: boolean }[];
    completedAt: Date;
    timeSpent: number; // i sekunder
}

export interface LeaderboardEntry {
    userId: string;
    userDisplayName: string;
    serviceNumber: string;
    totalScore: number;
    completedQuizzes: number;
    averageScore: number;
    lastActivity: Date;
}

export interface Scenario {
    id: string;
    title: string;
    description: string;
    category: TrainingCategory;
    situation: string;
    steps: ScenarioStep[];
    difficulty: 'easy' | 'medium' | 'hard';
    estimatedTime: number; // i minuter
}

export interface ScenarioStep {
    id: string;
    instruction: string;
    choices?: ScenarioChoice[];
    correctChoice?: number;
    explanation?: string;
    image?: string;
}

export interface ScenarioChoice {
    text: string;
    consequence: string;
    isCorrect: boolean;
}

export interface TrainingArea {
    id: string;
    name: string;
    description: string;
    category: TrainingCategory;
    icon: string;
    flashcardDecks: FlashcardDeck[];
    quizzes: Quiz[];
    scenarios: Scenario[];
}

export type TrainingCategory = 
    | 'brandkunskap'
    | 'fordonskännedom' 
    | 'radiokunskap'
    | 'sjukvård'
    | 'räddningstjänst'
    | 'kemikalier'
    | 'säkerhet'
    | 'ledarskap';

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}