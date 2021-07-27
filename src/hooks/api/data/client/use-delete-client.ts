import { Client } from '@/lib/types';
import firebase from 'firebase';
import { useQueryClient, useMutation } from 'react-query';

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
