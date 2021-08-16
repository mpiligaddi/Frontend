import { useQuery } from 'react-query';
import { client } from '@/lib/axios';
import { Supervisor } from '@/lib/types';

const getSupervisors = async () => {
  const res = await client.get<{ supervisors: Supervisor[] }>(
    '/api/supervisors'
  );

  return res.data.supervisors;
};

export const useSupervisors = () => {
  return useQuery('supervisors', getSupervisors);
};
