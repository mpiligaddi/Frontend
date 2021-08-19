import {
  ClientsTable,
  CoveragesTable,
  CategoriesTable,
  ProductsTable
} from '@/components/data/tables';
import { CreateClient } from '@/components/data/forms';
import { AdminLayout } from '@/components/common';
import { GridContainer, GridItem, Tabs } from '@/components/ui';
import { Page } from '@/typings';
import { ListAlt, AddCircle } from '@material-ui/icons';
import { ensureAuth } from '@/lib/auth';

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
              tabName: 'Anexos',
              tabIcon: ListAlt,
              tabContent: <CoveragesTable />
            },
            {
              tabName: 'Categorías',
              tabIcon: ListAlt,
              tabContent: <CategoriesTable />
            },
            {
              tabName: 'Productos',
              tabIcon: ListAlt,
              tabContent: <ProductsTable />
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

export const getServerSideProps = ensureAuth('backoffice');

export default Clients;
