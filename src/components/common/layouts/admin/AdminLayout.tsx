import React, { useState, useEffect, FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { AdminNavbar } from '@/components/ui';
import Sidebar from '@/components/ui/Sidebar/NewSidebar';
import ClientsFiltersProvider from '@/api/reports/filters/query';

import { containerFluid, transition } from '@/utils/styles';
import logo from '@/assets/img/CHEK-NEGRO (1).png';
import { useMe } from '@/api/user';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  content: {
    marginTop: '70px',
    padding: '30px 15px'
  },
  container: containerFluid,
  mainPanel: {
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease',
    overflow: 'auto',
    position: 'relative',
    float: 'right',
    ...transition,
    maxHeight: '100%',
    width: '100%',
    overflowScrolling: 'touch'
  }
}));

const AdminLayout: FC = ({ children }) => {
  const user = useMe();
  const classes = useStyles();
  const [miniActive, setMiniActive] = useState(false);

  if (user.isIdle || user.isLoading) return <p>Loading...</p>;

  return (
    <ClientsFiltersProvider>
      <div className={classes.root}>
        <Sidebar />
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
    </ClientsFiltersProvider>
  );
};

export default AdminLayout;
