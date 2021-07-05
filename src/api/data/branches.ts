import { useQuery } from 'react-query';
import firebase from 'firebase/app';
import { Branch, Report } from '@/lib/types';
import { useCoverages } from '.';
import branchesJson from '@/data/branches';

interface Data {
  chain?: string;
  reported?: boolean;
  reports?: Report[];
  clientId: number;
}

export const useBranches = ({ chain, reported, reports, clientId }: Data) => {
  const coverages = useCoverages();

  const getBranches = async (): Promise<Branch[]> => {
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

  return useQuery(['branches', { chain, reported, clientId }], getBranches, {
    // enabled: reported ? !!reports && !!chain : !!chain,
    enabled: !coverages.isLoading,
    keepPreviousData: true
  });
};
