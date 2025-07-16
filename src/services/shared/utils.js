// services/shared/utils.js
import { Timestamp } from 'firebase/firestore';

// Date utilities
export const dateUtils = {
  // Convert Date to Firestore Timestamp
  toTimestamp: (date) => {
    if (!date) return null;
    if (date instanceof Date) {
      return Timestamp.fromDate(date);
    }
    if (typeof date === 'string') {
      return Timestamp.fromDate(new Date(date));
    }
    return date;
  },

  // Convert Firestore Timestamp to Date
  fromTimestamp: (timestamp) => {
    if (!timestamp) return null;
    if (typeof timestamp.toDate === 'function') {
      return timestamp.toDate();
    }
    return timestamp;
  },

  // Get current timestamp
  now: () => Timestamp.now(),

  // Get server timestamp (for creation/updates)
  serverTimestamp: () => Timestamp.now(),

  // Format date for display
  formatDate: (date, options = {}) => {
    if (!date) return '';
    const d = date instanceof Date ? date : dateUtils.fromTimestamp(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...options
    });
  },

  // Format datetime for display
  formatDateTime: (date) => {
    if (!date) return '';
    const d = date instanceof Date ? date : dateUtils.fromTimestamp(date);
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
};

// Validation utilities
export const validation = {
  // Validate email format
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate required fields
  validateRequired: (data, requiredFields) => {
    const errors = {};
    requiredFields.forEach(field => {
      if (!data[field] || data[field].toString().trim() === '') {
        errors[field] = `${field} is required`;
      }
    });
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  // Validate budget format
  isValidBudget: (budget) => {
    if (typeof budget === 'string') {
      const numericBudget = budget.replace(/[$,]/g, '');
      return !isNaN(numericBudget) && parseFloat(numericBudget) > 0;
    }
    return typeof budget === 'number' && budget > 0;
  },

  // Sanitize budget (remove $ and commas, convert to number)
  sanitizeBudget: (budget) => {
    if (typeof budget === 'string') {
      return parseFloat(budget.replace(/[$,]/g, ''));
    }
    return budget;
  }
};

// Data transformation utilities
export const transform = {
  // Clean object by removing null/undefined values
  cleanObject: (obj) => {
    const cleaned = {};
    Object.keys(obj).forEach(key => {
      if (obj[key] !== null && obj[key] !== undefined) {
        cleaned[key] = obj[key];
      }
    });
    return cleaned;
  },

  // Convert campaign form data to database format
  prepareCampaignForDB: (formData, additionalData = {}) => {
    return transform.cleanObject({
      ...formData,
      ...additionalData,
      budget: validation.sanitizeBudget(formData.budget),
      createdAt: new Date(),
      updatedAt: new Date()
    });
  },

  // Convert database campaign to display format
  prepareCampaignForDisplay: (dbData) => {
    if (!dbData) return null;
    
    return {
      ...dbData,
      budget: typeof dbData.budget === 'number' ? `$${dbData.budget}` : dbData.budget,
      createdAt: dateUtils.fromTimestamp(dbData.createdAt),
      updatedAt: dateUtils.fromTimestamp(dbData.updatedAt),
      deadline: dbData.deadline ? dateUtils.fromTimestamp(dbData.deadline) : null
    };
  }
};

// Query builders
export const queryBuilder = {
  // Build filters for campaigns
  buildCampaignFilters: (filters) => {
    const where = [];
    
    if (filters.brandId) {
      where.push(['brandId', '==', filters.brandId]);
    }
    
    if (filters.status) {
      where.push(['status', '==', filters.status]);
    }
    
    if (filters.category) {
      where.push(['category', '==', filters.category]);
    }
    
    if (filters.type) {
      where.push(['type', '==', filters.type]);
    }
    
    return {
      where,
      orderBy: filters.orderBy || [['createdAt', 'desc']],
      limit: filters.limit || null
    };
  },

  // Build filters for applications
  buildApplicationFilters: (filters) => {
    const where = [];
    
    if (filters.userId) {
      where.push(['userId', '==', filters.userId]);
    }
    
    if (filters.campaignId) {
      where.push(['campaignId', '==', filters.campaignId]);
    }
    
    if (filters.status) {
      where.push(['status', '==', filters.status]);
    }
    
    return {
      where,
      orderBy: filters.orderBy || [['createdAt', 'desc']],
      limit: filters.limit || null
    };
  }
};

// Error handling utilities
export const errorUtils = {
  // Create standardized error response
  createError: (message, code = 'UNKNOWN_ERROR', details = null) => {
    const error = new Error(message);
    error.code = code;
    error.details = details;
    return error;
  },

  // Check if error is network related
  isNetworkError: (error) => {
    return error.code === 'unavailable' || 
           error.message.includes('network') ||
           error.message.includes('offline');
  },

  // Get user-friendly error message
  getUserFriendlyMessage: (error) => {
    if (errorUtils.isNetworkError(error)) {
      return 'Network connection issue. Please check your internet and try again.';
    }
    
    switch (error.code) {
      case 'permission-denied':
        return 'You do not have permission to perform this action.';
      case 'not-found':
        return 'The requested item was not found.';
      case 'already-exists':
        return 'This item already exists.';
      default:
        return error.message || 'An unexpected error occurred. Please try again.';
    }
  }
};

// Export all utilities as a single object for convenience
export default {
  dateUtils,
  validation,
  transform,
  queryBuilder,
  errorUtils
};