import { useQuery } from 'react-query';
import firebase from 'firebase/app';
import { Client } from '@/lib/types';

export const useClients = () => {
  const getClients = async () => {
    const { docs } = await firebase.firestore().collection('clients').get();

    const clients = docs.map(doc => doc.data());

    return clients as Client[];
  };

  return useQuery('clients', getClients);
};
