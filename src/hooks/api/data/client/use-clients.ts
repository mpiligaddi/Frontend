import { useQuery, UseQueryOptions } from 'react-query';
import { Client } from '@/lib/types';
import { client } from '@/lib/axios';

type Config = {
  all?: boolean;
  options?: UseQueryOptions<Client[]>;
};

const getClients = async () => {
  const res = await client.get<{ clients: Client[] }>('/api/clients', {
    params: {
      start: 0,
      end: 100,
      periods: true,
      coverages: 'only'
    }
  });

  return res.data.clients;
};

export const useClients = (config?: Config) => {
  return useQuery(['clients', true], getClients, config?.options);
};
