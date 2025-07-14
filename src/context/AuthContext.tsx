// AuthContext.tsx - SIMPLIFIED VERSION
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { onAuthStateChange } from '../firebase/auth';
import { 
  signInWithEmail as authSignIn, 
  signOut as authSignOut, 
  signUpWithEmail as authSignUp,
  signInWithGoogle as authSignInWithGoogle,
  signInWithApple as authSignInWithApple,
  resetPassword as authResetPassword,
} from '../firebase/auth';
import { 
  getUserProfile, 
  updateUserProfile 
} from '../firebase/database';
import { User, InfluencerProfile, BrandProfile, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<InfluencerProfile | BrandProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          const userProfile = await getUserProfile(firebaseUser.uid);
          if (userProfile) {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email!,
              displayName: firebaseUser.displayName || userProfile.displayName,
              photoURL: firebaseUser.photoURL || userProfile.photoURL,
              userType: userProfile.userType,
              createdAt: userProfile.createdAt,
              lastLoginAt: userProfile.lastLoginAt,
              isOnboardingComplete: userProfile.isOnboardingComplete
            });
            setProfile(userProfile);
          } else {
            setUser(null);
            setProfile(null);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUser(null);
          setProfile(null);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // SIMPLE auth methods - NO navigation logic
  const signIn = async (email: string, password: string) => {
    setError(null);
    try {
      const result = await authSignIn(email, password);
      return result; // Return the Firebase user
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to sign in');
      throw error;
    }
  };

  const signUp = async (email: string, password: string, userType: 'influencer' | 'brand') => {
    setError(null);
    try {
      const result = await authSignUp(email, password, userType);
      return result;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create account');
      throw error;
    }
  };

  const signInWithGoogle = async (userType?: 'influencer' | 'brand') => {
    setError(null);
    try {
      const result = await authSignInWithGoogle(userType);
      return result;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to sign in with Google');
      throw error;
    }
  };

  const signInWithApple = async (userType?: 'influencer' | 'brand') => {
    setError(null);
    try {
      const result = await authSignInWithApple(userType);
      return result;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to sign in with Apple');
      throw error;
    }
  };

  const signOut = async () => {
    setError(null);
    try {
      await authSignOut();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to sign out');
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    setError(null);
    try {
      await authResetPassword(email);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to send reset email');
      throw error;
    }
  };

  const updateProfile = async (data: Partial<InfluencerProfile | BrandProfile>) => {
    if (!user) {
      throw new Error('No user is currently signed in');
    }
    
    setError(null);
    try {
      await updateUserProfile(user.uid, data);
      const updatedProfile = await getUserProfile(user.uid);
      setProfile(updatedProfile);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update profile');
      throw error;
    }
  };

  const completeOnboarding = async () => {
    if (!user) {
      throw new Error('No user is currently signed in');
    }
    
    setError(null);
    try {
      await updateUserProfile(user.uid, { isOnboardingComplete: true });
      const updatedProfile = await getUserProfile(user.uid);
      setProfile(updatedProfile);
      setUser({ ...user, isOnboardingComplete: true });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to complete onboarding');
      throw error;
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    profile,
    loading,
    error,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithApple,
    signOut,
    resetPassword,
    updateProfile,
    completeOnboarding,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};