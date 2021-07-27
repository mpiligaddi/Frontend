import React, { useState, FC } from 'react';

import { AdminNavbar } from '@/components/ui';
import { Sidebar, Route } from '@/components/ui';
import { FiltersProvider } from '@/context/filters';

import logo from '@/assets/img/CHEK-NEGRO (1).png';
import { useStyles } from './styles';
import {
  Dashboard,
  PhotoLibrary,
  Pageview,
  Person,
  AddPhotoAlternate,
  Store,
  ShoppingCart,
  TrendingUp,
  List
} from '@material-ui/icons';

const routes: Route[] = [
  {
    name: 'Resumen',
    path: '/admin/dashboard',
    icon: <Dashboard />
  },
  {
    collapse: true,
    name: 'Reportes',
    icon: <PhotoLibrary />,
    routes: [
      {
        path: '/admin/revision',
        name: 'Revisar Reportes',
        icon: <Pageview />
      },
      {
        path: '/admin/reports/new',
        name: 'Crear Reporte',
        icon: <AddPhotoAlternate />
      }
    ]
  },
  {
    name: 'Clientes',
    path: '/admin/clients',
    icon: <Person />
  },
  {
    name: 'Anexos',
    path: '/admin/coverages',
    icon: <List />
  },
  {
    name: 'Tiendas',
    path: '/admin/stores',
    icon: <Store />
  },
  {
    name: 'Productos',
    path: '/admin/products',
    icon: <ShoppingCart />
  },
  {
    name: 'Mi Productividad',
    path: '/admin/productivity',
    icon: <TrendingUp />
  }
];

const AdminLayout: FC = ({ children }) => {
  const classes = useStyles();

  return (
    <FiltersProvider>
      <div className={classes.root}>
        <Sidebar routes={routes} />
        <div id="mainpanel" className={classes.mainPanel}>
          <AdminNavbar logo={logo} />
          <main className={classes.content}>
            <div className={classes.container}>{children}</div>
          </main>
        </div>
      </div>
    </FiltersProvider>
  );
};

export default AdminLayout;
