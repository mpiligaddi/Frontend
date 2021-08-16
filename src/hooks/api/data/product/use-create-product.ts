import { useMutation, useQueryClient } from 'react-query';
import { client } from '@/lib/axios';

type Data = {
  name: string;
  chainId: string;
  categoryId: string;
};

const createProduct = async (data: Data) => {
  await client.post('/api/products/chains', {
    ...data
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(createProduct, {
    async onSuccess() {
      await queryClient.refetchQueries('productsChains');
    }
  });
};
