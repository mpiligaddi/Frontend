import React, { useState, FC } from 'react';

import { AdminNavbar } from '@/components/ui';
import Sidebar, { Route } from '@/components/ui/Sidebar/NewSidebar';
import { FiltersProvider } from '@/api/reports/filters';

import logo from '@/assets/img/CHEK-NEGRO (1).png';
import { useMe } from '@/api/user';
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
  const user = useMe();
  const classes = useStyles();
  const [miniActive, setMiniActive] = useState(false);

  if (user.isIdle || user.isLoading) return <p>Loading...</p>;

  return (
    <FiltersProvider>
      <div className={classes.root}>
        <Sidebar routes={routes} />
        <AdminNavbar
          sidebarMinimize={() => {}}
          logo={logo}
          miniActive={miniActive}
          handleDrawerToggle={() => setMiniActive(!miniActive)}
        />
        <div id="mainpanel" className={classes.mainPanel}>
          <main className={classes.content}>
            <div className={classes.container}>{children}</div>
          </main>
        </div>
      </div>
    </FiltersProvider>
  );
};

export default AdminLayout;
