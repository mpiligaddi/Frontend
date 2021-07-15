import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import firebase from 'firebase/app';
import { Admin, Client, User } from '@/lib/types';

const collections: Record<string, string> = {
  sadmin: 'superadmins',
  admin: 'admins',
  client: 'clients'
};

const getUser = async (): Promise<User | null> => {
  const uid = firebase.auth().currentUser?.uid;

  if (!uid) return null;

  const userDoc = await firebase.firestore().collection('users').doc(uid).get();

  if (!userDoc.exists) return null;

  const userData = userDoc.data() as User;

  return userData;
};

export const useMe = () => {
  const [initialized, setInitialized] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(() => {
      setInitialized(true);
      unsubscribe();
    });

    return () => unsubscribe();
  }, []);

  return useQuery('me', getUser, {
    enabled: initialized,
    async onSuccess(user) {
      if (!user) return;

      const collection = collections[user.role];

      if (collection) {
        const { docs, empty } = await firebase
          .firestore()
          .collection(collection)
          .where('email', '==', user.email)
          .get();

        if (empty) return;

        const roleData = docs.map(doc => doc.data())[0];

        queryClient.setQueryData(['user', user.role], roleData);
      }
    }
  });
};

export const useClient = () => {
  const getClient = async () => {
    const user = await getUser();

    if (!user) return null;

    const { docs, empty } = await firebase
      .firestore()
      .collection('clients')
      .where('email', '==', user.email)
      .get();

    if (empty) return null;

    const clientData = docs.map(doc => doc.data())[0] as Client;

    return clientData;
  };

  return useQuery(['user', 'client'], getClient);
};

export const useAdmin = () => {
  useMe();

  useQuery<Admin>(['user', 'admin']);
};
