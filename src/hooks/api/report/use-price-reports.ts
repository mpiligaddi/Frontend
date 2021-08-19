import { useQuery, UseQueryOptions } from 'react-query';
import { Report } from '@/lib/types';
import { client } from '@/lib/axios';

const getReports = async (clientId?: string) => {
  const res = await client.get('/api/reports', {
    params: {
      byclient: clientId,
      type: 'pricing',
      categories: true
    }
  });

  return res.data.reports;
};

export const usePriceReports = (
  clientId?: string,
  options?: UseQueryOptions<Report[]>
) => {
  return useQuery(['priceReports', clientId], () => getReports(clientId), {
    enabled: !!clientId,
    keepPreviousData: true,
    ...options
  });
};
