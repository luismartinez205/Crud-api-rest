import { db } from '../firebase.js';

export const getAllCategories = async () => {
  try {
    const snapshot = await db.collection('categories').get();
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
    const docRef = db.collection('categories').doc(String(id));
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data()
    };
  } catch (error) {
    console.error('Error fetching Category:', error);
    throw error;
  }
};

export const deleteCategoryById = async (id) => {
  try {
    const docRef = db.collection('categories').doc(String(id));
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return false;
    }

    await docRef.delete();
    return true;
  } catch (error) {
    console.error('Error deleting Category:', error);
    throw error;
  }
};

export const updateCategoryById = async (id, updatedData) => {
  try {
    const docRef = db.collection('categories').doc(String(id));
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return null;
    }

    await docRef.update(updatedData);

    const updatedSnap = await docRef.get();
    return {
      id: updatedSnap.id,
      ...updatedSnap.data()
    };
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

export const createCategory = async (categoryData) => {
  try {
    if (categoryData.id) {
      await db.collection('categories').doc(String(categoryData.id)).set(categoryData);
      return categoryData;
    }

    const ref = await db.collection('categories').add(categoryData);
    return { id: ref.id, ...categoryData };
  } catch (error) {
    console.error('Error creating Category:', error);
    throw error;
  }
};
