import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebaseConfig, { useEmulator, emulatorConfig } from './config.js';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize providers
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');

// Configure providers
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

appleProvider.setCustomParameters({
  locale: 'en'
});

// Connect to emulators in development
if (useEmulator) {
  try {
    // Connect Auth emulator
    connectAuthEmulator(auth, `http://${emulatorConfig.host}:${emulatorConfig.auth.port}`, {
      disableWarnings: true
    });

    // Connect Firestore emulator
    connectFirestoreEmulator(db, emulatorConfig.host, emulatorConfig.firestore.port);

    console.log('🔥 Firebase emulators connected');
  } catch (error) {
    console.warn('Firebase emulator connection failed:', error.message);
  }
}

// Error handling for network issues (especially in StackBlitz)
const handleNetworkError = (error) => {
  if (error.code === 'unavailable' || error.message.includes('network')) {
    console.warn('Network connectivity issue detected. This might be due to StackBlitz limitations.');
    return {
      isNetworkError: true,
      message: 'Network connectivity issue. Please try again or use local development.'
    };
  }
  return { isNetworkError: false };
};

// Enhanced error logging
const logFirebaseError = (operation, error) => {
  const networkError = handleNetworkError(error);
  
  if (networkError.isNetworkError) {
    console.warn(`Firebase ${operation} failed:`, networkError.message);
  } else {
    console.error(`Firebase ${operation} error:`, error);
  }
  
  return networkError;
};

// Export error utilities for use in other modules
export { handleNetworkError, logFirebaseError };

// Export the app instance
export default app;