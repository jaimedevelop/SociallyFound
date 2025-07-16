// services/userService.js
import { BaseService } from './shared/baseService.js';
import { dateUtils, validation, transform } from './shared/utils.js';
import { updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/index.js';

class UserService extends BaseService {
  constructor() {
    super('users');
  }

  // Create user profile (used during registration)
  async createUserProfile(uid, userData) {
    try {
      const profileData = transform.cleanObject({
        uid,
        email: userData.email,
        displayName: userData.displayName || userData.email?.split('@')[0],
        photoURL: userData.photoURL || null,
        userType: userData.userType, // 'influencer' or 'brand'
        isOnboardingComplete: false,
        preferences: {
          notifications: {
            email: true,
            push: true,
            marketing: false
          },
          privacy: {
            profileVisible: true,
            showEmail: false
          }
        },
        profile: userData.userType === 'influencer' ? {
          bio: '',
          location: '',
          socialMediaHandles: {
            instagram: '',
            youtube: '',
            tiktok: '',
            twitter: ''
          },
          categories: [],
          followerCount: {
            instagram: 0,
            youtube: 0,
            tiktok: 0,
            twitter: 0
          }
        } : {
          companyName: '',
          website: '',
          industry: '',
          companySize: '',
          description: ''
        }
      });

      await this.createWithId(uid, profileData);
      return profileData;
    } catch (error) {
      throw error;
    }
  }

  // Get user profile
  async getUserProfile(uid) {
    return this.getById(uid);
  }

  // Update user profile
  async updateUserProfile(uid, updateData) {
    // Validate required fields if updating core info
    if (updateData.email || updateData.displayName) {
      const validation_result = validation.validateRequired(updateData, ['email', 'displayName']);
      if (!validation_result.isValid) {
        throw new Error(`Validation failed: ${Object.values(validation_result.errors).join(', ')}`);
      }
      
      if (updateData.email && !validation.isValidEmail(updateData.email)) {
        throw new Error('Invalid email format');
      }
    }

    return this.update(uid, updateData);
  }

  // Update last login time
  async updateLastLogin(uid) {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        lastLoginAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.warn('Failed to update last login time:', error);
      return false;
    }
  }

  // Complete onboarding
  async completeOnboarding(uid, onboardingData) {
    const updateData = {
      ...onboardingData,
      isOnboardingComplete: true,
      onboardingCompletedAt: new Date()
    };
    
    return this.updateUserProfile(uid, updateData);
  }

  // Update user preferences
  async updatePreferences(uid, preferences) {
    return this.update(uid, { preferences });
  }

  // Update social media handles (for influencers)
  async updateSocialMediaHandles(uid, handles) {
    const updateData = {
      'profile.socialMediaHandles': handles
    };
    
    return this.update(uid, updateData);
  }

  // Update follower counts (for influencers)
  async updateFollowerCounts(uid, followerCounts) {
    const updateData = {
      'profile.followerCount': followerCounts
    };
    
    return this.update(uid, updateData);
  }

  // Update company info (for brands)
  async updateCompanyInfo(uid, companyData) {
    const updateData = {};
    
    // Map company data to profile fields
    Object.keys(companyData).forEach(key => {
      updateData[`profile.${key}`] = companyData[key];
    });
    
    return this.update(uid, updateData);
  }

  // Get users by type (for admin purposes)
  async getUsersByType(userType, limit = 50) {
    const filters = {
      where: [['userType', '==', userType]],
      orderBy: [['createdAt', 'desc']],
      limit
    };
    
    return this.getWithFilters(filters);
  }

  // Search users (basic text search)
  async searchUsers(searchTerm, userType = null, limit = 20) {
    // Note: Firestore doesn't support full-text search natively
    // This is a basic implementation - consider using Algolia or similar for production
    const filters = {
      orderBy: [['displayName', 'asc']],
      limit
    };
    
    if (userType) {
      filters.where = [['userType', '==', userType]];
    }
    
    const users = await this.getWithFilters(filters);
    
    // Client-side filtering (not ideal for large datasets)
    return users.filter(user => 
      user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Get user statistics
  async getUserStats(uid) {
    const user = await this.getUserProfile(uid);
    
    if (!user) return null;
    
    // Basic stats - can be expanded based on user type
    const stats = {
      joinedDate: user.createdAt,
      lastActive: user.lastLoginAt,
      profileCompleteness: this.calculateProfileCompleteness(user)
    };
    
    if (user.userType === 'influencer') {
      // Add influencer-specific stats
      stats.totalFollowers = Object.values(user.profile?.followerCount || {})
        .reduce((sum, count) => sum + (count || 0), 0);
      stats.platformCount = Object.values(user.profile?.socialMediaHandles || {})
        .filter(handle => handle && handle.trim() !== '').length;
    } else if (user.userType === 'brand') {
      // Add brand-specific stats (campaigns, etc. - to be implemented)
      stats.companyName = user.profile?.companyName;
      stats.industry = user.profile?.industry;
    }
    
    return stats;
  }

  // Calculate profile completeness percentage
  calculateProfileCompleteness(user) {
    const requiredFields = ['displayName', 'email'];
    const optionalFields = user.userType === 'influencer' 
      ? ['profile.bio', 'profile.location', 'profile.categories']
      : ['profile.companyName', 'profile.industry', 'profile.description'];
    
    let completed = 0;
    let total = requiredFields.length + optionalFields.length;
    
    // Check required fields
    requiredFields.forEach(field => {
      if (this.getNestedValue(user, field)) completed++;
    });
    
    // Check optional fields
    optionalFields.forEach(field => {
      const value = this.getNestedValue(user, field);
      if (value && (Array.isArray(value) ? value.length > 0 : value.toString().trim() !== '')) {
        completed++;
      }
    });
    
    return Math.round((completed / total) * 100);
  }

  // Helper method to get nested object values
  getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }
}

// Create and export singleton instance
const userService = new UserService();
export default userService;

// Export individual methods for convenience
export const {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
  updateLastLogin,
  completeOnboarding,
  updatePreferences,
  updateSocialMediaHandles,
  updateFollowerCounts,
  updateCompanyInfo,
  getUsersByType,
  searchUsers,
  getUserStats
} = userService;