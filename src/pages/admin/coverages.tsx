import { AdminLayout } from '@/components/common';
import { CoveragesTable } from '@/components/data/tables';
import { GridContainer, GridItem, Tabs } from '@/components/ui';
import { ensureAuth } from '@/lib/auth';
import { Page } from '@/typings';
import { ListAlt } from '@material-ui/icons';

const Coverages: Page = () => {
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Tabs
          headerColor="primary"
          plainTabs
          tabs={[
            {
              tabName: 'Anexos',
              tabIcon: ListAlt,
              tabContent: <CoveragesTable />
            }
          ]}
        />
      </GridItem>
    </GridContainer>
  );
};

Coverages.Layout = AdminLayout;

export const getServerSideProps = ensureAuth('backoffice');

export default Coverages;
