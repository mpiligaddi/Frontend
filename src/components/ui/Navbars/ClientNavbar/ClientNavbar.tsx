import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';

import { AppBar, Toolbar, Hidden } from '@material-ui/core';

import Menu from '@material-ui/icons/Menu';

import { Button, ClientNavbarLinks } from '@/components/ui';

import { useStyles } from './styles';

type ClientNavbarProps = {
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
  logo: StaticImageData;
};

const ClientNavbar: FC<ClientNavbarProps> = ({ color, logo }) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', resizeFunction);

    return () => window.removeEventListener('resize', resizeFunction);
  }, []);

  const appBarClasses = cn({
    [' ' + classes[color!]]: color
  });

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  return (
    <AppBar position="sticky" className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <Button href="#" color="transparent">
            <div className={classes.logo}>
              <Image src={logo} alt="logo" />
            </div>
          </Button>
        </div>

        <Hidden smDown implementation="css">
          <ClientNavbarLinks />
        </Hidden>

        <Hidden mdUp implementation="css">
          <Button
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={toggleDrawer}
          >
            <Menu />
          </Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default ClientNavbar;
