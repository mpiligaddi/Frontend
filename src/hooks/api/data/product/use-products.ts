import { useQuery } from 'react-query';
import { client } from '@/lib/axios';
import { Product } from '@/lib/types';

const getProducts = async () => {
  const res = await client.get<{ products: Product[] }>('/api/products', {
    params: {
      category: true,
      chains: true
    }
  });

  return res.data.products;
};

export const useProducts = () => {
  return useQuery('products', getProducts);
};
