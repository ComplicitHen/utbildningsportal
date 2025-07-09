import { generateQuizQuestions, generateCategoryQuiz, generateLocationQuiz, getInventoryStats, QuizQuestion } from '../data/inventoryQuizGenerator';
import { Quiz } from '../types';

export class InventoryQuizService {
  
  // Generera ett komplett inventarie-quiz
  static generateInventoryQuiz(questionCount: number = 50): Quiz {
    const questions = generateQuizQuestions(questionCount);
    
    return {
      id: 'dynamic-inventory-quiz',
      title: 'Komplett Inventariequiz 6510',
      description: `Dynamiskt genererat quiz med ${questionCount} slumpmässiga frågor från hela inventariet`,
      category: 'fordonskännedom',
      difficulty: 'hard',
      timeLimit: Math.max(20, questionCount * 0.5), // 30 sekunder per fråga minimum 20 min
      passingScore: 80,
      questions: questions.map((q: QuizQuestion, index: number) => ({
        id: q.id || `dyn-${index}`,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation
      }))
    };
  }

  // Generera quiz för specifik kategori
  static generateCategoryQuiz(category: string, questionCount: number = 20): Quiz {
    const questions = generateCategoryQuiz(category, questionCount);
    
    return {
      id: `dynamic-category-${category}-quiz`,
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Quiz`,
      description: `Dynamiskt genererat quiz för kategorin ${category}`,
      category: 'fordonskännedom',
      difficulty: 'medium',
      timeLimit: Math.max(15, questionCount * 0.4),
      passingScore: 75,
      questions: questions.map((q: QuizQuestion, index: number) => ({
        id: q.id || `cat-${category}-${index}`,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation
      }))
    };
  }

  // Generera quiz för specifikt fack/location
  static generateLocationQuiz(location: string, questionCount: number = 15): Quiz {
    const questions = generateLocationQuiz(location, questionCount);
    
    return {
      id: `dynamic-location-${location.replace(/\s+/g, '-').toLowerCase()}-quiz`,
      title: `${location} Quiz`,
      description: `Dynamiskt genererat quiz för ${location}`,
      category: 'fordonskännedom',
      difficulty: 'medium',
      timeLimit: Math.max(10, questionCount * 0.4),
      passingScore: 75,
      questions: questions.map((q: QuizQuestion, index: number) => ({
        id: q.id || `loc-${location}-${index}`,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation
      }))
    };
  }

  // Hämta statistik om inventariet
  static getStats() {
    return getInventoryStats();
  }

  // Hämta alla tillgängliga kategorier
  static getAvailableCategories(): string[] {
    const stats = getInventoryStats();
    return Object.keys(stats.categoryCounts);
  }

  // Hämta alla tillgängliga platser
  static getAvailableLocations(): string[] {
    const stats = getInventoryStats();
    return Object.keys(stats.locationCounts);
  }

  // Kontrollera om ett quiz-ID är dynamiskt
  static isDynamicQuiz(quizId: string): boolean {
    return quizId.startsWith('dynamic-') || quizId === 'inventory-mega-quiz';
  }

  // Hantera dynamiska quiz
  static getDynamicQuiz(quizId: string, params?: { category?: string; location?: string; count?: number }): Quiz | null {
    const count = params?.count || 50;

    switch (quizId) {
      case 'dynamic-inventory-quiz':
      case 'inventory-mega-quiz':
        return this.generateInventoryQuiz(count);
      
      case 'dynamic-category-quiz':
        if (params?.category) {
          return this.generateCategoryQuiz(params.category, count);
        }
        break;
      
      case 'dynamic-location-quiz':
        if (params?.location) {
          return this.generateLocationQuiz(params.location, count);
        }
        break;
    }

    // Försök att tolka quiz-ID för kategori eller plats
    if (quizId.startsWith('dynamic-category-')) {
      const category = quizId.replace('dynamic-category-', '').replace('-quiz', '');
      return this.generateCategoryQuiz(category, count);
    }

    if (quizId.startsWith('dynamic-location-')) {
      const location = quizId.replace('dynamic-location-', '').replace('-quiz', '').replace(/-/g, ' ');
      return this.generateLocationQuiz(location, count);
    }

    return null;
  }
}
