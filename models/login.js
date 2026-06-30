import { collection, getDocs, query, where } from 'firebase/firestore';
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
  const usersRef = collection(db, 'users');
  let snapshot = await getDocs(
    query(usersRef, where('mail', '==', email))
  );

  if (snapshot.empty) {
    snapshot = await getDocs(
      query(usersRef, where('email', '==', email))
    );
  }

  if (snapshot.empty) {
    return null;
  }

  return mapUser(snapshot.docs[0]);
};