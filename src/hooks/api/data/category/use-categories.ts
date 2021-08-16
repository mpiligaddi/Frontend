import { useMemo } from 'react';
import { useQuery, UseQueryOptions } from 'react-query';
import { client } from '@/lib/axios';
import { Category } from '@/lib/types';

type Config = {
  clientId?: string;
  all?: boolean;
  options?: UseQueryOptions<Category[]>;
};

const getCategories = async ({ all, clientId }: Omit<Config, 'options'>) => {
  if (all) {
    const res = await client.get<{ categories: Category[] }>('/api/categories');

    return res.data.categories;
  }

  if (!clientId) return [];

  const res = await client.get<{ categories: Category[] }>(`/api/categories`, {
    params: {
      byclient: clientId
    }
  });

  return res.data.categories;
};

export const useCategories = ({ clientId, options, all }: Config) => {
  const key = useMemo(() => (all ? { all } : { clientId }), [all, clientId]);

  return useQuery(['categories', key], () => getCategories({ clientId, all }), {
    enabled: all || !!clientId,
    keepPreviousData: true,
    ...options
  });
};
