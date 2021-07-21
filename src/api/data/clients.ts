import {
  useQuery,
  UseQueryOptions,
  useMutation,
  useQueryClient
} from 'react-query';
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

export type CreateClientFields = {
  CUIT: string;
  ID: string;
  address: string;
  adminId?: string;
  categories: {
    value: string;
  }[];
  comercialId?: string;
  companyName: string;
  contactName: string;
  control: boolean;
  description: string;
  email: string;
  name: string;
  phone: string;
};

export const useCreateClient = () => {
  const createClient = async ({
    categories,
    ...client
  }: CreateClientFields) => {
    await firebase
      .firestore()
      .collection('clients')
      .add({
        ...client,
        existencia: true
      });

    await firebase
      .firestore()
      .collection('users')
      .add({
        displayName: client.name,
        email: client.email,
        password: `${client.email?.split('@')[0]}1234`,
        role: 'client',
        key: 'd2a04d71301a8915217dd5faf81d12cffd6cd958',
        ID: client.ID
      }),
      await Promise.all(
        categories.map(async (category, index) => {
          firebase
            .firestore()
            .collection('categories')
            .add({
              ID: `CAT${index + 1}`,
              name: category.value,
              clientId: client.ID
            });
        })
      );
  };

  return useMutation(createClient);
};

interface UpdateData {
  id: string;
  adminId: string;
  comercialId: string;
  name: string;
  companyName: string;
  contactName: string;
}

export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  const updateClient = async ({ id, ...data }: UpdateData) => {
    await firebase.firestore().collection('clients').doc(id).update(data);

    return {
      id,
      ...data
    };
  };

  return useMutation(updateClient, {
    onSuccess(newClient) {
      queryClient.setQueryData<Client[]>(['clients', null], data =>
        (data || []).map(client =>
          client.id === newClient.id ? { ...client, ...newClient } : client
        )
      );
    }
  });
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  const deleteClient = async (id: string) => {
    await firebase.firestore().collection('clients').doc(id).delete();

    return {
      id
    };
  };

  return useMutation(deleteClient, {
    onSuccess({ id }) {
      queryClient.setQueryData<Client[]>(['clients', null], data =>
        (data || []).filter(client => client.id !== id)
      );
    }
  });
};
