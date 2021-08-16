import { useMutation } from 'react-query';
import { client } from '@/lib/axios';

export const useCreateCategory = () => {
  const createCategory = async (name: string) => {
    await client.post('/api/category', {
      name
    });

    return name;
  };

  return useMutation(createCategory);
};
