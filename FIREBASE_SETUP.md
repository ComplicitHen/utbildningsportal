# 🔐 Firebase Authentication & Database Setup Guide

## ✅ Already Completed in Code
- ✅ Firebase SDK integrated with your credentials  
- ✅ Authentication service with registration/login
- ✅ Firestore integration for user data
- ✅ Progress tracking for quizzes, scenarios, and flashcards
- ✅ Security rules template created

## 🔧 Firebase Console Configuration

### Step 1: Enable Authentication
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: `firefighter-training-app-c860e`
3. Click **Authentication** → **Get started**
4. Go to **Sign-in method** tab
5. **Enable Email/Password**:
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"

### Step 2: Configure Authorized Domains
In Authentication → Settings → Authorized domains:
- ✅ `localhost` (for development)
- ➕ Add your Netlify domain: `your-app-name.netlify.app`
- ➕ Add any custom domain you plan to use

### Step 3: Create Firestore Database
1. Click **Firestore Database** → **Create database**
2. **Start in test mode** (for now)
3. **Choose location**: `europe-west3` (Frankfurt - closest to Sweden)
4. Click "Done"

### Step 4: Set Up Security Rules
1. In Firestore Database → **Rules** tab
2. Replace the default rules with the content from `firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can write their own quiz results
    match /quizResults/{resultId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Training areas are read-only for authenticated users
    match /trainingAreas/{areaId} {
      allow read: if request.auth != null;
    }
  }
}
```

3. Click **Publish**

## 📊 Database Collections

Your app will automatically create these collections:

### `users` Collection
```javascript
{
  id: "user-uid",
  email: "user@example.com", 
  displayName: "User Name",
  role: "student", // student, instructor, admin
  completedQuizzes: [],
  progress: {
    "fordonskännedom": {
      completedQuizzes: ["quiz-id-1"],
      completedScenarios: ["scenario-id-1"], 
      flashcardProgress: {
        "deck-id-1": 75 // percentage completed
      },
      totalScore: 85,
      lastActivity: "2025-01-15T10:30:00Z"
    }
  },
  createdAt: "2025-01-15T10:00:00Z",
  lastActivity: "2025-01-15T10:30:00Z"
}
```

### `quizResults` Collection  
```javascript
{
  id: "user-id_quiz-id_timestamp",
  userId: "user-uid",
  quizId: "fack-placering-quiz",
  score: 8,
  answers: [
    {
      questionId: "q-1",
      selectedAnswer: 0,
      correct: true
    }
  ],
  completedAt: "2025-01-15T10:30:00Z",
  timeSpent: 120 // seconds
}
```

## 🧪 Testing the Setup

### Test Authentication:
1. Deploy your updated app to Netlify
2. Visit your app URL
3. Try registering a new user
4. Check Firebase Console → Authentication → Users

### Test Database:
1. Complete a quiz or flashcard session
2. Check Firebase Console → Firestore Database
3. Look for `users` and `quizResults` collections

## 🔒 Security Best Practices

### Production Security Rules
When going to production, update rules to be more restrictive:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == userId &&
        request.auth.token.email_verified == true;
    }
    
    match /quizResults/{resultId} {
      allow create: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow read: if request.auth != null && 
        (request.auth.uid == resource.data.userId ||
         getUserRole(request.auth.uid) in ['instructor', 'admin']);
    }
  }
  
  function getUserRole(uid) {
    return get(/databases/$(database)/documents/users/$(uid)).data.role;
  }
}
```

## 🚀 Next Steps

1. **Deploy to Netlify** with the updated code
2. **Configure Firebase Console** as described above
3. **Test user registration/login**
4. **Test progress tracking** by completing training modules
5. **Monitor usage** in Firebase Analytics
6. **Set up user management** for your firefighting team

## 🔧 Troubleshooting

**"Permission denied"**: Check Firestore security rules
**"Auth domain not authorized"**: Add your domain to authorized domains  
**"Module not found"**: Rebuild and redeploy
**Users not saving**: Check browser console for Firebase errors

Your app now has full authentication and database integration! 🎉
