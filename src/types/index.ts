export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  userType: 'influencer' | 'brand';
  createdAt: Date;
  lastLoginAt: Date;
  isOnboardingComplete?: boolean;
}

export interface InfluencerProfile extends User {
  userType: 'influencer';
  followers?: number;
  engagement?: number;
  categories?: string[];
  bio?: string;
  socialLinks?: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    twitter?: string;
  };
  demographics?: {
    age?: number;
    location?: string;
    gender?: string;
  };
  rates?: {
    postRate?: number;
    storyRate?: number;
    reelRate?: number;
  };
  portfolio?: {
    images: string[];
    videos: string[];
  };
}

export interface BrandProfile extends User {
  userType: 'brand';
  companyName?: string;
  industry?: string;
  description?: string;
  website?: string;
  logo?: string;
  budget?: {
    min: number;
    max: number;
  };
  targetAudience?: string[];
  companySize?: string;
  location?: string;
}

export interface Campaign {
  id: string;
  brandId: string;
  title: string;
  description: string;
  budget: number;
  timeline: {
    startDate: Date;
    endDate: Date;
    applicationDeadline: Date;
  };
  requirements: {
    categories: string[];
    minFollowers: number;
    demographics: string[];
  };
  deliverables: string[];
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  applicants: string[];
  selectedInfluencers: string[];
  createdAt: Date;
}

export interface Collaboration {
  id: string;
  campaignId: string;
  influencerId: string;
  brandId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'in_progress' | 'completed';
  proposedRate: number;
  messages: Message[];
  deliverables: Deliverable[];
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Deliverable {
  id: string;
  type: 'post' | 'story' | 'reel' | 'video';
  content: string;
  url?: string;
  submittedAt?: Date;
  approved: boolean;
  feedback?: string;
}

export interface AuthContextType {
  user: User | null;
  profile: InfluencerProfile | BrandProfile | null;
  loading: boolean;
  error: string | null;  // Add this
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userType: 'influencer' | 'brand') => Promise<void>;
  signInWithGoogle: (userType?: 'influencer' | 'brand') => Promise<void>;
  signInWithApple: (userType?: 'influencer' | 'brand') => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<InfluencerProfile | BrandProfile>) => Promise<void>;
  completeOnboarding: () => Promise<void>;
  clearError: () => void;  // Add this
}

export interface MockCampaign {
  id: number;
  brand: string;
  title: string;
  budget: string;
  budgetRange: { min: number; max: number };
  deadline: string;
  location: string;
  isRemote: boolean;
  category: string;
  followers: string;
  followerRange: { min: number; max: number };
  contentType: string[];
  deliverables: string[];
  description: string;
  image: string;
  applications: number;
  isNew: boolean;
  urgency: 'low' | 'medium' | 'high';
  tags: string[];
  requirements: string[];
  duration: string;
}

// Type definitions for filter state
export interface FilterState {
  category: string;
  budgetRange: { min: number; max: number };
  location: string;
  contentTypes: string[];
  followerRange: { min: number; max: number };
  urgency: string;
  isRemote?: boolean;
}

// Default filter state
export const defaultFilters: FilterState = {
  category: 'all',
  budgetRange: { min: 0, max: Infinity },
  location: 'All Locations',
  contentTypes: [],
  followerRange: { min: 0, max: Infinity },
  urgency: 'all'
};