// nodejs library to set properties for components
import type { FC } from 'react';
import cn from 'classnames';
import Image from 'next/image';

// @material-ui/core components
import { AppBar, Toolbar, Hidden } from '@material-ui/core';
import { Menu, MoreVert, ViewList } from '@material-ui/icons';

// core components
import AdminNavbarLinks from '../ClientNavbarLinks';
import { Button, useUI } from '@/components/ui';

import { useStyles } from './styles';

type AdminNavbarProps = {
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
  logo: StaticImageData;
};

const AdminNavbar: FC<AdminNavbarProps> = ({ logo }) => {
  const classes = useStyles();
  const { toggleSidebar, displayMiniSidebar, toggleMiniSidebar } = useUI();

  const sidebarMinimize = classes.sidebarMinimize + ' ';

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar className={classes.container}>
        <Hidden smDown implementation="css">
          <div className={sidebarMinimize}>
            {displayMiniSidebar ? (
              <Button
                justIcon
                round
                color="transparent"
                onClick={toggleMiniSidebar}
              >
                <ViewList className={classes.sidebarMiniIcon} />
              </Button>
            ) : (
              <Button
                justIcon
                round
                color="transparent"
                onClick={toggleMiniSidebar}
              >
                <MoreVert className={classes.sidebarMiniIcon} />
              </Button>
            )}
          </div>
        </Hidden>
        <div className={classes.flex}>
          <Button href="#" color="transparent">
            <div className={classes.logo}>
              <Image src={logo} alt="Chek" />
            </div>
          </Button>
        </div>
        <Hidden smDown implementation="css">
          <AdminNavbarLinks />
        </Hidden>
        <Hidden mdUp implementation="css">
          <Button
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={toggleSidebar}
          >
            <Menu />
          </Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
