import { useMutation } from 'react-query';
import { client } from '@/lib/axios';

export const useDeleteBranch = () => {
  const deleteBranch = async (id: string) => {
    await client.delete(`/api/branches/${id}`);

    return {
      id
    };
  };

  return useMutation(deleteBranch);
};
