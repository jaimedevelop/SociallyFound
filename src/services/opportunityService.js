// services/opportunityService.js
import { BaseService } from './shared/baseService.js';
import { validation, transform, queryBuilder } from './shared/utils.js';
import { onSnapshot, query, where, orderBy, limit } from 'firebase/firestore';

class OpportunityService extends BaseService {
  constructor() {
    super('opportunities');
  }

  // Create a new opportunity (legacy support - campaigns are preferred)
  async createOpportunity(opportunityData, brandId) {
    try {
      // Validate required fields
      const requiredFields = ['title', 'description', 'category', 'budget'];
      const validationResult = validation.validateRequired(opportunityData, requiredFields);
      
      if (!validationResult.isValid) {
        throw new Error(`Validation failed: ${Object.values(validationResult.errors).join(', ')}`);
      }

      // Validate budget
      if (!validation.isValidBudget(opportunityData.budget)) {
        throw new Error('Invalid budget format');
      }

      // Prepare opportunity data
      const dbData = transform.cleanObject({
        ...opportunityData,
        brandId,
        budget: validation.sanitizeBudget(opportunityData.budget),
        status: opportunityData.status || 'active',
        applicationsCount: 0,
        views: 0,
        deadline: opportunityData.deadline ? new Date(opportunityData.deadline) : null,
        targetUserType: 'influencer' // Opportunities are for influencers
      });

      const opportunityId = await this.create(dbData);
      
      return {
        id: opportunityId,
        ...dbData
      };
    } catch (error) {
      throw error;
    }
  }

  // Get single opportunity by ID
  async getOpportunity(opportunityId) {
    return this.getById(opportunityId);
  }

  // Get opportunities with filters (for influencers to browse)
  async getOpportunities(filters = {}) {
    try {
      const queryFilters = {
        where: [['status', '==', 'active']], // Only show active opportunities
        orderBy: [['createdAt', 'desc']]
      };

      // Add category filter
      if (filters.category && filters.category !== 'all') {
        queryFilters.where.push(['category', '==', filters.category]);
      }

      // Add budget filters
      if (filters.minBudget) {
        queryFilters.where.push(['budget', '>=', filters.minBudget]);
      }
      
      if (filters.maxBudget) {
        queryFilters.where.push(['budget', '<=', filters.maxBudget]);
      }

      // Add limit
      if (filters.limit) {
        queryFilters.limit = filters.limit;
      }

      return this.getWithFilters(queryFilters);
    } catch (error) {
      throw error;
    }
  }

  // Get opportunities by category
  async getOpportunitiesByCategory(category, limit = 50) {
    return this.getOpportunities({ category, limit });
  }

