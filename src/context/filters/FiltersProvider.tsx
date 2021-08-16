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
import { useReports, useClients } from '@/hooks/api';
import { useClient } from '@/hooks/api';
import { UseQueryResult } from 'react-query';
import { Branch, Category, Chain, Report, Client } from '@/lib/types';

export interface Filters {
  client?: Client;
  branch?: Branch;
  chain?: Chain;
  category?: Category;
}

interface State {
  reports: UseQueryResult<Report[]>;
  filteredReports: Report[];
  filters?: Filters;
  setFilters: Dispatch<SetStateAction<Filters | undefined>>;
}

const FiltersContext = createContext({} as State);

export const FiltersProvider: FC = ({ children }) => {
  const client = useClient();
  const [filters, setFilters] = useState<Filters>();
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);

  const clients = useClients();
  const reports = useReports(filters?.client?.id);

  const getReports = useCallback(() => {
    if (!reports.data || !filters) return;

    if (!filters.chain?.id) return;

    let filteredReports = reports.data.filter(report => {
      if (
        filters.chain?.id &&
        !filters.branch?.id &&
        report.chainId === filters.chain.id
      )
        return true;
      else if (
        filters.chain?.id &&
        filters.branch?.id &&
        report.chainId === filters.chain?.id &&
        report.branchId === filters.branch?.id
      )
        return true;
      else return false;
    });

    if (filters?.category?.id) {
      filteredReports = filteredReports?.map(report => {
        const categories = report.categories.filter(
          c => c.category.id === filters?.category?.id
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

  useEffect(() => {
    if (client.isLoading) return;

    if (client.data) {
      setFilters(filters => ({
        ...filters,
        client: client.data!
      }));
    } else if (clients.data) {
      setFilters(filters => ({
        ...filters,
        client: clients.data[0]
      }));
    }
  }, [client.data, clients.data, client.isLoading]);

  const value = useMemo(
    () => ({
      filteredReports,
      reports,
      filters,
      setFilters
    }),
    [filteredReports, reports, filters]
  );

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

export const useFilters = () => useContext(FiltersContext);
