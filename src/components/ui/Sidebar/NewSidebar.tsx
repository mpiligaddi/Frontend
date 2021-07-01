import { FC, useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Drawer, List, Divider } from '@material-ui/core';
import avatar from '@/assets/img/placeholder.jpg';
import {
  Dashboard,
  PhotoLibrary,
  Pageview,
  AddPhotoAlternate
} from '@material-ui/icons';
import SidebarItem from './SidebarItem';
import firebase from 'firebase/app';
import { useUI } from '@/components/ui';

import { useStyles, Avatar } from './styles';
import { useMe } from '@/api/user';

export interface Route {
  name: string;
  path?: string;
  icon: JSX.Element;
  collapse?: boolean;
  routes?: Omit<Route, 'routes' | 'collapse'>[];
}

const baseRoutes: Route[] = [
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
        path: '/admin/new-report',
        name: 'Crear Reporte',
        icon: <AddPhotoAlternate />
      }
    ]
  }
];

type SidebarProps = {
  routes?: Route[];
};

const Sidebar: FC<SidebarProps> = ({ routes = baseRoutes }) => {
  const classes = useStyles();
  const user = useMe();
  const { displayMiniSidebar } = useUI();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: cn({
          [classes.drawerOpen]: !displayMiniSidebar,
          [classes.drawerClose]: displayMiniSidebar
        })
      }}
      className={cn(classes.drawer, {
        [classes.drawerOpen]: !displayMiniSidebar,
        [classes.drawerClose]: displayMiniSidebar
      })}
    >
      <div className={classes.user}>
        <Avatar
          src={firebase.auth().currentUser?.photoURL}
          default={avatar.src}
        />
        {!displayMiniSidebar && <p>{user.data?.displayName}</p>}
      </div>
      <Divider className={classes.divider} />
      <List component="nav" className={classes.listRoot}>
        {routes.map((route, i) => (
          <SidebarItem route={route} key={route.name} />
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
