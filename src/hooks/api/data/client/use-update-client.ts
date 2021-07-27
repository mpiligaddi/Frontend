import { Client } from '@/lib/types';
import firebase from 'firebase';
import { useQueryClient, useMutation } from 'react-query';

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
