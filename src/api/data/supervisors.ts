import { useQuery } from 'react-query';
import supervisors from '@/data/supervisors';

export const useSupervisors = () => {
  return useQuery('supervisors', () => supervisors);
};
