import { useMutation } from 'react-query';
import { client } from '@/lib/axios';

export const useDeleteChain = () => {
  const deleteChain = async (id: string) => {
    await client.delete(`/api/chains/${id}`);
  };

  return useMutation(deleteChain);
};
