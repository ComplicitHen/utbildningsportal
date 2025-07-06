import { doc, setDoc, getDoc, updateDoc, arrayUnion, collection, query, orderBy, limit, getDocs, where, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import { User, UserProgress, QuizResult, LeaderboardEntry } from '../types';

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
                    serviceNumber: user.serviceNumber || '',
                    role: 'student',
                    completedQuizzes: [],
                    progress: {},
                    quizSettings: {
                        preferredQuestionCount: 20
                    },
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
    static async saveQuizResult(quizResult: QuizResult): Promise<void> {
        try {
            const resultRef = doc(db, 'quizResults', quizResult.id);
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

    // Get leaderboard
    static async getLeaderboard(timeFrame: 'all' | 'month' | 'week' = 'all'): Promise<LeaderboardEntry[]> {
        try {
            const usersRef = collection(db, 'users');
            let usersQuery = query(usersRef, orderBy('lastActivity', 'desc'));

            // Om vi vill filtrera på tid, lägg till where-clause
            if (timeFrame !== 'all') {
                const now = new Date();
                const filterDate = new Date();
                
                if (timeFrame === 'week') {
                    filterDate.setDate(now.getDate() - 7);
                } else if (timeFrame === 'month') {
                    filterDate.setMonth(now.getMonth() - 1);
                }
                
                usersQuery = query(
                    usersRef, 
                    where('lastActivity', '>=', Timestamp.fromDate(filterDate)),
                    orderBy('lastActivity', 'desc')
                );
            }

            const snapshot = await getDocs(usersQuery);
            const leaderboardData: LeaderboardEntry[] = [];

            for (const userDoc of snapshot.docs) {
                const userData = userDoc.data() as User;
                
                // Hoppa över användare utan serviceNumber
                if (!userData.serviceNumber || !userData.displayName) continue;

                // Räkna total poäng och quiz från progress
                let totalScore = 0;
                let totalQuizzes = 0;
                
                if (userData.progress) {
                    Object.values(userData.progress).forEach(areaProgress => {
                        totalScore += areaProgress.totalScore || 0;
                        totalQuizzes += areaProgress.completedQuizzes?.length || 0;
                    });
                }

                const averageScore = totalQuizzes > 0 ? (totalScore / totalQuizzes) : 0;

                leaderboardData.push({
                    userId: userData.id,
                    userDisplayName: userData.displayName,
                    serviceNumber: userData.serviceNumber,
                    totalScore,
                    completedQuizzes: totalQuizzes,
                    averageScore,
                    lastActivity: userData.lastActivity || new Date()
                });
            }

            // Sortera efter totalScore, sedan averageScore
            leaderboardData.sort((a, b) => {
                if (b.totalScore !== a.totalScore) {
                    return b.totalScore - a.totalScore;
                }
                return b.averageScore - a.averageScore;
            });

            return leaderboardData.slice(0, 50); // Top 50
        } catch (error) {
            console.error('Error getting leaderboard:', error);
            return [];
        }
    }

    // Get user quiz statistics
    static async getUserQuizStats(userId: string): Promise<{
        totalQuizzes: number;
        averageScore: number;
        bestScore: number;
        recentActivity: Date | null;
    }> {
        try {
            const quizResultsRef = collection(db, 'quizResults');
            const userQuizQuery = query(
                quizResultsRef,
                where('userId', '==', userId),
                orderBy('completedAt', 'desc')
            );

            const snapshot = await getDocs(userQuizQuery);
            const results = snapshot.docs.map(doc => doc.data() as QuizResult);

            if (results.length === 0) {
                return {
                    totalQuizzes: 0,
                    averageScore: 0,
                    bestScore: 0,
                    recentActivity: null
                };
            }

            const totalQuizzes = results.length;
            const averageScore = results.reduce((sum, result) => 
                sum + ((result.score / result.totalQuestions) * 100), 0) / totalQuizzes;
            const bestScore = Math.max(...results.map(result => 
                (result.score / result.totalQuestions) * 100));
            const recentActivity = results[0].completedAt;

            return {
                totalQuizzes,
                averageScore: Math.round(averageScore),
                bestScore: Math.round(bestScore),
                recentActivity
            };
        } catch (error) {
            console.error('Error getting user quiz stats:', error);
            return {
                totalQuizzes: 0,
                averageScore: 0,
                bestScore: 0,
                recentActivity: null
            };
        }
    }
}
