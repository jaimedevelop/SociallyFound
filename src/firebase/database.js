import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  addDoc,
  deleteDoc,
  onSnapshot,
  Timestamp,
  writeBatch,
  serverTimestamp
} from 'firebase/firestore';
import { db, logFirebaseError, handleNetworkError } from './index.js';

// Update user's last login time
export const updateUserLastLogin = async (uid) => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      lastLoginAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating last login time:', error);
    throw error;
  }
};

// Helper function to convert Firebase timestamps to Date objects
const convertTimestamps = (data) => {
  if (!data) return null;
  
  const converted = { ...data };
  
  // Convert Firestore Timestamps to Date objects
  Object.keys(converted).forEach(key => {
    if (converted[key] && typeof converted[key].toDate === 'function') {
      converted[key] = converted[key].toDate();
    }
  });
  
  return converted;
};

// Generic error handler for database operations
const handleDatabaseError = (operation, error) => {
  const networkError = handleNetworkError(error);
  
  if (networkError.isNetworkError) {
    console.warn(`Database ${operation} failed due to network issues:`, networkError.message);
    throw new Error(`Network error during ${operation}. Please check your connection and try again.`);
  }
  
  logFirebaseError(`database.${operation}`, error);
  throw new Error(`Failed to ${operation}. Please try again.`);
};

// User Profile Operations
export const createUserProfile = async (uid, userData) => {
  try {
    const userDoc = doc(db, 'users', uid);
    await setDoc(userDoc, {
      ...userData,
      createdAt: Timestamp.fromDate(userData.createdAt),
      lastLoginAt: Timestamp.fromDate(userData.lastLoginAt)
    });
    return userData;
  } catch (error) {
    handleDatabaseError('create user profile', error);
  }
};

export const getUserProfile = async (uid) => {
  try {
    const userDoc = doc(db, 'users', uid);
    const docSnap = await getDoc(userDoc);
    
    if (docSnap.exists()) {
      return convertTimestamps(docSnap.data());
    }
    
    return null;
  } catch (error) {
    handleDatabaseError('get user profile', error);
  }
};

export const updateUserProfile = async (uid, data) => {
  try {
    const userDoc = doc(db, 'users', uid);
    
    // Convert Date objects to Timestamps
    const updateData = { ...data };
    Object.keys(updateData).forEach(key => {
      if (updateData[key] instanceof Date) {
        updateData[key] = Timestamp.fromDate(updateData[key]);
      }
    });
    
    await updateDoc(userDoc, updateData);
    return true;
  } catch (error) {
    handleDatabaseError('update user profile', error);
  }
};

// Opportunity Operations
export const createOpportunity = async (opportunityData) => {
  try {
    const opportunitiesRef = collection(db, 'opportunities');
    const docRef = await addDoc(opportunitiesRef, {
      ...opportunityData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    handleDatabaseError('create opportunity', error);
  }
};

export const getOpportunities = async (filters = {}) => {
  try {
    let q = collection(db, 'opportunities');
    
    // Apply filters
    if (filters.category) {
      q = query(q, where('category', '==', filters.category));
    }
    
    if (filters.userType) {
      q = query(q, where('targetUserType', '==', filters.userType));
    }
    
    if (filters.minBudget) {
      q = query(q, where('budget', '>=', filters.minBudget));
    }
    
    if (filters.maxBudget) {
      q = query(q, where('budget', '<=', filters.maxBudget));
    }
    
    // Always order by creation date
    q = query(q, orderBy('createdAt', 'desc'));
    
    // Apply limit
    if (filters.limit) {
      q = query(q, limit(filters.limit));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc.data())
    }));
  } catch (error) {
    handleDatabaseError('get opportunities', error);
  }
};

export const getOpportunity = async (opportunityId) => {
  try {
    const opportunityDoc = doc(db, 'opportunities', opportunityId);
    const docSnap = await getDoc(opportunityDoc);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...convertTimestamps(docSnap.data())
      };
    }
    
    return null;
  } catch (error) {
    handleDatabaseError('get opportunity', error);
  }
};

