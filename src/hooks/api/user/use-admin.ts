import { useMe } from './use-me';
import { Admin } from '@/lib/types';
import { useQuery } from 'react-query';

export const useAdmin = () => {
  useMe();

  useQuery<Admin>(['user', 'admin']);
};
