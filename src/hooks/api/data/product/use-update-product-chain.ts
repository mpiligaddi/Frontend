import { useMutation, useQueryClient } from 'react-query';
import { client } from '@/lib/axios';
import { ProductChain } from '@/lib/types';

type Data = {
  id: string;
  chainId: string;
  name: string;
  categoryId: string;
};

const updateProductChain = async ({ id, chainId, name, categoryId }: Data) => {
  const res = await client.put<{ product: ProductChain[] }>(
    `/api/products/chains/${id}`,
    {
      chainId,
      name,
      categoryId
    }
  );

  return res.data.product;
};

export const useUpdateProductsChains = () => {
  const queryClient = useQueryClient();

  return useMutation('productsChains', updateProductChain, {
    async onSuccess() {
      await queryClient.refetchQueries('productsChains');
    }
  });
};
