import {
  useState,
  useEffect,
  FC,
  createContext,
  SetStateAction,
  useCallback,
  Dispatch,
  useContext,
  useMemo
} from 'react';
import { useReports, useCategories, useChains, useBranches } from '@/api/data';
import { useClient } from '@/api/user';
import { UseQueryResult } from 'react-query';
import { Branch, Category, Chain, Report } from '@/lib/types';

interface Filters {
  branch?: Branch;
  chain?: Chain;
  category?: Category;
}

interface State {
  reports: UseQueryResult<Report[]>;
  chains: UseQueryResult<Chain[]>;
  branches: UseQueryResult<Branch[]>;
  categories: UseQueryResult<Category[]>;
  filteredReports: Report[];
  filters?: Filters;
  setFilters: Dispatch<SetStateAction<Filters | undefined>>;
}

const ClientsFiltersContext = createContext({} as State);

const ClientsFiltersProvider: FC = ({ children }) => {
  const { client } = useClient();
  const [filters, setFilters] = useState<Filters>();
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);

  const categories = useCategories(+client);
  const reports = useReports(+client);
  const chains = useChains({
    clientId: client,
    reported: true,
    reports: reports.data
  });
  const branches = useBranches({
    chain: filters?.chain?.ID,
    reported: true,
    reports: reports.data
  });

  const getReports = useCallback(() => {
    if (!reports.data || !filters) return;

    if (!filters.chain?.ID || !filters.branch?.ID) return;

    let filteredReports = reports.data.filter(report => {
      if (
        filters.chain?.ID &&
        !filters.branch?.ID &&
        report.chainId === filters.chain.ID
      )
        return true;
      else if (
        filters.chain?.ID &&
        filters.branch?.ID &&
        report.chainId === filters.chain?.ID &&
        report.branchId === filters.branch?.ID
      )
        return true;
      else return false;
    });

    if (filters?.category?.ID) {
      filteredReports = filteredReports?.map(report => {
        const categories = report.categories.filter(
          c => c.ID === filters?.category?.ID
        );

        return {
          ...report,
          categories
        };
      });
    }

    setFilteredReports(filteredReports);
  }, [reports.data, filters]);

  useEffect(() => {
    getReports();
  }, [filters, reports.data, getReports]);

  const value = useMemo(
    () => ({
      filteredReports,
      chains,
      categories,
      branches,
      reports,
      filters,
      setFilters
    }),
    [filteredReports, chains, categories, branches, reports, filters]
  );

  return (
    <ClientsFiltersContext.Provider value={value}>
      {children}
    </ClientsFiltersContext.Provider>
  );
};

export const useClientsFilters = () => useContext(ClientsFiltersContext);

export default ClientsFiltersProvider;
