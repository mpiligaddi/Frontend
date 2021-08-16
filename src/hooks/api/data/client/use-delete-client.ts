import { Client } from '@/lib/types';
import { client } from '@/lib/axios';
import { useQueryClient, useMutation } from 'react-query';

const deleteClient = async (id: string) => {
  await client.delete(`/api/clients/${id}`);

  return {
    id
  };
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteClient, {
    onSuccess({ id }) {
      queryClient.setQueriesData<Client[]>('clients', data =>
        (data || []).filter(client => client.id !== id)
      );
    }
  });
};
