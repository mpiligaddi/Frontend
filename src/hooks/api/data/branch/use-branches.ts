import { useMemo } from 'react';
import { useQuery, UseQueryOptions } from 'react-query';
import { Branch } from '@/lib/types';
import { client } from '@/lib/axios';

interface Config {
  chain?: string;
  reported?: boolean;
  revised?: boolean;
  all?: boolean;
  clientId?: string;
  options?: UseQueryOptions<Branch[]>;
}

const getBranches = async ({
  all,
  chain,
  clientId,
  reported,
  revised
}: Config): Promise<Branch[]> => {
  if (all) {
    const res = await client.get<{ branches: Branch[] }>('/api/branches', {
      params: {
        reports: reported ? (revised ? 'revised' : 'only') : undefined
      }
    });

    return res.data.branches;
  }

  if (!chain && clientId) {
    const res = await client.get<{ branches: Branch[] }>('/api/branches', {
      params: {
        clientId,
        reports: reported ? (revised ? 'revised' : 'only') : undefined
      }
    });

    return res.data.branches;
  }

  if (chain && clientId) {
    const res = await client.get<{ branches: Branch[] }>(`/api/branches`, {
      params: {
        bychain: chain,
        clientId,
        reports: reported ? (revised ? 'revised' : 'only') : undefined
      }
    });

    if (reported) {
      return res.data.branches.filter(branch => branch.reports.length > 1);
    }

    return res.data.branches;
  }

  return [];
};

export const useBranches = ({
  clientId,
  reported = false,
  revised = false,
  chain,
  all,
  options
}: Config) => {
  const key = useMemo(
    () => (all ? { all } : { clientId, reported, revised, chain }),
    [clientId, reported, revised, chain, all]
  );

  return useQuery(
    ['branches', key],
    () => getBranches({ clientId, reported, revised, chain, all }),
    {
      enabled: all || !!clientId || (!!chain && !!clientId),
      keepPreviousData: true,
      ...options
    }
  );
};
