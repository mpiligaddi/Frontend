import { Branch, Report, OQC } from '@/lib/types';
import { useQuery, UseQueryOptions } from 'react-query';

type Data = {
  branches?: Branch[];
  reports?: Report[];
  options?: UseQueryOptions<OQC[]>;
};

const getOQC = ({ branches, reports }: Omit<Data, 'options'>): OQC[] => {
  const branchsIds = (reports || []).map(report => report.branchId);

  return (branches || []).map((branch: Branch) => {
    let done = false;
    if (branchsIds.includes(branch.id)) done = true;

    return {
      branchId: branch.id,
      done
    };
  });
};

export const useOQC = ({ branches, reports, options }: Data) => {
  return useQuery(
    ['oqc', branches?.length, reports?.length],
    () => getOQC({ branches, reports }),
    {
      keepPreviousData: true,
      ...options
    }
  );
};
