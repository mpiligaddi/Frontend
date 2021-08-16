import { FC } from 'react';
import { LinearProgress, GridContainer, Tabs } from '@/components/ui';
import { useClients } from '@/hooks/api';
import { useFilters } from '@/context/filters';
import ReportTypeSelector from '../ReportTypeSelector';
import { ReportType } from '@/lib/types';

type SelectClientProps = {
  type: ReportType;
  showFilters(type: ReportType): void;
};

const SelectClient: FC<SelectClientProps> = ({ type, showFilters }) => {
  const { setFilters, filters } = useFilters();
  const { data, isLoading } = useClients();

  return (
    <>
      {isLoading && <LinearProgress />}
      {data && data.length > 0 && (
        <GridContainer>
          <Tabs
            headerColor="primary"
            plainTabs
            tabs={data?.map(client => ({
              onClick: () => {
                if (client.id === filters?.client?.id) return;
                setFilters({
                  category: undefined,
                  branch: undefined,
                  chain: undefined,
                  client
                });
              },
              tabName: client.name,
              tabContent: (
                <ReportTypeSelector showFilters={showFilters} type={type} />
              )
            }))}
          />
        </GridContainer>
      )}
    </>
  );
};

export default SelectClient;
