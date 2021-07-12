import { useQuery } from 'react-query';
import admins from '@/data/admins';
import { Admin } from '@/lib/types';

export const useAdmins = () => {
  return useQuery('admins', () => admins as Admin[]);
};
