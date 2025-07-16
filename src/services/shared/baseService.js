// services/shared/baseService.js
import { 
  doc, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db, logFirebaseError, handleNetworkError } from '../../firebase/index.js';

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

// Generic CRUD operations
export class BaseService {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.collectionRef = collection(db, collectionName);
  }

  // Create a new document
  async create(data) {
    try {
      const docRef = await addDoc(this.collectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      handleDatabaseError(`create ${this.collectionName}`, error);
    }
  }

  // Create document with custom ID
  async createWithId(id, data) {
    try {
      const docRef = doc(this.collectionRef, id);
      await setDoc(docRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return id;
    } catch (error) {
      handleDatabaseError(`create ${this.collectionName} with ID`, error);
    }
  }

  // Get document by ID
  async getById(id) {
    try {
      const docRef = doc(this.collectionRef, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...convertTimestamps(docSnap.data())
        };
      }
      
      return null;
    } catch (error) {
      handleDatabaseError(`get ${this.collectionName}`, error);
    }
  }

  // Update document
  async update(id, data) {
    try {
      const docRef = doc(this.collectionRef, id);
      
      // Convert Date objects to Timestamps
      const updateData = { ...data };
      Object.keys(updateData).forEach(key => {
        if (updateData[key] instanceof Date) {
          updateData[key] = Timestamp.fromDate(updateData[key]);
        }
      });
      
      await updateDoc(docRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      handleDatabaseError(`update ${this.collectionName}`, error);
    }
  }

  // Delete document
  async delete(id) {
    try {
      const docRef = doc(this.collectionRef, id);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      handleDatabaseError(`delete ${this.collectionName}`, error);
    }
  }

  // Get documents with filters
  async getWithFilters(filters = {}) {
    try {
      let q = this.collectionRef;
      
      // Apply where clauses
      if (filters.where) {
        filters.where.forEach(([field, operator, value]) => {
          q = query(q, where(field, operator, value));
        });
      }
      
      // Apply ordering
      if (filters.orderBy) {
        if (Array.isArray(filters.orderBy[0])) {
          // Multiple order by clauses
          filters.orderBy.forEach(([field, direction = 'asc']) => {
            q = query(q, orderBy(field, direction));
          });
        } else {
          // Single order by clause
          const [field, direction = 'asc'] = filters.orderBy;
          q = query(q, orderBy(field, direction));
        }
      }
      
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
      handleDatabaseError(`query ${this.collectionName}`, error);
    }
  }

  // Get all documents (with optional limit)
  async getAll(limitCount = null) {
    const filters = {};
    if (limitCount) {
      filters.limit = limitCount;
    }
    return this.getWithFilters(filters);
  }
}

// Export utilities
export { handleDatabaseError, convertTimestamps };