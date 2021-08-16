import { GridContainer, GridItem, Tabs, ComingSoon } from '@/components/ui';
import { Page } from '@/typings';
import { ListAlt } from '@material-ui/icons';
import { AdminLayout } from '@/components/common';

import { CategoriesTable, ProductsTable } from '@/components/data/tables';
import { ensureAuth } from '@/lib/auth';

const Content = ({ type }: { type: string }) => (
  <ComingSoon
    message={`Podrás administrar ${type} de las cuentas a tu cargo`}
  />
);

const Products: Page = () => {
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Tabs
          headerColor="primary"
          plainTabs
          tabs={[
            {
              tabName: 'Categorías',
              tabIcon: ListAlt,
              tabContent: <CategoriesTable />
            },
            {
              tabName: 'SKU',
              tabIcon: ListAlt,
              tabContent: <ProductsTable />
            },
            {
              tabName: 'Quiebre',
              tabIcon: ListAlt,
              tabContent: <Content type="el quiebre" />
            },
            {
              tabName: 'Precios',
              tabIcon: ListAlt,
              tabContent: <Content type="los precios" />
            }
          ]}
        />
      </GridItem>
    </GridContainer>
  );
};

Products.Layout = AdminLayout;

export const getServerSideProps = ensureAuth('backoffice');

export default Products;
