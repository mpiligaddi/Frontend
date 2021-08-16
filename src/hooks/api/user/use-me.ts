import { useQuery, UseQueryOptions } from 'react-query';
import { User } from '@/lib/types';
import { client } from '@/lib/axios';

const getUser = async (): Promise<User | null> => {
  const res = await client.get<{ user: User }>('/auth');

  return res.data.user;
};

export const useMe = (options?: UseQueryOptions<User | null>) => {
  return useQuery('me', getUser, options);
};
