import { Product } from '@/lib/types';
import { useMutation, useQueryClient } from 'react-query';

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(async (data: Product) => data, {
    onSuccess(product) {
      queryClient.setQueryData<Product[]>('products', data => [
        ...(data || []),
        product
      ]);
    }
  });
};
