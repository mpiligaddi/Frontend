import { useMemo } from 'react';
import { useQuery, UseQueryOptions } from 'react-query';
import { Chain, Report } from '@/lib/types';
import { client } from '@/lib/axios';

interface Data {
  clientId?: string;
  reported?: boolean;
  revised?: boolean;
  all?: boolean;
  reports?: Report[];
  options?: UseQueryOptions<Chain[]>;
}

export const useChains = ({
  clientId,
  reported,
  revised,
  options,
  all
}: Data) => {
  const key = useMemo(
    () => (all ? { all } : { reported, clientId, revised }),
    [all, reported, clientId, revised]
  );

  const getChains = async () => {
    if (all) {
      const res = await client.get<{ chains: Chain[] }>('/api/chains');

      return res.data.chains;
    }

    const res = await client.get<{ chains: Chain[] }>('/api/chains', {
      params: {
        byclient: clientId,
        reports: reported
      }
    });

    if (!reported) return res.data.chains;

    const onlyWithReports = res.data.chains.filter(chain => {
      if (revised) {
        const onlyRevised = chain.reports?.filter(report => report.revised);

        return onlyRevised && onlyRevised.length > 0;
      }

      return chain.reports && chain.reports.length > 0;
    });

    return onlyWithReports;
  };

  return useQuery(['chains', key], getChains, {
    enabled: all ? true : false || !!clientId,
    keepPreviousData: true,
    ...options,
    onError() {}
  });
};
