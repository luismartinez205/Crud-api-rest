import { collection, getDocs, query, where, getDoc, doc, addDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase.js';

export const getAllProducts = async () => {
  try {
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    const products = [];
    
    snapshot.forEach(doc => {
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
    const productRef = doc(db, 'products', String(id));
    const snapshot = await getDoc(productRef);
    
    if (!snapshot.exists()) {
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
    const productRef = doc(db, 'products', String(id));
    const snapshot = await getDoc(productRef);
    
    if (!snapshot.exists()) {
      return false;
    }
    
    await deleteDoc(productRef);
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const updateProductById = async (id, updatedData) => {
  try {
    const productRef = doc(db, 'products', String(id));
    const snapshot = await getDoc(productRef);
    
    if (!snapshot.exists()) {
      return null;
    }
    
    await updateDoc(productRef, updatedData);
    
    const updatedSnapshot = await getDoc(productRef);
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

    await setDoc(
      doc(db, "products", productData.id),
      productData
    );

    return productData;

  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
