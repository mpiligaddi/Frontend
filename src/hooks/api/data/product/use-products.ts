import { useQuery } from 'react-query';
import products from '@/data/products';
import { Product } from '@/lib/types';

export const useProducts = () => {
  return useQuery('products', () => products as Product[]);
};
