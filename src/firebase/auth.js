import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile as updateFirebaseProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider, appleProvider, logFirebaseError } from './index.js';
import { createUserProfile, getUserProfile, updateUserLastLogin } from './database.js';

// Custom error messages
const getErrorMessage = (error) => {
  switch (error.code) {
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection and try again.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in was cancelled. Please try again.';
    case 'auth/cancelled-popup-request':
      return 'Only one sign-in popup is allowed at a time.';
    case 'auth/operation-not-allowed':
      return 'This sign-in method is not enabled. Please contact support.';
    case 'auth/invalid-credential':
      return 'Invalid credentials. Please check your email and password.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'unavailable':
      return 'Service temporarily unavailable. Please try again later.';
    default:
      return error.message || 'An unexpected error occurred. Please try again.';
  }
};

// Helper function to update last login time
const updateLastLoginTime = async (uid) => {
  try {
    await updateUserLastLogin(uid);
  } catch (error) {
    // Don't throw error for last login update failure
    console.warn('Failed to update last login time:', error);
  }
};

// Sign up with email and password
export const signUpWithEmail = async (email, password, userType) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || email.split('@')[0],
      photoURL: user.photoURL || null,
      userType,
      createdAt: new Date(),
      lastLoginAt: new Date(),
      isOnboardingComplete: false
    };

    await createUserProfile(user.uid, userData);
    return userData;
  } catch (error) {
    logFirebaseError('signUp', error);
    throw new Error(getErrorMessage(error));
  }
};

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    
    // Update last login time in background
    updateLastLoginTime(user.uid);
    
    return user;
  } catch (error) {
    logFirebaseError('signIn', error);
    throw new Error(getErrorMessage(error));
  }
};

// Sign in with Google
export const signInWithGoogle = async (userType) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user exists in database
    const existingProfile = await getUserProfile(user.uid);
    
    if (!existingProfile) {
      // New user - create profile
      if (!userType) {
        throw new Error('User type is required for new accounts');
      }
      
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL || null,
        userType,
        createdAt: new Date(),
        lastLoginAt: new Date(),
        isOnboardingComplete: false
      };

      await createUserProfile(user.uid, userData);
    } else {
      // Existing user - update last login time
      updateLastLoginTime(user.uid);
    }
    
    return user;
  } catch (error) {
    logFirebaseError('signInWithGoogle', error);
    throw new Error(getErrorMessage(error));
  }
};

// Sign in with Apple
export const signInWithApple = async (userType) => {
  try {
    const result = await signInWithPopup(auth, appleProvider);
    const user = result.user;
    
    // Check if user exists in database
    const existingProfile = await getUserProfile(user.uid);
    
    if (!existingProfile) {
      // New user - create profile
      if (!userType) {
        throw new Error('User type is required for new accounts');
      }
      
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email?.split('@')[0] || 'Apple User',
        photoURL: user.photoURL || null,
        userType,
        createdAt: new Date(),
        lastLoginAt: new Date(),
        isOnboardingComplete: false
      };

      await createUserProfile(user.uid, userData);
    } else {
      // Existing user - update last login time
      updateLastLoginTime(user.uid);
    }
    
    return user;
  } catch (error) {
    logFirebaseError('signInWithApple', error);
    throw new Error(getErrorMessage(error));
  }
};

// Sign out
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    logFirebaseError('signOut', error);
    throw new Error(getErrorMessage(error));
  }
};

// Reset password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return 'Password reset email sent successfully';
  } catch (error) {
    logFirebaseError('resetPassword', error);
    throw new Error(getErrorMessage(error));
  }
};

// Update Firebase user profile
export const updateFirebaseUserProfile = async (displayName, photoURL) => {
  try {
    if (auth.currentUser) {
      await updateFirebaseProfile(auth.currentUser, {
        displayName,
        photoURL
      });
    } else {
      throw new Error('No user is currently signed in');
    }
  } catch (error) {
    logFirebaseError('updateFirebaseUserProfile', error);
    throw new Error('Failed to update user profile');
  }
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Optimized auth state observer with better error handling
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    try {
      callback(user);
    } catch (error) {
      console.error('Error in auth state change callback:', error);
      logFirebaseError('onAuthStateChange', error);
    }
  }, (error) => {
    console.error('Auth state change error:', error);
    logFirebaseError('onAuthStateChangeError', error);
    // Call callback with null user on error
    try {
      callback(null);
    } catch (callbackError) {
      console.error('Error in auth state change error callback:', callbackError);
    }
  });
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!auth.currentUser;
};