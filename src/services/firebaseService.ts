import { doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from './firebase';
import { User, UserProgress } from '../types';

export class FirebaseService {
    // Create user profile in Firestore
    static async createUserProfile(user: User): Promise<void> {
        try {
            const userRef = doc(db, 'users', user.id);
            const userDoc = await getDoc(userRef);
            
            if (!userDoc.exists()) {
                const userData = {
                    id: user.id,
                    email: user.email,
                    displayName: user.displayName || '',
                    role: 'student',
                    completedQuizzes: [],
                    progress: {},
                    createdAt: new Date(),
                    lastActivity: new Date()
                };
                
                await setDoc(userRef, userData);
                console.log('User profile created successfully');
            }
        } catch (error) {
            console.error('Error creating user profile:', error);
            throw error;
        }
    }

    // Get user progress
    static async getUserProgress(userId: string): Promise<UserProgress | null> {
        try {
            const userRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userRef);
            
            if (userDoc.exists()) {
                return userDoc.data().progress || {};
            }
            return null;
        } catch (error) {
            console.error('Error getting user progress:', error);
            return null;
        }
    }

    // Update quiz completion
    static async updateQuizCompletion(
        userId: string, 
        areaId: string, 
        quizId: string, 
        score: number
    ): Promise<void> {
        try {
            const userRef = doc(db, 'users', userId);
            const progressUpdate = {
                [`progress.${areaId}.completedQuizzes`]: arrayUnion(quizId),
                [`progress.${areaId}.lastActivity`]: new Date(),
                [`progress.${areaId}.totalScore`]: score,
                lastActivity: new Date()
            };
            
            await updateDoc(userRef, progressUpdate);
            console.log('Quiz completion updated');
        } catch (error) {
            console.error('Error updating quiz completion:', error);
            throw error;
        }
    }

    // Update scenario completion
    static async updateScenarioCompletion(
        userId: string,
        areaId: string,
        scenarioId: string
    ): Promise<void> {
        try {
            const userRef = doc(db, 'users', userId);
            const progressUpdate = {
                [`progress.${areaId}.completedScenarios`]: arrayUnion(scenarioId),
                [`progress.${areaId}.lastActivity`]: new Date(),
                lastActivity: new Date()
            };
            
            await updateDoc(userRef, progressUpdate);
            console.log('Scenario completion updated');
        } catch (error) {
            console.error('Error updating scenario completion:', error);
            throw error;
        }
    }

    // Update flashcard progress
    static async updateFlashcardProgress(
        userId: string,
        areaId: string,
        deckId: string,
        progress: number
    ): Promise<void> {
        try {
            const userRef = doc(db, 'users', userId);
            const progressUpdate = {
                [`progress.${areaId}.flashcardProgress.${deckId}`]: progress,
                [`progress.${areaId}.lastActivity`]: new Date(),
                lastActivity: new Date()
            };
            
            await updateDoc(userRef, progressUpdate);
            console.log('Flashcard progress updated');
        } catch (error) {
            console.error('Error updating flashcard progress:', error);
            throw error;
        }
    }

    // Save quiz result
    static async saveQuizResult(quizResult: any): Promise<void> {
        try {
            const resultRef = doc(db, 'quizResults', `${quizResult.userId}_${quizResult.quizId}_${Date.now()}`);
            await setDoc(resultRef, {
                ...quizResult,
                completedAt: new Date()
            });
            console.log('Quiz result saved');
        } catch (error) {
            console.error('Error saving quiz result:', error);
            throw error;
        }
    }
}
