import { collection, getDocs, query, where, getDoc, doc,addDoc, setDoc,updateDoc,deleteDoc } from 'firebase/firestore';
import { db } from '../firebase.js';

export const getAllCategories = async () => {
  try {
    const userRef = collection(db, 'categories');
    const snapshot = await getDocs(userRef);
    const categories = [];
    
    snapshot.forEach(doc => {
      categories.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return categories;
  } catch (error) {
    console.error('Error fetching Categories:', error);
    throw error;
  }
};


export const getCategoryById = async (id) => {
  try {
    const userRef = doc(db, 'categories', String(id));
    const snapshot = await getDoc(userRef);
    
    if (!snapshot.exists()) {
      return null;
    }
    
    return {
      id: snapshot.id,
      ...snapshot.data()
    };
  } catch (error) {
    console.error('Error fetching Category:', error);
    throw error;
  }
};

export const deleteCategoryById = async (id) => {
  try {
    const userRef = doc(db, 'categories', String(id));
    const snapshot = await getDoc(userRef);
    
    if (!snapshot.exists()) {
      return false;
    }
    
    await deleteDoc(userRef);
    return true;
  } catch (error) {
    console.error('Error deleting Category:', error);
    throw error;
  }
};

export const updateCategoryById = async (id, updatedData) => {
  try {
    const userRef = doc(db, 'categories', String(id));
    const snapshot = await getDoc(userRef);
    
    if (!snapshot.exists()) {
      return null;
    }
    
    await updateDoc(userRef, updatedData);
    
    const updatedSnapshot = await getDoc(userRef);
    return {
      id: updatedSnapshot.id,
      ...updatedSnapshot.data()
    };
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

export const createCategory = async (categoryData) => {
  try {

    await setDoc(
      doc(db, "categories", categoryData.id),
      categoryData
    );

    return categoryData;

  } catch (error) {
    console.error("Error creating Category:", error);
    throw error;
  }
};
