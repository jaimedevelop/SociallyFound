// services/index.js - Barrel exports for all services

// Import all services
import userService from './userService.js';
import campaignService from './campaignService.js';
import applicationService from './applicationService.js';
import opportunityService from './opportunityService.js';

// Import shared utilities
import { BaseService } from './shared/baseService.js';
import utils from './shared/utils.js';

// Export services as default exports
export { default as userService } from './userService.js';
export { default as campaignService } from './campaignService.js';
export { default as applicationService } from './applicationService.js';
export { default as opportunityService } from './opportunityService.js';

// Export shared utilities
export { BaseService } from './shared/baseService.js';
export { default as serviceUtils } from './shared/utils.js';

// Export individual service methods for convenience
export {
  // User service methods
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
} from './userService.js';

export {
  // Campaign service methods
  createCampaign,
  getCampaign,
  getBrandCampaigns,
  getCampaignsByStatus,
  updateCampaign,
  updateCampaignStatus,
  deleteCampaign,
  getPublicCampaigns,
  searchCampaigns,
  incrementViews as incrementCampaignViews,
  incrementApplications as incrementCampaignApplications,
  addSelectedInfluencer,
  removeSelectedInfluencer,
  getCampaignStats,
  subscribeToBrandCampaigns,
  subscribeToPublicCampaigns,
  duplicateCampaign,
  getExpiringCampaigns
} from './campaignService.js';

export {
  // Application service methods
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
} from './applicationService.js';

export {
  // Opportunity service methods
  createOpportunity,
  getOpportunity,
  getOpportunities,
  getOpportunitiesByCategory,
  searchOpportunities,
  getBrandOpportunities,
  updateOpportunity,
  updateOpportunityStatus,
  deleteOpportunity,
  incrementViews as incrementOpportunityViews,
  incrementApplications as incrementOpportunityApplications,
  getTrendingOpportunities,
  getExpiringOpportunities,
  getOpportunitiesByBudgetRange,
  subscribeToOpportunities,
  subscribeToBrandOpportunities,
  getOpportunityStats,
  getRecommendedOpportunities,
  duplicateOpportunity,
  getOpportunityPerformance
} from './opportunityService.js';

// Grouped exports for easier importing
export const services = {
  user: userService,
  campaign: campaignService,
  application: applicationService,
  opportunity: opportunityService
};

// Utility functions for common operations
export const serviceHelpers = {
  // Common error handling
  handleServiceError: (error, operation) => {
    console.error(`Service error in ${operation}:`, error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
      code: error.code || 'UNKNOWN_ERROR'
    };
  },

  // Common success response
  createSuccessResponse: (data, message = 'Operation successful') => {
    return {
      success: true,
      data,
      message
    };
  },

  // Validate user permissions
  validateUserPermission: (userId, resourceOwnerId, operation) => {
    if (userId !== resourceOwnerId) {
      throw new Error(`Unauthorized: You cannot ${operation} resources that don't belong to you`);
    }
    return true;
  },

  // Format date for display
  formatDate: utils.dateUtils.formatDate,
  formatDateTime: utils.dateUtils.formatDateTime,

  // Validate common fields
  validateEmail: utils.validation.isValidEmail,
  validateBudget: utils.validation.isValidBudget,
  sanitizeBudget: utils.validation.sanitizeBudget
};

// Export default object with all services and utilities
export default {
  // Services
  user: userService,
  campaign: campaignService,
  application: applicationService,
  opportunity: opportunityService,
  
  // Utilities
  utils,
  helpers: serviceHelpers,
  BaseService
};