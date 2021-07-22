import { FC } from 'react';
import cn from 'classnames';

import { Drawer, List, Divider } from '@material-ui/core';
import avatar from '@/assets/img/placeholder.jpg';

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

export type SidebarProps = {
  routes: Route[];
};

const Sidebar: FC<SidebarProps> = ({ routes }) => {
  const classes = useStyles();
  const user = useMe();
  const { displayMiniSidebar, displaySidebar } = useUI();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: cn({
          [classes.drawerOpen]: !displayMiniSidebar,
          [classes.drawerMini]: displayMiniSidebar,
          [classes.drawerClose]: !displaySidebar
        })
      }}
      className={cn(classes.drawer, {
        [classes.drawerOpen]: !displayMiniSidebar,
        [classes.drawerMini]: displayMiniSidebar,
        [classes.drawerClose]: !displaySidebar
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