// Application Operations
export const createApplication = async (applicationData) => {
  try {
    const applicationsRef = collection(db, 'applications');
    const docRef = await addDoc(applicationsRef, {
      ...applicationData,
      status: 'pending',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    handleDatabaseError('create application', error);
  }
};

export const getUserApplications = async (userId) => {
  try {
    const applicationsRef = collection(db, 'applications');
    const q = query(
      applicationsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc.data())
    }));
  } catch (error) {
    handleDatabaseError('get user applications', error);
  }
};

export const getOpportunityApplications = async (opportunityId) => {
  try {
    const applicationsRef = collection(db, 'applications');
    const q = query(
      applicationsRef,
      where('opportunityId', '==', opportunityId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc.data())
    }));
  } catch (error) {
    handleDatabaseError('get opportunity applications', error);
  }
};

export const updateApplicationStatus = async (applicationId, status, notes = '') => {
  try {
    const applicationDoc = doc(db, 'applications', applicationId);
    await updateDoc(applicationDoc, {
      status,
      notes,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    handleDatabaseError('update application status', error);
  }
};

// Real-time listeners
export const subscribeToOpportunities = (callback, filters = {}) => {
  try {
    let q = collection(db, 'opportunities');
    
    // Apply filters (same as getOpportunities)
    if (filters.category) {
      q = query(q, where('category', '==', filters.category));
    }
    
    q = query(q, orderBy('createdAt', 'desc'));
    
    if (filters.limit) {
      q = query(q, limit(filters.limit));
    }
    
    return onSnapshot(q, (snapshot) => {
      const opportunities = snapshot.docs.map(doc => ({
        id: doc.id,
        ...convertTimestamps(doc.data())
      }));
      callback(opportunities);
    }, (error) => {
      const networkError = handleNetworkError(error);
      if (networkError.isNetworkError) {
        console.warn('Real-time listener failed due to network issues');
        callback([]); // Return empty array on network error
      } else {
        console.error('Real-time listener error:', error);
      }
    });
  } catch (error) {
    handleDatabaseError('subscribe to opportunities', error);
  }
};

export const subscribeToUserApplications = (userId, callback) => {
  try {
    const applicationsRef = collection(db, 'applications');
    const q = query(
      applicationsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const applications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...convertTimestamps(doc.data())
      }));
      callback(applications);
    }, (error) => {
      const networkError = handleNetworkError(error);
      if (networkError.isNetworkError) {
        console.warn('Applications listener failed due to network issues');
        callback([]); // Return empty array on network error
      } else {
        console.error('Applications listener error:', error);
      }
    });
  } catch (error) {
    handleDatabaseError('subscribe to user applications', error);
  }
};

// Batch operations
export const batchUpdateDocuments = async (updates) => {
  try {
    const batch = writeBatch(db);
    
    updates.forEach(({ collection: collectionName, id, data }) => {
      const docRef = doc(db, collectionName, id);
      batch.update(docRef, {
        ...data,
        updatedAt: Timestamp.now()
      });
    });
    
    await batch.commit();
    return true;
  } catch (error) {
    handleDatabaseError('batch update documents', error);
  }
};

// Generic CRUD operations
export const createDocument = async (collectionName, data) => {
  try {
    const collectionRef = collection(db, collectionName);
    const docRef = await addDoc(collectionRef, {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    handleDatabaseError(`create ${collectionName} document`, error);
  }
};

export const getDocument = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...convertTimestamps(docSnap.data())
      };
    }
    
    return null;
  } catch (error) {
    handleDatabaseError(`get ${collectionName} document`, error);
  }
};

export const updateDocument = async (collectionName, id, data) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    handleDatabaseError(`update ${collectionName} document`, error);
  }
};

export const deleteDocument = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    handleDatabaseError(`delete ${collectionName} document`, error);
  }
};