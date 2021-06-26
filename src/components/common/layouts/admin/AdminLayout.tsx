import React, { useState, useEffect, FC } from 'react';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import AdminNavbar from '@/components/ui/Navbars/AdminNavbar';
import Sidebar from '@/components/ui/Sidebar/NewSidebar';
import { AdminFiltersProvider } from '@/api/reports/filters';
//styles
import logo from '@/assets/img/CHEK-NEGRO (1).png';
import { useMe } from '@/api/user';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  content: {
    marginLeft: 10
  }
}));

const AdminLayout: FC = ({ children }) => {
  const user = useMe();
  const classes = useStyles();

  if (user.isIdle || user.isLoading) return <p>Loading...</p>;

  return (
    // <AdminFiltersProvider>
    <div className={classes.root}>
      <Sidebar />
      {/* <div id="mainpanel" className={mainPanelClasses} ref={mainPanel}>
          <AdminNavbar
            sidebarMinimize={sidebarMinimize.bind(this)}
            miniActive={miniActive}
            logo={logo}
            brandText="Chek"
            handleDrawerToggle={handleDrawerToggle}
          />
          {getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>
                {children}
              </div>
            </div>
          ) : (
            <div className={classes.map}>
              {children}
            </div>
          )}
        </div> */}
      <main className={classes.content}>{children}</main>
    </div>
    // </AdminFiltersProvider>
  );
};

export default AdminLayout;
