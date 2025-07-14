// pages/Home.tsx - Updated with UserStats integration for logged-in users
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserStats } from '../components/profile';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { 
  Users, 
  Megaphone, 
  BarChart3, 
  MessageSquare, 
  Shield, 
  Zap,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { ROUTES } from '../constants';

export const Home: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Users,
      title: 'Smart Matching',
      description: 'AI-powered algorithm matches brands with the perfect influencers based on audience, engagement, and brand values.'
    },
    {
      icon: Megaphone,
      title: 'Campaign Management',
      description: 'Create, manage, and track campaigns with built-in project management tools and automated workflows.'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Real-time performance tracking with detailed insights into reach, engagement, and ROI metrics.'
    },
    {
      icon: MessageSquare,
      title: 'Direct Communication',
      description: 'Streamlined messaging system for seamless collaboration between brands and influencers.'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Protected payment processing with milestone-based payments and dispute resolution.'
    },
    {
      icon: Zap,
      title: 'Instant Approvals',
      description: 'Quick campaign approvals with automated content review and feedback systems.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fashion Influencer',
      content: 'SociallyFound has completely transformed how I collaborate with brands. The platform makes finding the right partnerships effortless.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Mike Chen',
      role: 'Brand Manager at TechStyle',
      content: 'The analytics and campaign management tools are incredible. We\'ve seen a 300% increase in campaign effectiveness.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Lifestyle Blogger',
      content: 'Finally, a platform that understands both sides of influencer marketing. The payment system is seamless and trustworthy.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Active Influencers' },
    { value: '10K+', label: 'Brands' },
    { value: '$5M+', label: 'Creator Earnings' },
    { value: '95%', label: 'Success Rate' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Where Brands Meet
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Authentic Influencers
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Connect, collaborate, and create impactful campaigns with the most advanced influencer marketing platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={user ? ROUTES.DASHBOARD : ROUTES.REGISTER}>
                <Button size="lg" className="text-lg px-8 py-4">
                  {user ? 'Go to Dashboard' : 'Get Started Free'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-indigo-900">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* User Stats Section - Only show if user is logged in */}
      {user && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Performance Overview</h2>
              <p className="text-gray-600">Track your success on SociallyFound</p>
            </div>
            <UserStats timeframe="30d" compact />
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools you need for successful influencer marketing campaigns
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} hover className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in minutes with our simple 3-step process
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Your Profile</h3>
              <p className="text-gray-600">Set up your profile with your audience demographics, content style, and collaboration preferences</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Matched</h3>
              <p className="text-gray-600">Our AI algorithm matches you with the perfect collaboration opportunities based on your profile</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Collaborating</h3>
              <p className="text-gray-600">Create amazing content, track performance, and get paid securely through our platform</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of successful creators and brands
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center justify-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Influencer Marketing?
          </h2>
          <p className="text-xl mb-8 text-indigo-100">
            Join thousands of creators and brands already using SociallyFound
          </p>
          <Link to={user ? ROUTES.DASHBOARD : ROUTES.REGISTER}>
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-4">
              {user ? 'Go to Dashboard' : 'Get Started Today'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
