import {
  useBranches,
  useChains,
  useClients,
  useReports,
  useCategories,
  useOFC
} from '@/api/data';
import { useFilters } from './query';

export const useFilteredData = (reported: boolean = false) => {
  const clients = useClients();
  const { filters } = useFilters();

  const categories = useCategories(+filters?.client?.ID!);
  const reports = useReports(+filters?.client?.ID!);

  const chains = useChains({
    clientId: filters?.client?.ID,
    reported,
    reports: reports.data
  });

  const branches = useBranches({
    chain: filters?.chain?.ID,
    reported,
    reports: reports.data,
    clientId: +filters?.client?.ID!
  });

  const ofc = useOFC({
    reports: reports.data,
    categories: categories.data,
    branches: branches.data
  });

  return {
    chains,
    branches,
    reports,
    clients,
    categories,
    ofc
  };
};
