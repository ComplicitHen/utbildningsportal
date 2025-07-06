# FIRESTORE RULES UPPDATERING

## Viktigt: Uppdatera Firestore Rules manuellt

De uppdaterade säkerhetsreglerna i `firestore.rules` behöver deployas till Firebase Console manuellt.

### Steg för att uppdatera:

1. Gå till [Firebase Console](https://console.firebase.google.com/)
2. Välj ditt projekt
3. Gå till **Firestore Database** → **Rules**
4. Kopiera innehållet från `firestore.rules` filen
5. Klistra in i regeleditorn
6. Klicka **Publicera**

### Nuvarande Rules (för kopiering):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read all users (för leaderboard) men bara skriva sin egen data
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can write their own quiz results and read all results (för leaderboard)
    match /quizResults/{resultId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Training areas are read-only for authenticated users (since we use static JSON)
    match /trainingAreas/{areaId} {
      allow read: if request.auth != null;
    }
    
    // Admin-only access for system collections
    match /admin/{document=**} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### Vad som ändrats:

1. **users collection**: Alla autentiserade användare kan läsa alla användarprofiler (för leaderboard)
2. **quizResults collection**: Alla kan läsa quiz-resultat (för leaderboard och statistik)
3. Behåller säkerheten att endast användaren själv kan skriva sin egen data

### Test efter uppdatering:

- Logga in som vanligt
- Testa att skapa quiz-resultat
- Kontrollera att leaderboard fungerar
- Verifiera att användare endast kan ändra sin egen profil
