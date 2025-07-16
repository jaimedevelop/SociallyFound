// services/campaignService.js
import { BaseService } from './shared/baseService.js';
import { dateUtils, validation, transform, queryBuilder } from './shared/utils.js';
import { onSnapshot, query, where, orderBy, increment, writeBatch } from 'firebase/firestore';
import { db } from '../firebase/index.js';

class CampaignService extends BaseService {
  constructor() {
    super('campaigns');
  }

  // Create a new campaign
  async createCampaign(campaignData, brandId) {
    try {
      // Validate required fields
      const requiredFields = ['title', 'description', 'category', 'budget'];
      const validationResult = validation.validateRequired(campaignData, requiredFields);
      
      if (!validationResult.isValid) {
        throw new Error(`Validation failed: ${Object.values(validationResult.errors).join(', ')}`);
      }

      // Validate budget
      if (!validation.isValidBudget(campaignData.budget)) {
        throw new Error('Invalid budget format');
      }

      // Prepare campaign data for database
      const dbData = transform.prepareCampaignForDB(campaignData, {
        brandId,
        status: campaignData.status || 'draft',
        applicationsCount: 0,
        selectedInfluencers: [],
        views: 0,
        // Convert deadline string to Date if provided
        deadline: campaignData.deadline ? new Date(campaignData.deadline) : null
      });

      const campaignId = await this.create(dbData);
      
      return {
        id: campaignId,
        ...transform.prepareCampaignForDisplay(dbData)
      };
    } catch (error) {
      throw error;
    }
  }

  // Get single campaign by ID
  async getCampaign(campaignId) {
    try {
      const campaign = await this.getById(campaignId);
      return campaign ? transform.prepareCampaignForDisplay(campaign) : null;
    } catch (error) {
      throw error;
    }
  }

  // Get all campaigns for a specific brand
  async getBrandCampaigns(brandId, filters = {}) {
    try {
      const queryFilters = queryBuilder.buildCampaignFilters({
        brandId,
        ...filters
      });

      const campaigns = await this.getWithFilters(queryFilters);
      return campaigns.map(campaign => transform.prepareCampaignForDisplay(campaign));
    } catch (error) {
      throw error;
    }
  }

  // Get campaigns by status for a brand
  async getCampaignsByStatus(brandId, status) {
    return this.getBrandCampaigns(brandId, { status });
  }

  // Update campaign
  async updateCampaign(campaignId, updateData) {
    try {
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

      await this.update(campaignId, dbUpdateData);
      
      // Return updated campaign
      return this.getCampaign(campaignId);
    } catch (error) {
      throw error;
    }
  }

