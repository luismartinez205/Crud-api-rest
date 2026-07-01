import { db } from '../firebase.js';
import { FieldValue } from 'firebase-admin/firestore';

export const getAllUsers = async () => {
  try {
    const snapshot = await db.collection('users').get();
    const users = [];
    
    snapshot.forEach(doc => {
      users.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return users;
  } catch (error) {
    console.error('Error fetching Users:', error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const doc = await db.collection('users').doc(String(id)).get();
    
    if (!doc.exists) {
      return null;
    }
    
    return {
      id: doc.id,
      ...doc.data()
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const deleteUserById = async (id) => {
  try {
    const doc = await db.collection('users').doc(String(id)).get();
    
    if (!doc.exists) {
      return false;
    }
    
    await db.collection('users').doc(String(id)).delete();
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const updateUserById = async (id, updatedData) => {
  try {
    const doc = await db.collection('users').doc(String(id)).get();
    
    if (!doc.exists) {
      return null;
    }
    
    await db.collection('users').doc(String(id)).update(updatedData);
    
    const updatedDoc = await db.collection('users').doc(String(id)).get();
    return {
      id: updatedDoc.id,
      ...updatedDoc.data()
    };
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    await db.collection('users').doc(userData.id).set(userData);
    return userData;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Buscar usuario por mail
export const getUserByEmail = async (mail) => {
  try {
    const snapshot = await db.collection('users').where('mail', '==', mail).get();

    if (snapshot.empty) return null;

    return {
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data()
    };
  } catch (error) {
    console.error('Error fetching user by mail:', error);
    throw error;
  }
};