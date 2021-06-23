import React, { FC, useState } from 'react';
import cn from 'classnames';

import {
  MenuItem,
  MenuList,
  Paper,
  Grow,
  Hidden,
  Popper,
  ClickAwayListener
} from '@material-ui/core';

import { ExitToApp, Notifications } from '@material-ui/icons';

import { SignOutButton, Button } from '@/components/ui';

import { useStyles } from './styles';
import { useDropdownStyles } from '@/styles/dropdown';

const ClientNavBarLinks: FC = () => {
  const [openNotification, setOpenNotification] = useState(null);
  const [openProfile, setOpenProfile] = useState(null);
  const classes = useStyles();
  const dropDownClasses = useDropdownStyles();

  const handleClickNotification = (event: React.MouseEvent) => {
    if (openNotification && (openNotification as any).contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget as any);
    }
  };

  const handleCloseNotification = () => {
    setOpenNotification(null);
  };

  const handleClickProfile = (event: React.MouseEvent) => {
    if (openProfile && (openProfile as any).contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget as any);
    }
  };

  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  const searchButton = classes.top + ' ' + classes.searchButton + ' ' + cn({});
  const dropdownItem = cn(
    dropDownClasses.dropdownItem,
    dropDownClasses.primaryHover
  );
  const wrapper = cn({});
  const managerClasses = cn({
    [classes.managerClasses]: true
  });
  return (
    <div className={wrapper}>
      {/* <CustomInput
        formControlProps={{
          className: classes.top + ' ' + classes.search
        }}
        inputProps={{
          placeholder: 'Buscar',
          inputProps: {
            'aria-label': 'Search',
            className: classes.searchInput
          }
        }}
      />
      <Button
        color="white"
        aria-label="edit"
        justIcon
        round
        className={searchButton}
      >
        <Search className={classes.headerLinksSvg + ' ' + classes.searchIcon} />
      </Button>
      <Button
        color="transparent"
        simple
        aria-label="Dashboard"
        justIcon
        className={classes.buttonLink}
      >
        <Dashboard className={classes.headerLinksSvg + ' ' + classes.links} />
        <Hidden mdUp implementation="css">
          <span className={classes.linkText}>{'Dashboard'}</span>
        </Hidden>
      </Button> */}
      <div className={managerClasses}>
        <Button
          color="transparent"
          justIcon
          aria-label="Notificationes"
          aria-owns={openNotification ? 'notification-menu-list' : undefined}
          aria-haspopup="true"
          onClick={handleClickNotification}
          className={classes.buttonLink}
        >
          <Notifications
            className={classes.headerLinksSvg + ' ' + classes.links}
          />
        </Button>
        <Popper
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          placement="bottom"
          color="primary"
          className={cn({
            [dropDownClasses.popperClose]: !openNotification,
            [dropDownClasses.popperResponsive]: true,
            [dropDownClasses.popperNav]: true
          })}
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} style={{ transformOrigin: '0 0 0' }}>
              <Paper className={dropDownClasses.dropdown}>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={dropdownItem}
                    >
                      {'Permanecé atento'}
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={dropdownItem}
                    >
                      {'Próximamente verás aquí'}
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={dropdownItem}
                    >
                      {'Tus notificaciones'}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

      <div className={managerClasses}>
        <Button
          color="transparent"
          aria-label="ExitToApp"
          justIcon
          aria-owns={openProfile ? 'profile-menu-list' : undefined}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <ExitToApp className={classes.headerLinksSvg + ' ' + classes.links} />
          <Hidden mdUp implementation="css">
            <span onClick={handleClickProfile} className={classes.linkText}>
              Cerrar sesión
            </span>
          </Hidden>
        </Button>
        <Popper
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          placement="bottom"
          className={cn({
            [dropDownClasses.popperClose]: !openProfile,
            [dropDownClasses.popperResponsive]: true,
            [dropDownClasses.popperNav]: true
          })}
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} style={{ transformOrigin: '0 0 0' }}>
              <Paper className={dropDownClasses.dropdown}>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    {/* <MenuItem
                      onClick={handleCloseProfile}
                      className={dropdownItem}
                    >
                      Mi perfil
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={dropdownItem}
                    >
                      Configuración
                    </MenuItem>
                    <Divider light /> */}
                    <SignOutButton
                      onClick={handleCloseProfile}
                      className={dropdownItem}
                    />
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
};

export default ClientNavBarLinks;
