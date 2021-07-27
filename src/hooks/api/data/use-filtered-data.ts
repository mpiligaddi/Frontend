import {
  useBranches,
  useChains,
  useClients,
  useCategories,
  useOFC,
  useReports
} from '@/hooks/api';
import { useFilters } from '@/context/filters';

interface Enabled {
  branches?: boolean;
  chains?: boolean;
  reports?: boolean;
  ofc?: boolean;
  revised?: boolean;
  categories?: boolean;
}

type Config = {
  reported?: boolean;
  revised?: boolean;
  enabled?: Enabled;
};

export const useFilteredData = ({
  reported = false,
  revised = false,
  enabled
}: Config = {}) => {
  const clients = useClients();
  const { filters } = useFilters();

  const categories = useCategories({
    clientId: +filters?.client?.ID!,
    options: {
      enabled: enabled?.categories
    }
  });
  const reports = useReports(+filters?.client?.ID!, {
    enabled: enabled?.reports
  });

  const chains = useChains({
    clientId: filters?.client?.ID,
    revised,
    reported,
    reports: reports.data,
    options: {
      enabled: enabled?.chains
    }
  });

  const branches = useBranches({
    chain: filters?.chain?.ID,
    revised,
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
