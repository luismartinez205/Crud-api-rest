import { db } from '../firebase.js';

const mapUser = (doc) => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    email: data.email || data.mail || ''
  };
};

export const getUserByEmail = async (email) => {
  try {
    let snapshot = await db.collection('users').where('mail', '==', email).get();

    if (snapshot.empty) {
      snapshot = await db.collection('users').where('email', '==', email).get();
    }

    if (snapshot.empty) return null;

    return mapUser(snapshot.docs[0]);
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
};