import { useQuery } from 'react-query';
import zones from '@/data/zones';

export const useZones = () => {
  return useQuery('zones', () => zones);
};
