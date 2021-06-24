import { useQuery } from 'react-query';
import firebase from 'firebase/app';
import { Branch, Report } from '@/lib/types';

interface Data {
  chain?: string;
  reported?: boolean;
  reports?: Report[];
}

export const useBranches = ({ chain, reported, reports }: Data) => {
  const getBranches = async () => {
    const result = await firebase
      .firestore()
      .collection('branches')
      .where('chainId', '==', chain)
      .orderBy('name', 'asc')
      .get();
    const branches = result.docs.map(branch => {
      return { ...branch.data() };
    }) as Branch[];

    if (!reported) return branches;

    const reportsBranchsIds = reports!
      .filter(report => report.revised)
      .map(report => report.branchId);

    const onlyWithReports = branches.filter(branch =>
      reportsBranchsIds.includes(branch.ID)
    );

    return onlyWithReports;
  };

  return useQuery(['branches', chain], getBranches, {
    enabled: reported ? !!reports && !!chain : !!chain,
    keepPreviousData: true
  });
};
