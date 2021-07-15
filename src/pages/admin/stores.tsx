// @material-ui/icons
import { ListAlt } from '@material-ui/icons';
// core components
import { Page } from '@/typings/page.js';
import { GridItem, GridContainer, Tabs } from '@/components/ui';
// import GetBranches from './GetTables/GetBranches';
import { ChainsTable, BranchesTable } from '@/components/data/tables';
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
