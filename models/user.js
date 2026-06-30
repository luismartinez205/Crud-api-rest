import { collection, getDocs, query, where, getDoc, doc, addDoc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.js';

export const getAllUsers = async () => {
  try {
    const userRef = collection(db, 'users');
    const snapshot = await getDocs(userRef);
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
    const userRef = doc(db, 'users', String(id));
    const snapshot = await getDoc(userRef);
    
    if (!snapshot.exists()) {
      return null;
    }
    
    return {
      id: snapshot.id,
      ...snapshot.data()
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const deleteUserById = async (id) => {
  try {
    const userRef = doc(db, 'users', String(id));
    const snapshot = await getDoc(userRef);
    
    if (!snapshot.exists()) {
      return false;
    }
    
    await deleteDoc(userRef);
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const updateUserById = async (id, updatedData) => {
  try {
    const userRef = doc(db, 'users', String(id));
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
    console.error('Error updating user:', error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    await setDoc(
      doc(db, "users", userData.id),
      userData
    );

    return userData;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Buscar usuario por mail
export const getUserByEmail = async (mail) => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where("mail", "==", mail));
    const snapshot = await getDocs(q);

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