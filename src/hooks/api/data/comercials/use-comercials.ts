import { useQuery } from 'react-query';
import { Comercial } from '@/lib/types';
import { client } from '@/lib/axios';

const getComercials = async () => {
  const res = await client.get<{ comercials: Comercial[] }>('/api/comercials');

  return res.data.comercials;
};

export const useComercials = () => {
  return useQuery('comercials', getComercials);
};
