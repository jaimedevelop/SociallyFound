// components/RoleBasedDashboard.tsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { InfluencerProfile, BrandProfile } from '../../types';

interface RoleBasedDashboardProps {
  children?: React.ReactNode;
}

export const RoleBasedDashboard: React.FC<RoleBasedDashboardProps> = ({ children }) => {
  const { user, profile } = useAuth();

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user.userType === 'influencer' ? (
        <InfluencerDashboard profile={profile as InfluencerProfile} />
      ) : (
        <BrandDashboard profile={profile as BrandProfile} />
      )}
      {children}
    </div>
  );
};

const InfluencerDashboard: React.FC<{ profile: InfluencerProfile }> = ({ profile }) => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {profile.displayName}!</h1>
        <p className="text-gray-600 mt-2">Discover new opportunities and manage your collaborations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className="text-sm text-gray-600">Active Applications</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">3</div>
                <div className="text-sm text-gray-600">Ongoing Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">$2,450</div>
                <div className="text-sm text-gray-600">This Month</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">8</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Strength</h3>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Completion</span>
              <span>85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <p className="mb-2">Add portfolio items to reach 100%</p>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              Complete Profile →
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Opportunities</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Fashion Brand Campaign</div>
                  <div className="text-sm text-gray-600">Posted 2 days ago</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-green-600">$500</div>
                  <div className="text-sm text-gray-600">Budget</div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full text-blue-600 hover:text-blue-800 font-medium">
            View All Opportunities
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Collaborations</h3>
          <div className="space-y-3">
            {[1, 2].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Tech Product Review</div>
                  <div className="text-sm text-gray-600">Due in 3 days</div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                    In Progress
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full text-blue-600 hover:text-blue-800 font-medium">
            View All Collaborations
          </button>
        </div>
      </div>
    </div>
  );
};

const BrandDashboard: React.FC<{ profile: BrandProfile }> = ({ profile }) => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {profile.companyName || profile.displayName}!</h1>
        <p className="text-gray-600 mt-2">Manage your campaigns and find the perfect creators</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaign Stats */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Campaign Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">5</div>
                <div className="text-sm text-gray-600">Active Campaigns</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">47</div>
                <div className="text-sm text-gray-600">Total Applications</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">12</div>
                <div className="text-sm text-gray-600">Hired Creators</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">$8,500</div>
                <div className="text-sm text-gray-600">Monthly Spend</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
              Create Campaign
            </button>
            <button className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">
              Browse Creators
            </button>
            <button className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">
              View Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Campaign Management */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Campaigns</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Summer Collection Launch</div>
                  <div className="text-sm text-gray-600">15 applications</div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full text-blue-600 hover:text-blue-800 font-medium">
            View All Campaigns
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Reviews</h3>
          <div className="space-y-3">
            {[1, 2].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">@fashionista_sarah</div>
                  <div className="text-sm text-gray-600">Applied 2 days ago</div>
                </div>
                <div className="text-right">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full text-blue-600 hover:text-blue-800 font-medium">
            View All Applications
          </button>
        </div>
      </div>
    </div>
  );
};