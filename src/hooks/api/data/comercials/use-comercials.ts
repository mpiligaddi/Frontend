import { useQuery } from 'react-query';
import comercials from '@/data/comercials';
import { Comercial } from '@/lib/types';

export const useComercials = () => {
  return useQuery('comercials', () => comercials as Comercial[]);
};
