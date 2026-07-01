import { db } from '../firebase.js';

export const getAllProducts = async () => {
  try {
    const snapshot = await db.collection('products').get();
    const products = [];

    snapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const productRef = db.collection('products').doc(String(id));
    const snapshot = await productRef.get();

    if (!snapshot.exists) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data()
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const deleteProductById = async (id) => {
  try {
    const productRef = db.collection('products').doc(String(id));
    const snapshot = await productRef.get();

    if (!snapshot.exists) {
      return false;
    }

    await productRef.delete();
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const updateProductById = async (id, updatedData) => {
  try {
    const productRef = db.collection('products').doc(String(id));
    const snapshot = await productRef.get();

    if (!snapshot.exists) {
      return null;
    }

    await productRef.update(updatedData);

    const updatedSnapshot = await productRef.get();
    return {
      id: updatedSnapshot.id,
      ...updatedSnapshot.data()
    };
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const productRef = db.collection('products').doc(String(productData.id));
    await productRef.set(productData);
    return productData;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};
