import { getDatabase, ref, set } from 'firebase/database';

export const dataInRealtimeDB = async (userData: any) => {
   const db = getDatabase();
   const userRef = ref(db, 'users/' + userData.uid);

   await set(userRef, {
      displayName: userData.displayName,
      email: userData.email,
      photoURL: userData.photoURL
   });
};