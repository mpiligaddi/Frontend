import { useMutation } from 'react-query';
import { client } from '@/lib/axios';

type Data = {
  name: string;
};

export const useCreateChain = () => {
  const createChain = async (data: Data) => {
    await client.post('/api/chains', data);
  };

  return useMutation(createChain);
};
