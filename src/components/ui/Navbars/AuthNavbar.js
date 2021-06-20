import { useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// @material-ui/icons
import Menu from '@material-ui/icons/Menu';
import Info from '@material-ui/icons/Info';
import Home from '@material-ui/icons/Home';
import LockOpen from '@material-ui/icons/LockOpen';

// core components
import Button from '../../components/CustomButtons/Button';

import styles from '../../assets/jss/trade-app/components/authNavbarStyle.js';

import logo from '../../assets/img/CHEK.png';

const useStyles = makeStyles(styles);

export default function AuthNavbar(props) {
  const [open, setOpen] = useState(false);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  // verifies if routeName is the one active (in browser input)
  const activeRoute = routeName => {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  };
  const classes = useStyles();
  const { color } = props;
  const appBarClasses = cx({
    [' ' + classes[color]]: color
  });
  var list = (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <NavLink
          to={'/auth/home'}
          className={cx(classes.navLink, {
            [classes.navLinkActive]: activeRoute('/auth/home')
          })}
        >
          <Home className={classes.listItemIcon} />
          <ListItemText
            primary={'Home'}
            disableTypography={true}
            className={classes.listItemText}
          />
        </NavLink>
      </ListItem>
      <ListItem className={classes.listItem}>
        <NavLink
          to={'/auth/login'}
          className={cx(classes.navLink, {
            [classes.navLinkActive]: activeRoute('/auth/login')
          })}
        >
          <LockOpen className={classes.listItemIcon} />
          <ListItemText
            primary={'Iniciar sesión'}
            disableTypography={true}
            className={classes.listItemText}
          />
        </NavLink>
      </ListItem>
      <ListItem className={classes.listItem}>
        <NavLink
          to={'/auth/contacto'}
          className={cx(classes.navLink, {
            [classes.navLinkActive]: activeRoute('/auth/contacto')
          })}
        >
          <Info className={classes.listItemIcon} />
          <ListItemText
            primary={'Contacto'}
            disableTypography={true}
            className={classes.listItemText}
          />
        </NavLink>
      </ListItem>
    </List>
  );
  return (
    <AppBar position="static" className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <Hidden smDown>
          <div className={classes.flex}>
            <Button
              className={classes.title}
              onClick={() => history.push('/auth/home')}
              color="transparent"
            >
              <div className={{widht: "10px"}}>
              <img src={logo} className={classes.logo} widht="10px" />
              </div>
            </Button>
          </div>
        </Hidden>
        <Hidden mdUp>
          <div className={classes.flex}>
            <Button href="#" className={classes.title} color="transparent">
              Chek
            </Button>
          </div>
        </Hidden>
        <Hidden smDown>{list}</Hidden>
        <Hidden mdUp>
          <Button
            className={classes.sidebarButton}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
        <Hidden mdUp>
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              anchor={'left'}
              open={open}
              classes={{
                paper: classes.drawerPaper
              }}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {list}
            </Drawer>
          </Hidden>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

AuthNavbar.propTypes = {
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  brandText: PropTypes.string
};
