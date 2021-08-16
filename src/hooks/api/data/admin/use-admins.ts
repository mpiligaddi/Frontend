import { useQuery } from 'react-query';
import { client } from '@/lib/axios';
import { User } from '@/lib/types';

const getAdmins = async () => {
  const res = await client.get<{ user: User[] }>('/api/users', {
    params: {
      role: 'backoffice'
    }
  });

  return res.data.user;
};

export const useAdmins = () => {
  return useQuery('admins', getAdmins);
};
