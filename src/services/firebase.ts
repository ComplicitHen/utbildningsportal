import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyCw1Lf0LuKjc5G0FMB3I-jK9HyJdN1ZU6w",
    authDomain: "firefighter-training-app-c860e.firebaseapp.com",
    projectId: "firefighter-training-app-c860e",
    storageBucket: "firefighter-training-app-c860e.firebasestorage.app",
    messagingSenderId: "547675013657",
    appId: "1:547675013657:web:8c7387485364790a4e6088",
    measurementId: "G-X4JP0HCFKR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;