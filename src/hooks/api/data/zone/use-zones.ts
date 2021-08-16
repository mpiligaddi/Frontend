import { useQuery } from 'react-query';
import { client } from '@/lib/axios';
import { Zone } from '@/lib/types';

const getZones = async () => {
  const res = await client.get<{ zones: Zone[] }>('/api/zones');

  return res.data.zones || [];
};

export const useZones = () => {
  return useQuery('zones', getZones);
};
