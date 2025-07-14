// Firebase Configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Validate required environment variables
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

const missingEnvVars = requiredEnvVars.filter(
  varName => !import.meta.env[varName]
);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
  throw new Error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
}

// Environment checks
export const isDevelopment = import.meta.env.VITE_APP_ENV === 'development';
export const isProduction = import.meta.env.VITE_APP_ENV === 'production';
export const useEmulator = import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true';

// Emulator configuration
export const emulatorConfig = {
  host: import.meta.env.VITE_FIREBASE_EMULATOR_HOST || 'localhost',
  auth: {
    port: import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_PORT || 9099
  },
  firestore: {
    port: import.meta.env.VITE_FIRESTORE_EMULATOR_PORT || 8080
  }
};

export default firebaseConfig;