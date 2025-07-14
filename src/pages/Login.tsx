// Login.tsx - WITH PROPER NAVIGATION TIMING
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TouchFriendlyButton } from '../components/mobile/TouchFriendlyButton';
import { MobileInput, MobileForm } from '../components/mobile/MobileForm';
import { SocialLoginButton } from '../components/auth/SocialLoginButton';
import { UserTypeSelector } from '../components/auth/UserTypeSelector';
import { Card } from '../components/ui/Card';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { ROUTES } from '../constants';

export const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'apple' | null>(null);
  const [showUserTypeSelector, setShowUserTypeSelector] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<'influencer' | 'brand'>('influencer');
  const [pendingSocialProvider, setPendingSocialProvider] = useState<'google' | 'apple' | null>(null);
  
  const { signIn, signInWithGoogle, signInWithApple } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(formData.email, formData.password);
      
      // Wait a brief moment for Firebase Auth to complete
      setTimeout(() => {
        navigate(ROUTES.DASHBOARD);
      }, 100);
      
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    setError('');
    setSocialLoading(provider);

    try {
      if (provider === 'google') {
        await signInWithGoogle();
      } else {
        await signInWithApple();
      }
      
      // Wait a brief moment for Firebase Auth to complete
      setTimeout(() => {
        navigate(ROUTES.DASHBOARD);
      }, 100);
      
    } catch (err: any) {
      if (err.message.includes('User type is required')) {
        setPendingSocialProvider(provider);
        setShowUserTypeSelector(true);
      } else {
        setError(err.message || `Failed to sign in with ${provider}`);
      }
    } finally {
      setSocialLoading(null);
    }
  };

  const handleUserTypeSelection = async () => {
    if (!pendingSocialProvider) return;

    setError('');
    setSocialLoading(pendingSocialProvider);

    try {
      if (pendingSocialProvider === 'google') {
        await signInWithGoogle(selectedUserType);
      } else {
        await signInWithApple(selectedUserType);
      }
      
      // Wait a brief moment for Firebase Auth to complete
      setTimeout(() => {
        navigate(ROUTES.DASHBOARD);
      }, 100);
      
    } catch (err: any) {
      setError(err.message || `Failed to sign in with ${pendingSocialProvider}`);
    } finally {
      setSocialLoading(null);
      setShowUserTypeSelector(false);
      setPendingSocialProvider(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (showUserTypeSelector) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md">
          <div className="text-center mb-8">
            <button
              onClick={() => {
                setShowUserTypeSelector(false);
                setPendingSocialProvider(null);
              }}
              className="absolute top-4 left-4 p-2 text-gray-600 hover:text-gray-900 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-lg md:text-2xl">SF</span>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
            <p className="text-sm md:text-base text-gray-600">Tell us what type of account you need</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600 text-xs md:text-sm">{error}</p>
            </div>
          )}

          <UserTypeSelector
            selectedType={selectedUserType}
            onTypeChange={setSelectedUserType}
            className="mb-6"
          />

          <TouchFriendlyButton
            fullWidth
            onClick={handleUserTypeSelection}
            loading={socialLoading === pendingSocialProvider}
            disabled={socialLoading === pendingSocialProvider}
          >
            Continue with {pendingSocialProvider}
          </TouchFriendlyButton>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-lg md:text-2xl">SF</span>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-sm md:text-base text-gray-600">Sign in to your SociallyFound account</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600 text-xs md:text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-3 mb-6">
          <SocialLoginButton
            provider="google"
            onClick={() => handleSocialLogin('google')}
            loading={socialLoading === 'google'}
            disabled={socialLoading !== null}
          />
          <SocialLoginButton
            provider="apple"
            onClick={() => handleSocialLogin('apple')}
            loading={socialLoading === 'apple'}
            disabled={socialLoading !== null}
          />
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with email</span>
          </div>
        </div>

        <MobileForm onSubmit={handleSubmit}>
          <MobileInput
            type="email"
            name="email"
            label="Email Address"
            value={formData.email}
            onChange={handleChange}
            icon={Mail}
            required
          />

          <div className="relative">
            <MobileInput
              type={showPassword ? 'text' : 'password'}
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              icon={Lock}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-11 md:top-9 text-gray-400 hover:text-gray-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <TouchFriendlyButton
            type="submit"
            fullWidth
            loading={loading}
            disabled={loading || socialLoading !== null}
          >
            Sign In
          </TouchFriendlyButton>
        </MobileForm>

        <div className="mt-6 text-center">
          <Link to="#" className="text-indigo-600 hover:text-indigo-700 text-xs md:text-sm">
            Forgot your password?
          </Link>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm md:text-base text-gray-600">
            Don't have an account?{' '}
            <Link to={ROUTES.REGISTER} className="text-indigo-600 hover:text-indigo-700 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};