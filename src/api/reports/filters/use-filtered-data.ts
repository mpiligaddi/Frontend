import {
  useBranches,
  useChains,
  useClients,
  useReports,
  useCategories,
  useOFC
} from '@/api/data';
import { useFilters } from './query';

interface Enabled {
  branches?: boolean;
  chains?: boolean;
  reports?: boolean;
  ofc?: boolean;
  categories?: boolean;
}

export const useFilteredData = (
  reported: boolean = false,
  enabled?: Enabled
) => {
  const clients = useClients();
  const { filters } = useFilters();

  const categories = useCategories(+filters?.client?.ID!, {
    enabled: enabled?.categories
  });
  const reports = useReports(+filters?.client?.ID!, {
    enabled: enabled?.reports
  });

  const chains = useChains({
    clientId: filters?.client?.ID,
    reported,
    reports: reports.data,
    options: {
      enabled: enabled?.chains
    }
  });

  const branches = useBranches({
    chain: filters?.chain?.ID,
    reported,
    reports: reports.data,
    clientId: +filters?.client?.ID!,
    options: {
      enabled: enabled?.branches
    }
  });

  const ofc = useOFC({
    reports: reports.data,
    categories: categories.data,
    branches: branches.data,
    options: {
      enabled: enabled?.ofc
    }
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
