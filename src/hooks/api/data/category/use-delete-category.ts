import { useMutation } from 'react-query';
import { client } from '@/lib/axios';

export const useDeleteCategory = () => {
  const deleteCategory = async (id: string) => {
    await client.delete(`/api/categories/${id}`);
  };

  return useMutation(deleteCategory);
};
