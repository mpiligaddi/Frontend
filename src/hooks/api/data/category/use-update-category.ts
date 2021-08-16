import { Category } from '@/lib/types';
import { client } from '@/lib/axios';
import { useMutation } from 'react-query';

export const useUpdateCategory = () => {
  const updateCategory = async ({ id, ...data }: Category) => {
    await client.put(`/api/categories/${id}`, {
      ...data
    });
  };

  return useMutation(updateCategory);
};
