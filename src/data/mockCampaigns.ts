// src/data/mockCampaigns.ts

// Interface for the mock campaign data (add this to your types/index.ts)
export interface MockCampaign {
  id: number;
  brand: string;
  title: string;
  budget: string;  // Display format like "$1,200-2,000"
  budgetRange: { min: number; max: number };
  deadline: string;  // Display format like "5 days left"
  location: string;
  isRemote: boolean;
  category: string;
  followers: string;  // Display format like "25K-100K"
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

// 5 Comprehensive Test Opportunities
export const enhancedMockCampaigns: MockCampaign[] = [
  {
    id: 1,
    brand: 'TechFlow',
    title: 'AI Smartphone Launch - Tech Review Campaign',
    budget: '$1,200-2,000',
    budgetRange: { min: 1200, max: 2000 },
    deadline: '5 days left',
    location: 'Remote',
    isRemote: true,
    category: 'Tech',
    followers: '25K-100K',
    followerRange: { min: 25000, max: 100000 },
    contentType: ['Instagram Reel', 'YouTube Video', 'Instagram Post'],
    deliverables: ['1 Unboxing Reel', '1 Review Video', '2 Posts', '5 Stories'],
    description: 'Looking for tech enthusiasts to create authentic unboxing and review content for our latest AI-powered smartphone. Must have experience with tech reviews.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    applications: 23,
    isNew: true,
    urgency: 'high',
    tags: ['tech', 'smartphone', 'AI', 'unboxing', 'review', 'gadgets'],
    requirements: ['Tech-focused content', 'Previous brand collaborations', 'High engagement rate'],
    duration: '2 weeks'
  },
  {
    id: 2,
    brand: 'FashionForward',
    title: 'Monsoon Collection - Style Challenge',
    budget: '$600-1,000',
    budgetRange: { min: 600, max: 1000 },
    deadline: '2 weeks left',
    location: 'Mumbai, India',
    isRemote: false,
    category: 'Fashion',
    followers: '10K-50K',
    followerRange: { min: 10000, max: 50000 },
    contentType: ['Instagram Post', 'Instagram Reel', 'Instagram Story'],
    deliverables: ['3 Outfit Posts', '2 Styling Reels', '10 Stories', '1 IGTV'],
    description: 'Showcase our vibrant monsoon collection with your unique styling. Looking for fashion influencers in Mumbai for outdoor shoots.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
    applications: 45,
    isNew: false,
    urgency: 'medium',
    tags: ['fashion', 'monsoon', 'styling', 'outfit', 'trendy', 'seasonal'],
    requirements: ['Mumbai-based', 'Fashion-focused profile', 'Outdoor shoot availability'],
    duration: '3 weeks'
  },
  {
    id: 3,
    brand: 'HealthFirst',
    title: 'Micro-Influencer Fitness Challenge',
    budget: '$300-500',
    budgetRange: { min: 300, max: 500 },
    deadline: '1 week left',
    location: 'Remote',
    isRemote: true,
    category: 'Health',
    followers: '1K-15K',
    followerRange: { min: 1000, max: 15000 },
    contentType: ['Instagram Story', 'Instagram Reel', 'Instagram Post'],
    deliverables: ['Daily Stories (30 days)', '4 Workout Reels', '2 Progress Posts'],
    description: 'Perfect for micro-influencers! Document your 30-day fitness transformation using our supplement line. Great for building your portfolio.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    applications: 12,
    isNew: true,
    urgency: 'high',
    tags: ['fitness', 'health', 'supplements', 'transformation', 'workout', 'micro-influencer'],
    requirements: ['Fitness journey documentation', 'Consistent posting', 'Before/after photos'],
    duration: '30 days'
  },
  {
    id: 4,
    brand: 'FoodieDelights',
    title: 'Regional Food Festival - Local Creators',
    budget: '$800-1,200',
    budgetRange: { min: 800, max: 1200 },
    deadline: '3 days left',
    location: 'Delhi, India',
    isRemote: false,
    category: 'Food',
    followers: '5K-30K',
    followerRange: { min: 5000, max: 30000 },
    contentType: ['Instagram Reel', 'YouTube Short', 'Instagram Post'],
    deliverables: ['5 Recipe Reels', '2 Event Posts', '15 Stories', '1 YouTube Short'],
    description: 'Create mouth-watering content at Delhi Food Festival. Looking for local food creators with authentic regional cuisine knowledge.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    applications: 67,
    isNew: false,
    urgency: 'high',
    tags: ['food', 'regional', 'festival', 'delhi', 'cuisine', 'recipes'],
    requirements: ['Delhi-based', 'Food photography skills', 'Event availability'],
    duration: '1 week'
  },
  {
    id: 5,
    brand: 'WanderlustTravel',
    title: 'Luxury Resort Experience - Travel Vlog',
    budget: '$2,000-3,500',
    budgetRange: { min: 2000, max: 3500 },
    deadline: '10 days left',
    location: 'Goa, India',
    isRemote: false,
    category: 'Travel',
    followers: '50K-200K',
    followerRange: { min: 50000, max: 200000 },
    contentType: ['YouTube Video', 'Instagram Reel', 'Instagram Post', 'Instagram Story'],
    deliverables: ['1 Travel Vlog (10+ min)', '3 Resort Reels', '5 Posts', '20+ Stories'],
    description: 'All-expenses-paid luxury resort stay in Goa. Create stunning travel content showcasing premium hospitality and experiences.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    applications: 156,
    isNew: true,
    urgency: 'medium',
    tags: ['travel', 'luxury', 'resort', 'goa', 'hospitality', 'vacation'],
    requirements: ['Travel content experience', 'High-quality video production', 'Professional equipment'],
    duration: '1 week stay + 2 weeks content delivery'
  }
];

// Enhanced filter options for the expanded filtering system
export const filterOptions = {
  categories: ['all', 'Tech', 'Fashion', 'Health', 'Food', 'Travel', 'Lifestyle'],
  
  budgetRanges: [
    { label: 'All Budgets', min: 0, max: Infinity },
    { label: '$0 - $500', min: 0, max: 500 },
    { label: '$500 - $1,000', min: 500, max: 1000 },
    { label: '$1,000 - $2,000', min: 1000, max: 2000 },
    { label: '$2,000+', min: 2000, max: Infinity }
  ],
  
  locations: [
    'All Locations',
    'Remote',
    'Mumbai, India',
    'Delhi, India', 
    'Bangalore, India',
    'Chennai, India',
    'Pune, India',
    'Goa, India'
  ],
  
  contentTypes: [
    'Instagram Post',
    'Instagram Reel', 
    'Instagram Story',
    'YouTube Video',
    'YouTube Short',
    'IGTV'
  ],
  
  followerRanges: [
    { label: 'All Ranges', min: 0, max: Infinity },
    { label: '1K - 10K', min: 1000, max: 10000 },
    { label: '10K - 50K', min: 10000, max: 50000 },
    { label: '50K - 100K', min: 50000, max: 100000 },
    { label: '100K+', min: 100000, max: Infinity }
  ],
  
  urgencyLevels: ['all', 'low', 'medium', 'high']
};

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