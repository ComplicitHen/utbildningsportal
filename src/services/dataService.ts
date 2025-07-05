import { TrainingArea, FlashcardDeck, Quiz, Scenario } from '../types';
import trainingAreasData from '../data/trainingAreas.json';

export class DataService {
    private static trainingAreas: { [key: string]: TrainingArea } = trainingAreasData as { [key: string]: TrainingArea };

    static getAllTrainingAreas(): TrainingArea[] {
        return Object.values(this.trainingAreas);
    }

    static getTrainingArea(id: string): TrainingArea | undefined {
        return this.trainingAreas[id];
    }

    static getFlashcardDeck(areaId: string, deckId: string): FlashcardDeck | undefined {
        const area = this.getTrainingArea(areaId);
        return area?.flashcardDecks.find(deck => deck.id === deckId);
    }

    static getQuiz(areaId: string, quizId: string): Quiz | undefined {
        const area = this.getTrainingArea(areaId);
        return area?.quizzes.find(quiz => quiz.id === quizId);
    }

    static getScenario(areaId: string, scenarioId: string): Scenario | undefined {
        const area = this.getTrainingArea(areaId);
        return area?.scenarios.find(scenario => scenario.id === scenarioId);
    }

    static getQuizzesByCategory(category: string): Quiz[] {
        return this.getAllTrainingAreas()
            .filter(area => area.category === category)
            .flatMap(area => area.quizzes);
    }

    static getFlashcardDecksByCategory(category: string): FlashcardDeck[] {
        return this.getAllTrainingAreas()
            .filter(area => area.category === category)
            .flatMap(area => area.flashcardDecks);
    }

    static getScenariosByCategory(category: string): Scenario[] {
        return this.getAllTrainingAreas()
            .filter(area => area.category === category)
            .flatMap(area => area.scenarios);
    }
}
