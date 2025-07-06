import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged as firebaseOnAuthStateChanged,
    User
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { User as AppUser } from '../types';
import { FirebaseService } from './firebaseService';

export const registerUser = async (email: string, password: string, displayName?: string, serviceNumber?: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Skapa användarprofil i Firestore med nya service
        const userData: AppUser = {
            id: user.uid,
            email: user.email!,
            displayName: displayName || email.split('@')[0],
            serviceNumber: serviceNumber,
            role: 'student',
            completedQuizzes: [],
            progress: {},
            quizSettings: {
                preferredQuestionCount: 20
            }
        };
        
        await FirebaseService.createUserProfile(userData);
        return userData;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Hämta användardata från Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
            return userDoc.data() as AppUser;
        } else {
            // Om användardokument inte finns, skapa det
            const userData: AppUser = {
                id: user.uid,
                email: user.email!,
                displayName: user.displayName || email.split('@')[0],
                role: 'student',
                completedQuizzes: [],
                progress: {}
            };
            await FirebaseService.createUserProfile(userData);
            return userData;
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const logoutUser = async () => {
    try {
        await signOut(auth);
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const onAuthStateChanged = (callback: (user: AppUser | null) => void) => {
    return firebaseOnAuthStateChanged(auth, async (firebaseUser: User | null) => {
        if (firebaseUser) {
            // Hämta komplett användardata från Firestore
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
            if (userDoc.exists()) {
                callback(userDoc.data() as AppUser);
            } else {
                callback(null);
            }
        } else {
            callback(null);
        }
    });
};

export const getCurrentUser = async (): Promise<AppUser | null> => {
    const firebaseUser = auth.currentUser;
    if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
            return userDoc.data() as AppUser;
        }
    }
    return null;
};