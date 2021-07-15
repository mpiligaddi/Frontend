import { useMemo } from 'react';
import { useQuery, UseQueryOptions } from 'react-query';
import { Branch, Report } from '@/lib/types';
import { useCoverages } from '.';
import branchesJson from '@/data/branches';

interface Data {
  chain?: string;
  reported?: boolean;
  reports?: Report[];
  all?: boolean;
  clientId?: number;
  options?: UseQueryOptions<Branch[]>;
}

export const useBranches = ({
  chain,
  reported,
  reports,
  clientId,
  options,
  all
}: Data) => {
  const coverages = useCoverages();
  const key = useMemo(
    () => (all ? { all } : { chain, reported, clientId }),
    [all, reported, clientId, chain]
  );

  const getBranches = async (): Promise<Branch[]> => {
    if (all) {
      return branchesJson;
    }

    const clientCoverages = coverages.data?.filter(
      coverage => coverage.clientId === clientId
    );
    const branchesIds = clientCoverages?.map(c => c.branchId);

    let branches: Branch[] = [];

    branchesJson.forEach(b => {
      if (branchesIds?.includes(b.ID)) {
        branches.push(b);
      }
    });

    if (!chain) return branches;

    if (chain) {
      branches = branches.filter(branch => branch.chainId === chain);
    }

    if (!reported) return branches;

    const reportsBranchsIds = reports!
      .filter(report => report.revised)
      .map(report => report.branchId);

    const onlyWithReports = branches.filter(branch =>
      reportsBranchsIds.includes(branch.ID)
    );

    return onlyWithReports;
  };

  return useQuery(['branches', key], getBranches, {
    enabled: all ? true : false || !coverages.isLoading,
    keepPreviousData: true,
    ...options
  });
};
