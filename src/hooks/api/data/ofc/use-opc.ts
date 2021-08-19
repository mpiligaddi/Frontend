import { Branch, Report, OQC } from '@/lib/types';
import { useQuery, UseQueryOptions } from 'react-query';

type Data = {
  branches?: Branch[];
  reports?: Report[];
  options?: UseQueryOptions<OQC[]>;
};

const getOPC = ({ branches, reports }: Omit<Data, 'options'>): OQC[] => {
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

export const useOPC = ({ branches, reports, options }: Data) => {
  return useQuery(
    ['opc', branches?.length, reports?.length],
    () => getOPC({ branches, reports }),
    {
      keepPreviousData: true,
      ...options
    }
  );
};