  // Update campaign status
  async updateCampaignStatus(campaignId, status) {
    const validStatuses = ['draft', 'active', 'completed', 'paused', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    return this.update(campaignId, { 
      status,
      ...(status === 'active' && { activatedAt: new Date() }),
      ...(status === 'completed' && { completedAt: new Date() })
    });
  }

  // Delete campaign
  async deleteCampaign(campaignId) {
    return this.delete(campaignId);
  }

  // Get public campaigns for influencers to browse
  async getPublicCampaigns(filters = {}) {
    try {
      const queryFilters = queryBuilder.buildCampaignFilters({
        status: 'active', // Only show active campaigns
        ...filters
      });

      const campaigns = await this.getWithFilters(queryFilters);
      
      // Remove sensitive brand information for public viewing
      return campaigns.map(campaign => {
        const publicCampaign = transform.prepareCampaignForDisplay(campaign);
        // Keep brand info but could be limited in the future
        return publicCampaign;
      });
    } catch (error) {
      throw error;
    }
  }

  // Search campaigns (basic implementation)
  async searchCampaigns(searchTerm, filters = {}) {
    try {
      const campaigns = await this.getPublicCampaigns(filters);
      
      // Client-side search (not ideal for large datasets)
      return campaigns.filter(campaign =>
        campaign.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (error) {
      throw error;
    }
  }

  // Increment campaign views
  async incrementViews(campaignId) {
    try {
      return this.update(campaignId, {
        views: increment(1)
      });
    } catch (error) {
      console.warn('Failed to increment campaign views:', error);
      return false;
    }
  }

  // Increment applications count
  async incrementApplications(campaignId) {
    try {
      return this.update(campaignId, {
        applicationsCount: increment(1)
      });
    } catch (error) {
      console.warn('Failed to increment applications count:', error);
      return false;
    }
  }

  // Add selected influencer to campaign
  async addSelectedInfluencer(campaignId, influencerId) {
    try {
      const campaign = await this.getById(campaignId);
      if (!campaign) {
        throw new Error('Campaign not found');
      }

      const selectedInfluencers = campaign.selectedInfluencers || [];
      if (!selectedInfluencers.includes(influencerId)) {
        selectedInfluencers.push(influencerId);
        await this.update(campaignId, { selectedInfluencers });
      }
      
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Remove selected influencer from campaign
  async removeSelectedInfluencer(campaignId, influencerId) {
    try {
      const campaign = await this.getById(campaignId);
      if (!campaign) {
        throw new Error('Campaign not found');
      }

      const selectedInfluencers = (campaign.selectedInfluencers || [])
        .filter(id => id !== influencerId);
      
      await this.update(campaignId, { selectedInfluencers });
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Get campaign statistics for brand dashboard
  async getCampaignStats(brandId) {
    try {
      const campaigns = await this.getBrandCampaigns(brandId);
      
      const stats = {
        total: campaigns.length,
        active: campaigns.filter(c => c.status === 'active').length,
        draft: campaigns.filter(c => c.status === 'draft').length,
        completed: campaigns.filter(c => c.status === 'completed').length,
        totalBudget: campaigns.reduce((sum, campaign) => {
          const budget = validation.sanitizeBudget(campaign.budget) || 0;
          return sum + budget;
        }, 0),
        totalApplications: campaigns.reduce((sum, campaign) => sum + (campaign.applicationsCount || 0), 0),
        totalViews: campaigns.reduce((sum, campaign) => sum + (campaign.views || 0), 0)
      };

      return stats;
    } catch (error) {
      throw error;
    }
  }

  // Real-time subscription to brand campaigns
  subscribeToBrandCampaigns(brandId, callback, filters = {}) {
    try {
      let q = query(
        this.collectionRef,
        where('brandId', '==', brandId),
        orderBy('createdAt', 'desc')
      );

      // Apply additional filters
      if (filters.status) {
        q = query(q, where('status', '==', filters.status));
      }

      return onSnapshot(q, (snapshot) => {
        const campaigns = snapshot.docs.map(doc => ({
          id: doc.id,
          ...transform.prepareCampaignForDisplay(doc.data())
        }));
        callback(campaigns);
      }, (error) => {
        console.error('Campaign subscription error:', error);
        callback([]);
      });
    } catch (error) {
      console.error('Failed to subscribe to campaigns:', error);
      callback([]);
    }
  }

  // Real-time subscription to public campaigns (for influencers)
  subscribeToPublicCampaigns(callback, filters = {}) {
    try {
      let q = query(
        this.collectionRef,
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc')
      );

      if (filters.category) {
        q = query(q, where('category', '==', filters.category));
      }

      return onSnapshot(q, (snapshot) => {
        const campaigns = snapshot.docs.map(doc => ({
          id: doc.id,
          ...transform.prepareCampaignForDisplay(doc.data())
        }));
        callback(campaigns);
      }, (error) => {
        console.error('Public campaigns subscription error:', error);
        callback([]);
      });
    } catch (error) {
      console.error('Failed to subscribe to public campaigns:', error);
      callback([]);
    }
  }

  // Batch operations for campaign management
  async batchUpdateCampaigns(updates) {
    try {
      const batch = writeBatch(db);
      
      updates.forEach(({ campaignId, data }) => {
        const docRef = doc(this.collectionRef, campaignId);
        batch.update(docRef, {
          ...data,
          updatedAt: new Date()
        });
      });
      
      await batch.commit();
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Duplicate campaign (create copy)
  async duplicateCampaign(campaignId, brandId) {
    try {
      const originalCampaign = await this.getById(campaignId);
      
      if (!originalCampaign) {
        throw new Error('Campaign not found');
      }

      // Create copy with modified data
      const duplicateData = {
        ...originalCampaign,
        title: `${originalCampaign.title} (Copy)`,
        status: 'draft',
        applicationsCount: 0,
        selectedInfluencers: [],
        views: 0
      };

      // Remove fields that shouldn't be copied
      delete duplicateData.id;
      delete duplicateData.createdAt;
      delete duplicateData.updatedAt;

      return this.createCampaign(duplicateData, brandId);
    } catch (error) {
      throw error;
    }
  }

  // Get campaigns expiring soon
  async getExpiringCampaigns(brandId, days = 7) {
    try {
      const campaigns = await this.getBrandCampaigns(brandId, { status: 'active' });
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + days);

      return campaigns.filter(campaign => {
        if (!campaign.deadline) return false;
        const deadline = new Date(campaign.deadline);
        return deadline <= futureDate && deadline >= new Date();
      });
    } catch (error) {
      throw error;
    }
  }

  // Archive old campaigns
  async archiveOldCampaigns(brandId, olderThanDays = 90) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

      const campaigns = await this.getBrandCampaigns(brandId, { status: 'completed' });
      const toArchive = campaigns.filter(campaign => 
        campaign.completedAt && new Date(campaign.completedAt) < cutoffDate
      );

      const updates = toArchive.map(campaign => ({
        campaignId: campaign.id,
        data: { status: 'archived' }
      }));

      if (updates.length > 0) {
        await this.batchUpdateCampaigns(updates);
      }

      return updates.length;
    } catch (error) {
      throw error;
    }
  }
}

// Create and export singleton instance
const campaignService = new CampaignService();
export default campaignService;

// Export individual methods for convenience
export const {
  createCampaign,
  getCampaign,
  getBrandCampaigns,
  getCampaignsByStatus,
  updateCampaign,
  updateCampaignStatus,
  deleteCampaign,
  getPublicCampaigns,
  searchCampaigns,
  incrementViews,
  incrementApplications,
  addSelectedInfluencer,
  removeSelectedInfluencer,
  getCampaignStats,
  subscribeToBrandCampaigns,
  subscribeToPublicCampaigns,
  duplicateCampaign,
  getExpiringCampaigns
} = campaignService;