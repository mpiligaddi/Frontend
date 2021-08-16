import { Client, User } from '@/lib/types';
import { client } from '@/lib/axios';
import { useQuery } from 'react-query';

const getUser = async (): Promise<User | null> => {
  const res = await client.get<{ user: User }>('/auth');

  return res.data.user;
};

const getClient = async () => {
  const user = await getUser();

  if (!user) return null;

  if (user.role !== 'client') return null;

  const res = await client.get(`/api/clients/${user.client?.id}`);

  return res.data.client;
};

export const useClient = () => {
  return useQuery(['user', 'client'], getClient);
};
