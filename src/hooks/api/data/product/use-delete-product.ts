import { Product } from '@/lib/types';
import { useMutation, useQueryClient } from 'react-query';

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(async (id: number) => id, {
    onSuccess(id) {
      queryClient.setQueryData<Product[]>('products', data =>
        (data || []).filter(product => product.id !== id)
      );
    }
  });
};
