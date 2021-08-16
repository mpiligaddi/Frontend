import { useQuery, UseQueryOptions } from 'react-query';
import { client } from '@/lib/axios';
import { Coverage } from '@/lib/types';

const getCoverages = async () => {
  const res = await client.get('/api/coverages', {
    params: {
      branch: true
    }
  });

  return res.data.coverages;
};

export const useCoverages = (options?: UseQueryOptions<Coverage[]>) => {
  return useQuery('coverages', getCoverages, options);
};
