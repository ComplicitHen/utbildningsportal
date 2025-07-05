# 🔥 Firefighter Training App

En omfattande webbapplikation för brandmannutbildning som innehåller interaktiva flashcards, quiz och scenarioträning.

## ✨ Funktioner

- **🔐 Autentisering**: Säker inloggning och registrering med Firebase Auth
- **📚 Utbildningsområden**: Olika träningsområden som brandkunskap, fordonskännedom, radiokunskap, sjukvård
- **🗃️ Flashcards**: Interaktiva kort för kunskapsträning
- **🧪 Quiz**: Testa dina kunskaper med flervalsfrågor
- **🎭 Scenarioträning**: Stegvis genomgång av realistiska brandsituationer
- **👤 Användarprofil**: Spåra din progress och se statistik
- **📱 Responsiv design**: Fungerar på alla enheter

## 🚀 Teknologier

- **Frontend**: React 18 med TypeScript
- **Routing**: React Router v6
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Styling**: Custom CSS med modern design
- **Build**: Create React App
- **User Dashboard**: A personalized dashboard for users to track their progress and access training resources.

## Project Structure

```
firefighter-training-app
├── src
│   ├── components
│   │   ├── auth
│   │   ├── flashcards
│   │   ├── quiz
│   │   ├── scenarios
│   │   └── common
│   ├── pages
│   ├── services
│   ├── types
│   ├── App.tsx
│   └── index.tsx
├── public
│   └── index.html
├── package.json
├── tsconfig.json
└── README.md
```

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type safety and better development experience.
- **Firebase**: For user authentication and data storage.

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/firefighter-training-app.git
   ```
2. Navigate to the project directory:
   ```
   cd firefighter-training-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Set up Firebase configuration in `src/services/firebase.ts`.
5. Start the application:
   ```
   npm start
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.