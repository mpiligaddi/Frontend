import React, { FC } from 'react';
import { ComingSoon, GridContainer, GridItem, Tabs } from '@/components/ui';
import { AdminLayout } from '@/components/common';
import { Page } from '@/typings';
import { ensureAuth } from '@/lib/auth';

const Content: FC = () => (
  <ComingSoon message="Podrás ver analíticas de tu productividad y su evolución en el tiempo" />
);

const Productivity: Page = () => {
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Tabs
          headerColor="primary"
          plainTabs
          tabs={[
            {
              tabName: 'Enero',
              //tabIcon: ListAlt,
              tabContent: <Content />
            },
            {
              tabName: 'Febrero',
              //tabIcon: ListAlt,
              tabContent: <Content />
            },
            {
              tabName: 'Marzo',
              //tabIcon: ListAlt,
              tabContent: <Content />
            },
            {
              tabName: 'Abril',
              //tabIcon: ListAlt,
              tabContent: <Content />
            },
            {
              tabName: 'Mayo',
              //tabIcon: ListAlt,
              tabContent: <Content />
            },
            {
              tabName: 'Junio',
              //tabIcon: ListAlt,
              tabContent: <Content />
            },
            {
              tabName: 'Julio',
              //tabIcon: ListAlt,
              tabContent: <Content />
            },
            {
              tabName: 'Julio',
              //tabIcon: ListAlt,
              tabContent: <Content />
            },
            {
              tabName: 'Agosto',
              //tabIcon: ListAlt,
              tabContent: <Content />
            },
            {
              tabName: 'Septiembre',
              //tabIcon: ListAlt,
              tabContent: <Content />
            },
            {
              tabName: 'Octubre',
              //tabIcon: ListAlt,
              tabContent: <Content />
            },
            {
              tabName: 'Noviembre',
              //tabIcon: ListAlt,
              tabContent: <Content />
            },
            {
              tabName: 'Diciembre',
              //tabIcon: ListAlt,
              tabContent: <Content />
            }
          ]}
        />
      </GridItem>
    </GridContainer>
  );
};

Productivity.Layout = AdminLayout;

export const getServerSideProps = ensureAuth('backoffice');

export default Productivity;
