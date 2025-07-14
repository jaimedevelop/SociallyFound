import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TouchFriendlyButton } from '../components/mobile/TouchFriendlyButton';
import { MobileInput, MobileForm } from '../components/mobile/MobileForm';
import { SocialLoginButton } from '../components/auth/SocialLoginButton';
import { UserTypeSelector } from '../components/auth/UserTypeSelector';
import { Card } from '../components/ui/Card';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { ROUTES } from '../constants';

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'influencer' as 'influencer' | 'brand'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'apple' | null>(null);
  
  const { signUp, signInWithGoogle, signInWithApple } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await signUp(formData.email, formData.password, formData.userType);
      navigate(ROUTES.DASHBOARD);
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    setError('');
    setSocialLoading(provider);

    try {
      if (provider === 'google') {
        await signInWithGoogle(formData.userType);
      } else {
        await signInWithApple(formData.userType);
      }
      navigate(ROUTES.DASHBOARD);
    } catch (err: any) {
      setError(err.message || `Failed to sign up with ${provider}`);
    } finally {
      setSocialLoading(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUserTypeChange = (userType: 'influencer' | 'brand') => {
    setFormData({
      ...formData,
      userType
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-lg md:text-2xl">SF</span>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Join SociallyFound</h1>
          <p className="text-sm md:text-base text-gray-600">Create your account to get started</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600 text-xs md:text-sm">{error}</p>
          </div>
        )}

        {/* User Type Selection */}
        <UserTypeSelector
          selectedType={formData.userType}
          onTypeChange={handleUserTypeChange}
          className="mb-6"
        />

        {/* Social Login Buttons */}
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

        {/* Divider */}
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

          <div className="relative">
            <MobileInput
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              icon={Lock}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-11 md:top-9 text-gray-400 hover:text-gray-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <TouchFriendlyButton
            type="submit"
            fullWidth
            loading={loading}
            disabled={loading || socialLoading !== null}
          >
            Create Account
          </TouchFriendlyButton>
        </MobileForm>

        <div className="mt-6 text-center">
          <p className="text-sm md:text-base text-gray-600">
            Already have an account?{' '}
            <Link to={ROUTES.LOGIN} className="text-indigo-600 hover:text-indigo-700 font-semibold">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs md:text-sm text-gray-500">
            By creating an account, you agree to our{' '}
            <Link to="#" className="text-indigo-600 hover:text-indigo-700">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="#" className="text-indigo-600 hover:text-indigo-700">
              Privacy Policy
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};