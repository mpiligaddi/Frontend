import ClientsTable from '@/components/clients/ClientTable';
import CreateClient from '@/components/clients/CreateClient';
import { AdminLayout } from '@/components/common';
import { GridContainer, GridItem, Tabs } from '@/components/ui';
import { Page } from '@/typings';
import { ListAlt, AddCircle } from '@material-ui/icons';

const Clients: Page = () => {
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Tabs
          headerColor="primary"
          plainTabs
          tabs={[
            {
              tabName: 'Clientes',
              tabIcon: ListAlt,
              tabContent: <ClientsTable />
            },
            {
              tabName: 'Nuevo Cliente',
              tabIcon: AddCircle,
              tabContent: <CreateClient />
            }
          ]}
        />
      </GridItem>
    </GridContainer>
  );
};

Clients.Layout = AdminLayout;

export default Clients;
