import { useQuery, UseQueryOptions } from 'react-query';
import { Report } from '@/lib/types';
import { client } from '@/lib/axios';

export const useReports = (
  clientId?: string,
  options?: UseQueryOptions<Report[]>
) => {
  const getReports = async () => {
    const res = await client.get('/api/reports', {
      params: {
        byclient: clientId,
        type: 'photographic',
        categories: true
      }
    });

    return res.data.reports;
  };

  return useQuery(['reports', clientId], getReports, {
    enabled: !!clientId,
    keepPreviousData: true,
    ...options
  });
};
