# 🚀 Deployment Instructions

## GitHub Setup

1. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Name: `utbildningsportal`
   - Make it public or private (your choice)
   - Don't initialize with README (we already have one)

2. **Push your local repository to GitHub**:
   ```bash
   git remote add origin https://github.com/ComplicitHen/utbildningsportal.git
   git branch -M main
   git push -u origin main
   ```

## Netlify Deployment

1. **Connect GitHub to Netlify**:
   - Go to https://app.netlify.com/
   - Click "New site from Git"
   - Choose "GitHub" and authorize Netlify
   - Select your `utbildningsportal` repository

2. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `build`
   - Node version: `18` (already configured in netlify.toml)

3. **Deploy**:
   - Click "Deploy site"
   - Netlify will automatically build and deploy your app
   - You'll get a URL like `https://amazing-name-123456.netlify.app`

## Firebase Domain Setup

1. **Add your Netlify domain to Firebase**:
   - Go to https://console.firebase.google.com/
   - Select your project: `firefighter-training-app-c860e`
   - Go to Authentication > Settings > Authorized domains
   - Add your Netlify domain (e.g., `amazing-name-123456.netlify.app`)

2. **Optional - Custom Domain**:
   - In Netlify: Go to Domain management > Add custom domain
   - In Firebase: Add your custom domain to authorized domains

## Environment Variables (If needed later)

If you want to hide Firebase config in environment variables:

1. **In Netlify**:
   - Go to Site settings > Environment variables
   - Add each Firebase config value:
     - `REACT_APP_FIREBASE_API_KEY`
     - `REACT_APP_FIREBASE_AUTH_DOMAIN`
     - etc.

2. **Update firebase.ts** to use env vars again

## Testing

1. **Test locally**:
   ```bash
   npm start
   ```

2. **Test production build**:
   ```bash
   npm run build
   npx serve -s build
   ```

3. **Test on Netlify**:
   - Visit your deployed URL
   - Try registering a new user
   - Test navigation and features

## Next Steps After Deployment

1. **Firestore Security Rules**: Set up proper security rules in Firebase Console
2. **Analytics**: Firebase Analytics is already configured
3. **Performance**: Monitor with Firebase Performance
4. **Monitoring**: Set up error tracking with Firebase Crashlytics

## Troubleshooting

- **Build fails**: Check the Netlify deploy logs
- **Firebase auth fails**: Verify domain is in authorized domains
- **Routing issues**: netlify.toml should handle SPA routing
- **Environment issues**: Check Node version is 18+

Your app is now ready for deployment! 🎉
