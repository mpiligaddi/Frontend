import { GridContainer, GridItem, Tabs, ComingSoon } from '@/components/ui';
import { Page } from '@/typings';
import { ListAlt } from '@material-ui/icons';
import { AdminLayout } from '@/components/common';

const Content = () => (
  <ComingSoon message="Podrás administrar los productos de las cuentas a tu cargo" />
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
              tabContent: <Content />
            },
            {
              tabName: 'SKU',
              tabIcon: ListAlt,
              tabContent: <Content />
            },
            {
              tabName: 'Quiebre',
              tabIcon: ListAlt,
              tabContent: <Content />
            },
            {
              tabName: 'Precios',
              tabIcon: ListAlt,
              tabContent: <Content />
            }
          ]}
        />
      </GridItem>
    </GridContainer>
  );
};

Products.Layout = AdminLayout;

export default Products;
