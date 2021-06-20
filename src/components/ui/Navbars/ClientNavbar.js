import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";

// material-ui icons
import Menu from "@material-ui/icons/Menu";
import MoreVert from "@material-ui/icons/MoreVert";
import ViewList from "@material-ui/icons/ViewList";

// core components
import ClientNavbarLinks from "./ClientNavbarLinks";
import Button from "../../components/CustomButtons/Button.js";

import styles from "../../assets/jss/trade-app/components/adminNavbarStyle.js";

const useStyles = makeStyles(styles);

export default function ClientNavbar(props) {
  const classes = useStyles();
  const { color, brandText, logo } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color
  });
  const sidebarMinimize =
    classes.sidebarMinimize +
    " " ;
  return (
    <AppBar position="sticky" className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        {/* <Hidden smDown implementation="css">
          <div className={sidebarMinimize}>
            {props.miniActive ? (
              <Button
                justIcon
                round
                color="transparent"
                onClick={props.sidebarMinimize}
              >
                <ViewList className={classes.sidebarMiniIcon} />
              </Button>
            ) : (
              <Button
                justIcon
                round
                color="transparent"
                onClick={props.sidebarMinimize}
              >
                <MoreVert className={classes.sidebarMiniIcon} />
              </Button>
            )}
          </div>
        </Hidden> */}
             <div className={classes.flex}>
          <Button href="#" color="transparent">
          <img src={logo} className={classes.logo} />
          </Button>
        </div>
       
        <Hidden smDown implementation="css">
          <ClientNavbarLinks />
        </Hidden>
        <Hidden mdUp implementation="css">
          <Button
            className={classes.appResponsive}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

ClientNavbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  brandText: PropTypes.string,
  miniActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  sidebarMinimize: PropTypes.func
};
