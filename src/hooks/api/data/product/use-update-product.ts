import { Product } from '@/lib/types';
import { useMutation, useQueryClient } from 'react-query';

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(async (data: Product) => data, {
    onSuccess(product) {
      queryClient.setQueryData<Product[]>('products', data =>
        (data || []).map(p => (p.id === product.id ? { ...p, ...product } : p))
      );
    }
  });
};
