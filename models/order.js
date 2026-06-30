import { collection, getDocs, query, where, getDoc, doc, addDoc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.js';

export const getAllOrders = async () => {
  try {
    const productsRef = collection(db, 'orders');
    const snapshot = await getDocs(productsRef);
    const orders = [];
    
    snapshot.forEach(doc => {
      orders.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};


export const getOrderById = async (id) => {
  try {
    const orderRef = doc(db, 'orders', String(id));
    const snapshot = await getDoc(orderRef);
    
    if (!snapshot.exists()) {
      return null;
    }
    
    return {
      id: snapshot.id,
      ...snapshot.data()
    };
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

export const deleteOrderById = async (id) => {
  try {
    const orderRef = doc(db, 'orders', String(id));
    const snapshot = await getDoc(orderRef);
    
    if (!snapshot.exists()) {
      return false;
    }
    
    await deleteDoc(orderRef);
    return true;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

export const updateOrderById = async (id, updatedData) => {
  try {
    const orderRef = doc(db, 'orders', String(id));
    const snapshot = await getDoc(orderRef);
    
    if (!snapshot.exists()) {
      return null;
    }
    
    await updateDoc(orderRef, updatedData);
    
    const updatedSnapshot = await getDoc(orderRef);
    return {
      id: updatedSnapshot.id,
      ...updatedSnapshot.data()
    };
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {

    await setDoc(
      doc(db, "orders", orderData.id),
      orderData
    );

    return orderData;

  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
