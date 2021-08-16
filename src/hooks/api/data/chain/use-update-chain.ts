import { useMutation } from 'react-query';
import { client } from '@/lib/axios';

type Data = {
  id: string;
  name: string;
};

export const useUpdateChain = () => {
  const updateChain = async ({ id, ...data }: Data) => {
    await client.put(`/api/chains/${id}`, {
      ...data
    });
  };

  return useMutation(updateChain);
};
