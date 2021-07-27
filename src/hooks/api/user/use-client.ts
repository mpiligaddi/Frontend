import { Client, User } from '@/lib/types';
import firebase from 'firebase';
import { useQuery } from 'react-query';

const getUser = async (): Promise<User | null> => {
  const uid = firebase.auth().currentUser?.uid;

  if (!uid) return null;

  const userDoc = await firebase.firestore().collection('users').doc(uid).get();

  if (!userDoc.exists) return null;

  const userData = userDoc.data() as User;

  return userData;
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
