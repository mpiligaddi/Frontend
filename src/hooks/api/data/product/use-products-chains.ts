import { useQuery } from 'react-query';
import { client } from '@/lib/axios';
import { ProductChain } from '@/lib/types';

const getProductsChains = async () => {
  const res = await client.get<{ products: ProductChain[] }>(
    '/api/products/chains'
  );

  return res.data.products;
};

export const useProductsChains = () => {
  return useQuery('productsChains', getProductsChains);
};
