import React, { useContext } from 'react';
import { FirebaseContext } from '../../Firebase';
import classNames from 'classnames';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Hidden from '@material-ui/core/Hidden';
import Popper from '@material-ui/core/Popper';
import Divider from '@material-ui/core/Divider';

// @material-ui/icons
import ExitToApp from '@material-ui/icons/ExitToApp';
import Notifications from '@material-ui/icons/Notifications';
//import Dashboard from '@material-ui/icons/Dashboard';
//import Search from '@material-ui/icons/Search';

// core components
import CustomInput from '../CustomInput/CustomInput.js';
import Button from '../CustomButtons/Button.js';
import SignOutButton from '../../myComponents/SignOutButton';

import styles from '../../assets/jss/trade-app/components/adminNavbarLinksStyle.js';

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const { firebase } = useContext(FirebaseContext);

  const [openNotification, setOpenNotification] = React.useState(null);
  const handleClickNotification = event => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const [openProfile, setOpenProfile] = React.useState(null);
  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  const classes = useStyles();
  const searchButton =
    classes.top + ' ' + classes.searchButton + ' ' + classNames({});
  const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover);
  const wrapper = classNames({});
  const managerClasses = classNames({
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
        //aria-label="Dashboard"
        justIcon
        className={classes.buttonLink}
        onClick={() => history.push("/admin/dash-a")}
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
          aria-owns={openNotification ? 'notification-menu-list' : null}
          aria-haspopup="true"
          onClick={handleClickNotification}
          className={classes.buttonLink}
        >
          <Notifications
            className={classes.headerLinksSvg + ' ' + classes.links}
          />
           <span className={classes.notifications}>3</span> 
          <Hidden mdUp implementation="css">
            <span
              onClick={handleClickNotification}
              className={classes.linkText}
            >
              {'Notificaciones'}
            </span>
          </Hidden> 
        </Button>
        <Popper
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          placement="bottom"
          color="primary"
          className={classNames({
            [classes.popperClose]: !openNotification,
            [classes.popperResponsive]: true,
            [classes.popperNav]: true
          })}
        >
           {({ TransitionProps }) => ( 
            <Grow
              {...TransitionProps}
              id="notification-menu-list"
              style={{ transformOrigin: '0 0 0' }}
            >
              <Paper className={classes.dropdown}>
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
          aria-label="Logout"
          justIcon
          aria-owns={openProfile ? 'profile-menu-list' : null}
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
          className={classNames({
            [classes.popperClose]: !openProfile,
            [classes.popperResponsive]: true,
            [classes.popperNav]: true
          })}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list"
              style={{ transformOrigin: '0 0 0' }}
            >
              <Paper className={classes.dropdown}>
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
}

HeaderLinks.propTypes = {};
