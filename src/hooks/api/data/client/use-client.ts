import { useQuery, UseQueryOptions } from 'react-query';
import firebase from 'firebase/app';
import { Client } from '@/lib/types';
import clientsJson from '@/data/clients';

type Config = {
  all?: boolean;
  options?: UseQueryOptions<Client[]>;
};

export const useClients = (config?: Config) => {
  const getClients = async () => {
    if (config?.all) {
      return clientsJson as Client[];
    }

    const { docs } = await firebase.firestore().collection('clients').get();

    const clients = docs.map(doc => ({ ...doc.data(), id: doc.id }));

    return clients as Client[];
  };

  return useQuery(['clients', config?.all], getClients, config?.options);
};
