import { useQuery, useQueryClient } from 'react-query';
import firebase from 'firebase/app';
import { User } from '@/lib/types';

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
  const queryClient = useQueryClient();

  return useQuery('me', getUser, {
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
