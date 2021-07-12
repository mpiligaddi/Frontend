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
import { useReports, useClients } from '@/api/data';
import { useClient } from '@/api/user';
import { UseQueryResult } from 'react-query';
import { Branch, Category, Chain, Report, Client } from '@/lib/types';

interface Filters {
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
  const reports = useReports(+filters?.client?.ID!);

  const getReports = useCallback(() => {
    if (!reports.data || !filters) return;

    if (!filters.chain?.ID) return;

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
