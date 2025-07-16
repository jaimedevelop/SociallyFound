// services/applicationService.js
import { BaseService } from './shared/baseService.js';
import { validation, transform, queryBuilder, dateUtils } from './shared/utils.js';
import { onSnapshot, query, where, orderBy, writeBatch } from 'firebase/firestore';
import { db } from '../firebase/index.js';
import campaignService from './campaignService.js';

class ApplicationService extends BaseService {
  constructor() {
    super('applications');
  }

  // Create a new application
  async createApplication(applicationData, userId, campaignId) {
    try {
      // Validate required fields
      const requiredFields = ['coverLetter'];
      const validationResult = validation.validateRequired(applicationData, requiredFields);
      
      if (!validationResult.isValid) {
        throw new Error(`Validation failed: ${Object.values(validationResult.errors).join(', ')}`);
      }

      // Check if user has already applied to this campaign
      const existingApplication = await this.getUserCampaignApplication(userId, campaignId);
      if (existingApplication) {
        throw new Error('You have already applied to this campaign');
      }

      // Prepare application data
      const dbData = transform.cleanObject({
        userId,
        campaignId,
        status: 'pending',
        coverLetter: applicationData.coverLetter,
        proposedRate: applicationData.proposedRate || null,
        portfolioItems: applicationData.portfolioItems || [],
        attachments: applicationData.attachments || [],
        estimatedDeliveryDate: applicationData.estimatedDeliveryDate ? 
          new Date(applicationData.estimatedDeliveryDate) : null,
        additionalNotes: applicationData.additionalNotes || ''
      });

      const applicationId = await this.create(dbData);

      // Increment campaign applications count
      await campaignService.incrementApplications(campaignId);

      return {
        id: applicationId,
        ...dbData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    } catch (error) {
      throw error;
    }
  }

  // Get single application by ID
  async getApplication(applicationId) {
    return this.getById(applicationId);
  }

  // Get user's application for a specific campaign
  async getUserCampaignApplication(userId, campaignId) {
    try {
      const filters = {
        where: [
          ['userId', '==', userId],
          ['campaignId', '==', campaignId]
        ],
        limit: 1
      };

      const applications = await this.getWithFilters(filters);
      return applications.length > 0 ? applications[0] : null;
    } catch (error) {
      throw error;
    }
  }

  // Get all applications for a user
  async getUserApplications(userId, filters = {}) {
    try {
      const queryFilters = queryBuilder.buildApplicationFilters({
        userId,
        ...filters
      });

      return this.getWithFilters(queryFilters);
    } catch (error) {
      throw error;
    }
  }

  // Get applications by status for a user
  async getUserApplicationsByStatus(userId, status) {
    return this.getUserApplications(userId, { status });
  }

  // Get all applications for a campaign
  async getCampaignApplications(campaignId, filters = {}) {
    try {
      const queryFilters = queryBuilder.buildApplicationFilters({
        campaignId,
        ...filters
      });

      return this.getWithFilters(queryFilters);
    } catch (error) {
      throw error;
    }
  }

  // Get applications by status for a campaign
  async getCampaignApplicationsByStatus(campaignId, status) {
    return this.getCampaignApplications(campaignId, { status });
  }

  // Update application status (for brands)
  async updateApplicationStatus(applicationId, status, notes = '', brandId = null) {
    try {
      const validStatuses = ['pending', 'accepted', 'rejected', 'withdrawn', 'completed'];
      
      if (!validStatuses.includes(status)) {
        throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }

      // Verify brand owns the campaign if brandId provided
      if (brandId) {
        const application = await this.getById(applicationId);
        if (!application) {
          throw new Error('Application not found');
        }

        const campaign = await campaignService.getCampaign(application.campaignId);
        if (!campaign || campaign.brandId !== brandId) {
          throw new Error('Unauthorized: You can only update applications for your campaigns');
        }
      }

      const updateData = {
        status,
        notes,
        statusUpdatedAt: new Date()
      };

      // Add status-specific fields
      if (status === 'accepted') {
        updateData.acceptedAt = new Date();
        
        // Add influencer to campaign's selected list
        const application = await this.getById(applicationId);
        if (application) {
          await campaignService.addSelectedInfluencer(application.campaignId, application.userId);
        }
      } else if (status === 'rejected') {
        updateData.rejectedAt = new Date();
      } else if (status === 'completed') {
        updateData.completedAt = new Date();
      }

      await this.update(applicationId, updateData);
      return this.getById(applicationId);
    } catch (error) {
      throw error;
    }
  }

  // Withdraw application (for influencers)
  async withdrawApplication(applicationId, userId) {
    try {
      // Verify user owns the application
      const application = await this.getById(applicationId);
      if (!application) {
        throw new Error('Application not found');
      }

      if (application.userId !== userId) {
        throw new Error('Unauthorized: You can only withdraw your own applications');
      }

      if (application.status === 'accepted') {
        throw new Error('Cannot withdraw an accepted application. Please contact the brand.');
      }

      return this.updateApplicationStatus(applicationId, 'withdrawn', 'Withdrawn by applicant');
    } catch (error) {
      throw error;
    }
  }

  // Update application details (for influencers, only if pending)
  async updateApplication(applicationId, updateData, userId) {
    try {
      // Verify user owns the application
      const application = await this.getById(applicationId);
      if (!application) {
        throw new Error('Application not found');
      }

      if (application.userId !== userId) {
        throw new Error('Unauthorized: You can only update your own applications');
      }

      if (application.status !== 'pending') {
        throw new Error('Can only update pending applications');
      }

      // Only allow updating specific fields
      const allowedFields = [
        'coverLetter', 
        'proposedRate', 
        'portfolioItems', 
        'attachments', 
        'estimatedDeliveryDate', 
        'additionalNotes'
      ];

      const filteredUpdateData = {};
      allowedFields.forEach(field => {
        if (updateData[field] !== undefined) {
          filteredUpdateData[field] = updateData[field];
        }
      });

      // Convert date if provided
      if (filteredUpdateData.estimatedDeliveryDate) {
        filteredUpdateData.estimatedDeliveryDate = new Date(filteredUpdateData.estimatedDeliveryDate);
      }

      await this.update(applicationId, filteredUpdateData);
      return this.getById(applicationId);
    } catch (error) {
      throw error;
    }
  }

  // Get application statistics for user dashboard
  async getUserApplicationStats(userId) {
    try {
      const applications = await this.getUserApplications(userId);
      
      const stats = {
        total: applications.length,
        pending: applications.filter(a => a.status === 'pending').length,
        accepted: applications.filter(a => a.status === 'accepted').length,
        rejected: applications.filter(a => a.status === 'rejected').length,
        completed: applications.filter(a => a.status === 'completed').length,
        withdrawn: applications.filter(a => a.status === 'withdrawn').length,
        successRate: applications.length > 0 ? 
          Math.round((applications.filter(a => a.status === 'accepted').length / applications.length) * 100) : 0
      };

      return stats;
    } catch (error) {
      throw error;
    }
  }

  // Get application statistics for campaign
  async getCampaignApplicationStats(campaignId) {
    try {
      const applications = await this.getCampaignApplications(campaignId);
      
      const stats = {
        total: applications.length,
        pending: applications.filter(a => a.status === 'pending').length,
        accepted: applications.filter(a => a.status === 'accepted').length,
        rejected: applications.filter(a => a.status === 'rejected').length,
        completed: applications.filter(a => a.status === 'completed').length,
        averageProposedRate: this.calculateAverageRate(applications)
      };

      return stats;
    } catch (error) {
      throw error;
    }
  }

  // Calculate average proposed rate
  calculateAverageRate(applications) {
    const ratesWithValues = applications
      .filter(app => app.proposedRate && app.proposedRate > 0)
      .map(app => validation.sanitizeBudget(app.proposedRate));
    
    if (ratesWithValues.length === 0) return 0;
    
    const sum = ratesWithValues.reduce((total, rate) => total + rate, 0);
    return Math.round(sum / ratesWithValues.length);
  }

  // Real-time subscription to user applications
  subscribeToUserApplications(userId, callback, filters = {}) {
    try {
      let q = query(
        this.collectionRef,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      if (filters.status) {
        q = query(q, where('status', '==', filters.status));
      }

      return onSnapshot(q, (snapshot) => {
        const applications = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        callback(applications);
      }, (error) => {
        console.error('User applications subscription error:', error);
        callback([]);
      });
    } catch (error) {
      console.error('Failed to subscribe to user applications:', error);
      callback([]);
    }
  }

  // Real-time subscription to campaign applications
  subscribeToCampaignApplications(campaignId, callback, filters = {}) {
    try {
      let q = query(
        this.collectionRef,
        where('campaignId', '==', campaignId),
        orderBy('createdAt', 'desc')
      );

      if (filters.status) {
        q = query(q, where('status', '==', filters.status));
      }

      return onSnapshot(q, (snapshot) => {
        const applications = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        callback(applications);
      }, (error) => {
        console.error('Campaign applications subscription error:', error);
        callback([]);
      });
    } catch (error) {
      console.error('Failed to subscribe to campaign applications:', error);
      callback([]);
    }
  }

  // Batch update applications (for bulk actions)
  async batchUpdateApplications(updates) {
    try {
      const batch = writeBatch(db);
      
      updates.forEach(({ applicationId, data }) => {
        const docRef = doc(this.collectionRef, applicationId);
        batch.update(docRef, {
          ...data,
          updatedAt: new Date(),
          statusUpdatedAt: new Date()
        });
      });
      
      await batch.commit();
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Bulk accept/reject applications
  async bulkUpdateApplicationStatus(applicationIds, status, notes = '', brandId = null) {
    try {
      // Verify applications belong to brand's campaigns if brandId provided
      if (brandId) {
        for (const appId of applicationIds) {
          const application = await this.getById(appId);
          if (application) {
            const campaign = await campaignService.getCampaign(application.campaignId);
            if (!campaign || campaign.brandId !== brandId) {
              throw new Error('Unauthorized: Some applications do not belong to your campaigns');
            }
          }
        }
      }

      const updates = applicationIds.map(applicationId => ({
        applicationId,
        data: {
          status,
          notes,
          ...(status === 'accepted' && { acceptedAt: new Date() }),
          ...(status === 'rejected' && { rejectedAt: new Date() })
        }
      }));

      await this.batchUpdateApplications(updates);
      return true;
    } catch (error) {
      throw error;
    }
  }
}

// Create and export singleton instance
const applicationService = new ApplicationService();
export default applicationService;

// Export individual methods for convenience
export const {
  createApplication,
  getApplication,
  getUserCampaignApplication,
  getUserApplications,
  getUserApplicationsByStatus,
  getCampaignApplications,
  getCampaignApplicationsByStatus,
  updateApplicationStatus,
  withdrawApplication,
  updateApplication,
  getUserApplicationStats,
  getCampaignApplicationStats,
  subscribeToUserApplications,
  subscribeToCampaignApplications,
  bulkUpdateApplicationStatus
} = applicationService;