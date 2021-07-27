import { ListAlt } from '@material-ui/icons';
import { Page } from '@/typings';
import { GridItem, GridContainer, Tabs } from '@/components/ui';
import {
  ChainsTable,
  BranchesTable,
  FormatsTable
} from '@/components/data/tables';
import { AdminLayout } from '@/components/common';

const Stores: Page = () => {
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Tabs
          headerColor="primary"
          plainTabs
          tabs={[
            {
              tabName: 'Formatos',
              tabIcon: ListAlt,
              tabContent: <FormatsTable />
            },
            {
              tabName: 'Sucursales',
              tabIcon: ListAlt,
              tabContent: <BranchesTable />
            },
            {
              tabName: 'Cadenas',
              tabIcon: ListAlt,
              tabContent: <ChainsTable />
            }
          ]}
        />
      </GridItem>
    </GridContainer>
  );
};

Stores.Layout = AdminLayout;

export default Stores;
