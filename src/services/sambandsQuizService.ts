import { 
  generateSambandsQuiz, 
  SambandsQuizQuestion, 
  getSambandsQuizStats 
} from '../data/sambandsQuizGenerator';

export type SambandsDifficulty = 'easy' | 'advanced' | 'expert';

export interface SambandsQuizSettings {
  difficulty: SambandsDifficulty;
  questionCount: number;
}

export interface SambandsQuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  difficulty: SambandsDifficulty;
  completedAt: Date;
  timeSpent: number; // i sekunder
}

export class SambandsQuizService {
  private static readonly STORAGE_KEY = 'sambandsQuizResults';
  private static readonly MAX_QUESTIONS_PER_DIFFICULTY = {
    easy: 30,
    advanced: 30,
    expert: 30
  };

  /**
   * Genererar ett nytt sambandsquiz baserat på inställningar
   */
  static generateQuiz(settings: SambandsQuizSettings): SambandsQuizQuestion[] {
    const maxQuestions = this.MAX_QUESTIONS_PER_DIFFICULTY[settings.difficulty];
    const questionCount = Math.min(settings.questionCount, maxQuestions);
    
    return generateSambandsQuiz(settings.difficulty, questionCount);
  }

  /**
   * Hämtar maximalt antal frågor för en svårighetsgrad
   */
  static getMaxQuestionsForDifficulty(difficulty: SambandsDifficulty): number {
    return this.MAX_QUESTIONS_PER_DIFFICULTY[difficulty];
  }

  /**
   * Sparar quizresultat lokalt
   */
  static saveQuizResult(result: SambandsQuizResult): void {
    try {
      const existingResults = this.getQuizResults();
      const updatedResults = [...existingResults, result];
      
      // Behåll bara de senaste 100 resultaten
      const limitedResults = updatedResults.slice(-100);
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(limitedResults));
    } catch (error) {
      console.error('Fel vid sparande av sambandsquiz resultat:', error);
    }
  }

  /**
   * Hämtar sparade quizresultat
   */
  static getQuizResults(): SambandsQuizResult[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];
      
      return JSON.parse(stored).map((result: any) => ({
        ...result,
        completedAt: new Date(result.completedAt)
      }));
    } catch (error) {
      console.error('Fel vid hämtning av sambandsquiz resultat:', error);
      return [];
    }
  }

  /**
   * Hämtar statistik för en specifik svårighetsgrad
   */
  static getStatisticsForDifficulty(difficulty: SambandsDifficulty): {
    totalAttempts: number;
    averageScore: number;
    bestScore: number;
    averageTime: number;
  } {
    const results = this.getQuizResults().filter(r => r.difficulty === difficulty);
    
    if (results.length === 0) {
      return {
        totalAttempts: 0,
        averageScore: 0,
        bestScore: 0,
        averageTime: 0
      };
    }

    const totalScore = results.reduce((sum, r) => sum + r.percentage, 0);
    const totalTime = results.reduce((sum, r) => sum + r.timeSpent, 0);
    const bestScore = Math.max(...results.map(r => r.percentage));

    return {
      totalAttempts: results.length,
      averageScore: Math.round(totalScore / results.length),
      bestScore: Math.round(bestScore),
      averageTime: Math.round(totalTime / results.length)
    };
  }

  /**
   * Hämtar övergripande statistik
   */
  static getOverallStatistics(): {
    totalQuizzes: number;
    byDifficulty: { [key in SambandsDifficulty]: number };
    recentActivity: SambandsQuizResult[];
  } {
    const results = this.getQuizResults();
    const byDifficulty = results.reduce((acc, result) => {
      acc[result.difficulty] = (acc[result.difficulty] || 0) + 1;
      return acc;
    }, {} as { [key in SambandsDifficulty]: number });

    // Sätt standardvärden för svårighetsgrader som inte finns
    const difficultyStats: { [key in SambandsDifficulty]: number } = {
      easy: byDifficulty.easy || 0,
      advanced: byDifficulty.advanced || 0,
      expert: byDifficulty.expert || 0
    };

    // Hämta de senaste 5 resultaten
    const recentActivity = results
      .sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime())
      .slice(0, 5);

    return {
      totalQuizzes: results.length,
      byDifficulty: difficultyStats,
      recentActivity
    };
  }

  /**
   * Hämtar quiz-statistik från generatorn
   */
  static getQuizMetadata() {
    return getSambandsQuizStats();
  }

  /**
   * Rensa alla sparade resultat
   */
  static clearAllResults(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Fel vid rensning av sambandsquiz resultat:', error);
    }
  }

  /**
   * Validera quizinställningar
   */
  static validateSettings(settings: SambandsQuizSettings): string | null {
    if (settings.questionCount < 1) {
      return 'Antal frågor måste vara minst 1';
    }

    const maxQuestions = this.getMaxQuestionsForDifficulty(settings.difficulty);
    if (settings.questionCount > maxQuestions) {
      return `Maximalt ${maxQuestions} frågor tillgängliga för ${this.getDifficultyLabel(settings.difficulty)}`;
    }

    return null;
  }

  /**
   * Få användarvänlig label för svårighetsgrad
   */
  static getDifficultyLabel(difficulty: SambandsDifficulty): string {
    const labels = {
      easy: 'Grundläggande',
      advanced: 'Avancerad',
      expert: 'Expert'
    };
    return labels[difficulty];
  }

  /**
   * Få användarvänlig beskrivning för svårighetsgrad
   */
  static getDifficultyDescription(difficulty: SambandsDifficulty): string {
    const descriptions = {
      easy: 'Grundläggande kunskaper för räddningstjänstpersonal',
      advanced: 'Fördjupad kunskap för erfarna brandmän',
      expert: 'Avancerad teknisk kunskap och komplexa scenarier'
    };
    return descriptions[difficulty];
  }
}
