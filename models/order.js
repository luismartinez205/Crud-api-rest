import { db } from '../firebase.js';

export const getAllOrders = async () => {
  try {
    const snapshot = await db.collection('orders').get();
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
    const doc = await db.collection('orders').doc(String(id)).get();
    
    if (!doc.exists) {
      return null;
    }
    
    return {
      id: doc.id,
      ...doc.data()
    };
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

export const deleteOrderById = async (id) => {
  try {
    const doc = await db.collection('orders').doc(String(id)).get();
    
    if (!doc.exists) {
      return false;
    }
    
    await db.collection('orders').doc(String(id)).delete();
    return true;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

export const updateOrderById = async (id, updatedData) => {
  try {
    const doc = await db.collection('orders').doc(String(id)).get();
    
    if (!doc.exists) {
      return null;
    }
    
    await db.collection('orders').doc(String(id)).update(updatedData);
    
    const updatedDoc = await db.collection('orders').doc(String(id)).get();
    return {
      id: updatedDoc.id,
      ...updatedDoc.data()
    };
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    await db.collection('orders').doc(orderData.id).set(orderData);
    return orderData;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};
