import { FC } from 'react';
import { LinearProgress, GridContainer, Tabs } from '@/components/ui';
import { useClients } from '@/api/data';
import { useFilters } from '@/api/reports/filters';
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
            tabs={data?.map(c => ({
              onClick: () => {
                if (c.ID === filters?.client?.ID) return;
                setFilters({
                  category: undefined,
                  branch: undefined,
                  chain: undefined,
                  client: data?.find(client => client.ID === c.ID)
                });
              },
              tabName: c.name,
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
