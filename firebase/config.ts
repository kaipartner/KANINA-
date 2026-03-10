
// This file initializes Firebase using environment variables.
// Note: In a real environment, these would be provided by your process.env
// For this demo, we'll use placeholders if keys are not present.

export const firebaseConfig = {
  apiKey: "AIzaSy_MOCK_KEY",
  authDomain: "kanina-app.firebaseapp.com",
  projectId: "kanina-app",
  storageBucket: "kanina-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Simulated initialization as we cannot perform side-effects in this environment easily
// In a real project: 
// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);

export const MOCK_AUTH_DELAY = 1000;