  // Search opportunities
  async searchOpportunities(searchTerm, filters = {}) {
    try {
      const opportunities = await this.getOpportunities(filters);
      
      // Client-side search (not ideal for large datasets)
      return opportunities.filter(opportunity =>
        opportunity.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opportunity.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opportunity.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (error) {
      throw error;
    }
  }

  // Get brand's opportunities
  async getBrandOpportunities(brandId, filters = {}) {
    try {
      const queryFilters = {
        where: [['brandId', '==', brandId]],
        orderBy: [['createdAt', 'desc']]
      };

      // Add status filter
      if (filters.status) {
        queryFilters.where.push(['status', '==', filters.status]);
      }

      // Add limit
      if (filters.limit) {
        queryFilters.limit = filters.limit;
      }

      return this.getWithFilters(queryFilters);
    } catch (error) {
      throw error;
    }
  }

  // Update opportunity
  async updateOpportunity(opportunityId, updateData, brandId = null) {
    try {
      // Verify brand ownership if brandId provided
      if (brandId) {
        const opportunity = await this.getById(opportunityId);
        if (!opportunity || opportunity.brandId !== brandId) {
          throw new Error('Unauthorized: You can only update your own opportunities');
        }
      }

      // Validate budget if being updated
      if (updateData.budget && !validation.isValidBudget(updateData.budget)) {
        throw new Error('Invalid budget format');
      }

      // Prepare update data
      const dbUpdateData = { ...updateData };
      
      // Convert budget to number if provided
      if (dbUpdateData.budget) {
        dbUpdateData.budget = validation.sanitizeBudget(dbUpdateData.budget);
      }

      // Convert deadline to Date if provided
      if (dbUpdateData.deadline) {
        dbUpdateData.deadline = new Date(dbUpdateData.deadline);
      }

      await this.update(opportunityId, dbUpdateData);
      return this.getById(opportunityId);
    } catch (error) {
      throw error;
    }
  }

  // Update opportunity status
  async updateOpportunityStatus(opportunityId, status, brandId = null) {
    const validStatuses = ['active', 'paused', 'closed', 'completed'];
    
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    return this.updateOpportunity(opportunityId, { 
      status,
      ...(status === 'closed' && { closedAt: new Date() }),
      ...(status === 'completed' && { completedAt: new Date() })
    }, brandId);
  }

  // Delete opportunity
  async deleteOpportunity(opportunityId, brandId = null) {
    try {
      // Verify brand ownership if brandId provided
      if (brandId) {
        const opportunity = await this.getById(opportunityId);
        if (!opportunity || opportunity.brandId !== brandId) {
          throw new Error('Unauthorized: You can only delete your own opportunities');
        }
      }

      return this.delete(opportunityId);
    } catch (error) {
      throw error;
    }
  }

  // Increment opportunity views
  async incrementViews(opportunityId) {
    try {
      const opportunity = await this.getById(opportunityId);
      if (opportunity) {
        await this.update(opportunityId, {
          views: (opportunity.views || 0) + 1
        });
      }
      return true;
    } catch (error) {
      console.warn('Failed to increment opportunity views:', error);
      return false;
    }
  }

  // Increment applications count
  async incrementApplications(opportunityId) {
    try {
      const opportunity = await this.getById(opportunityId);
      if (opportunity) {
        await this.update(opportunityId, {
          applicationsCount: (opportunity.applicationsCount || 0) + 1
        });
      }
      return true;
    } catch (error) {
      console.warn('Failed to increment applications count:', error);
      return false;
    }
  }

  // Get trending opportunities (most viewed/applied)
  async getTrendingOpportunities(limit = 10) {
    try {
      // Get recent active opportunities
      const recentOpportunities = await this.getOpportunities({ limit: 50 });
      
      // Sort by combined views and applications
      const trending = recentOpportunities
        .map(opp => ({
          ...opp,
          trendingScore: (opp.views || 0) + ((opp.applicationsCount || 0) * 5) // Weight applications higher
        }))
        .sort((a, b) => b.trendingScore - a.trendingScore)
        .slice(0, limit);

      return trending;
    } catch (error) {
      throw error;
    }
  }

  // Get opportunities expiring soon
  async getExpiringOpportunities(days = 7) {
    try {
      const opportunities = await this.getOpportunities();
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + days);

      return opportunities.filter(opportunity => {
        if (!opportunity.deadline) return false;
        const deadline = new Date(opportunity.deadline);
        return deadline <= futureDate && deadline >= new Date();
      });
    } catch (error) {
      throw error;
    }
  }

  // Get opportunities by budget range
  async getOpportunitiesByBudgetRange(minBudget, maxBudget, filters = {}) {
    return this.getOpportunities({
      ...filters,
      minBudget,
      maxBudget
    });
  }

  // Real-time subscription to opportunities
  subscribeToOpportunities(callback, filters = {}) {
    try {
      let q = query(
        this.collectionRef,
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc')
      );

      // Apply category filter
      if (filters.category && filters.category !== 'all') {
        q = query(q, where('category', '==', filters.category));
      }

      // Apply limit
      if (filters.limit) {
        q = query(q, limit(filters.limit));
      }

      return onSnapshot(q, (snapshot) => {
        const opportunities = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        callback(opportunities);
      }, (error) => {
        console.error('Opportunities subscription error:', error);
        callback([]);
      });
    } catch (error) {
      console.error('Failed to subscribe to opportunities:', error);
      callback([]);
    }
  }

  // Real-time subscription to brand opportunities
  subscribeToBrandOpportunities(brandId, callback, filters = {}) {
    try {
      let q = query(
        this.collectionRef,
        where('brandId', '==', brandId),
        orderBy('createdAt', 'desc')
      );

      // Apply status filter
      if (filters.status) {
        q = query(q, where('status', '==', filters.status));
      }

      return onSnapshot(q, (snapshot) => {
        const opportunities = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        callback(opportunities);
      }, (error) => {
        console.error('Brand opportunities subscription error:', error);
        callback([]);
      });
    } catch (error) {
      console.error('Failed to subscribe to brand opportunities:', error);
      callback([]);
    }
  }

  // Get opportunity statistics for brand dashboard
  async getOpportunityStats(brandId) {
    try {
      const opportunities = await this.getBrandOpportunities(brandId);
      
      const stats = {
        total: opportunities.length,
        active: opportunities.filter(o => o.status === 'active').length,
        paused: opportunities.filter(o => o.status === 'paused').length,
        closed: opportunities.filter(o => o.status === 'closed').length,
        completed: opportunities.filter(o => o.status === 'completed').length,
        totalBudget: opportunities.reduce((sum, opportunity) => sum + (opportunity.budget || 0), 0),
        totalApplications: opportunities.reduce((sum, opportunity) => sum + (opportunity.applicationsCount || 0), 0),
        totalViews: opportunities.reduce((sum, opportunity) => sum + (opportunity.views || 0), 0),
        averageBudget: opportunities.length > 0 ? 
          Math.round(opportunities.reduce((sum, opportunity) => sum + (opportunity.budget || 0), 0) / opportunities.length) : 0
      };

      return stats;
    } catch (error) {
      throw error;
    }
  }

  // Get recommended opportunities for influencer based on profile
  async getRecommendedOpportunities(influencerProfile, limit = 20) {
    try {
      // Basic recommendation based on categories and follower count
      const allOpportunities = await this.getOpportunities({ limit: 100 });
      
      // Score opportunities based on relevance
      const scoredOpportunities = allOpportunities.map(opportunity => {
        let score = 0;
        
        // Category match
        if (influencerProfile.categories && influencerProfile.categories.includes(opportunity.category)) {
          score += 10;
        }
        
        // Follower count compatibility (basic logic)
        const totalFollowers = Object.values(influencerProfile.followerCount || {})
          .reduce((sum, count) => sum + (count || 0), 0);
        
        if (totalFollowers >= 1000 && totalFollowers <= 100000) {
          score += 5; // Good for micro-influencers
        }
        
        // Recent opportunities get slight boost
        const daysSinceCreated = (new Date() - new Date(opportunity.createdAt)) / (1000 * 60 * 60 * 24);
        if (daysSinceCreated <= 7) {
          score += 2;
        }
        
        return {
          ...opportunity,
          recommendationScore: score
        };
      });
      
      // Sort by score and return top results
      return scoredOpportunities
        .sort((a, b) => b.recommendationScore - a.recommendationScore)
        .slice(0, limit);
    } catch (error) {
      throw error;
    }
  }

  // Archive old completed opportunities
  async archiveOldOpportunities(brandId, olderThanDays = 90) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

      const opportunities = await this.getBrandOpportunities(brandId, { status: 'completed' });
      const toArchive = opportunities.filter(opportunity => 
        opportunity.completedAt && new Date(opportunity.completedAt) < cutoffDate
      );

      let archivedCount = 0;
      for (const opportunity of toArchive) {
        await this.updateOpportunityStatus(opportunity.id, 'archived', brandId);
        archivedCount++;
      }

      return archivedCount;
    } catch (error) {
      throw error;
    }
  }

  // Duplicate opportunity (create copy)
  async duplicateOpportunity(opportunityId, brandId) {
    try {
      const originalOpportunity = await this.getById(opportunityId);
      
      if (!originalOpportunity) {
        throw new Error('Opportunity not found');
      }

      // Verify ownership
      if (originalOpportunity.brandId !== brandId) {
        throw new Error('Unauthorized: You can only duplicate your own opportunities');
      }

      // Create copy with modified data
      const duplicateData = {
        ...originalOpportunity,
        title: `${originalOpportunity.title} (Copy)`,
        status: 'active',
        applicationsCount: 0,
        views: 0
      };

      // Remove fields that shouldn't be copied
      delete duplicateData.id;
      delete duplicateData.createdAt;
      delete duplicateData.updatedAt;

      return this.createOpportunity(duplicateData, brandId);
    } catch (error) {
      throw error;
    }
  }

  // Get opportunities by multiple categories
  async getOpportunitiesByCategories(categories, filters = {}) {
    try {
      if (!Array.isArray(categories) || categories.length === 0) {
        return this.getOpportunities(filters);
      }

      // Since Firestore doesn't support OR queries easily, we'll fetch all and filter
      const allOpportunities = await this.getOpportunities({
        ...filters,
        limit: filters.limit || 100
      });

      return allOpportunities.filter(opportunity => 
        categories.includes(opportunity.category)
      );
    } catch (error) {
      throw error;
    }
  }

  // Get opportunity performance metrics
  async getOpportunityPerformance(opportunityId) {
    try {
      const opportunity = await this.getById(opportunityId);
      
      if (!opportunity) {
        return null;
      }

      const daysSinceCreated = (new Date() - new Date(opportunity.createdAt)) / (1000 * 60 * 60 * 24);
      const viewsPerDay = daysSinceCreated > 0 ? Math.round((opportunity.views || 0) / daysSinceCreated) : 0;
      const applicationsPerDay = daysSinceCreated > 0 ? Math.round((opportunity.applicationsCount || 0) / daysSinceCreated) : 0;
      
      return {
        ...opportunity,
        performance: {
          daysSinceCreated: Math.round(daysSinceCreated),
          viewsPerDay,
          applicationsPerDay,
          conversionRate: opportunity.views > 0 ? 
            Math.round(((opportunity.applicationsCount || 0) / opportunity.views) * 100) : 0
        }
      };
    } catch (error) {
      throw error;
    }
  }
}

// Create and export singleton instance
const opportunityService = new OpportunityService();
export default opportunityService;

// Export individual methods for convenience
export const {
  createOpportunity,
  getOpportunity,
  getOpportunities,
  getOpportunitiesByCategory,
  searchOpportunities,
  getBrandOpportunities,
  updateOpportunity,
  updateOpportunityStatus,
  deleteOpportunity,
  incrementViews,
  incrementApplications,
  getTrendingOpportunities,
  getExpiringOpportunities,
  getOpportunitiesByBudgetRange,
  subscribeToOpportunities,
  subscribeToBrandOpportunities,
  getOpportunityStats,
  getRecommendedOpportunities,
  duplicateOpportunity,
  getOpportunityPerformance
} = opportunityService;