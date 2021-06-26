import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import firebase from 'firebase/app';
import { User } from '@/lib/types';

export const useMe = () => {
  const [initialized, setInitialized] = useState(false);

  const getUser = async () => {
    const uid = firebase.auth().currentUser?.uid;

    if (!uid) return null;

    const userDoc = await firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .get();

    if (!userDoc.exists) return null;

    const userData = userDoc.data() as User;

    return userData;
  };

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(() => setInitialized(true));

    return () => unsubscribe();
  }, []);

  return useQuery('me', getUser, {
    enabled: initialized
  });
};
