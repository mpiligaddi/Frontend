/*eslint-disable*/
import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';

// core components
import AdminNavbarLinks from '../../components/Navbars/AdminNavbarLinks.js';
import ClientNavbarLinks from '../../components/Navbars/ClientNavbarLinks.js';
import SuperAdminNavbarLinks from '../../components/Navbars/SuperAdminNavbarLinks.js';

import sidebarStyle from '../../assets/jss/trade-app/components/sidebarStyle.js';

import avatar from '../../assets/img/placeholder.jpg';

import { getItem, setItem } from '../../Services/localStorage';
import { FirebaseContext } from '../../Firebase/index.js';
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input
} from '@material-ui/core';

var ps;

const ImagePreview = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
`;

const Avatar = styled.div`
  background: url(${props => props.src}), url(${props => props.default});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: all 300ms linear;
  width: 34px;
  height: 34px;
  overflow: hidden;
  float: left;
  z-index: 5;
  margin: 0 11px 0 23px;
  border-radius: 50%;
  box-shadow: 0 10px 20px -12px rgba(0, 0, 0, 0.32),
    0 4px 15px 0px rgba(0, 0, 0, 0.1), 0 8px 5px -5px rgba(0, 0, 0, 0.2);
  position: relative;

  cursor: pointer;
  ::after {
    content: '';
    text-align: center;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    backdrop-filter: blur(0);
    width: 100%;
    height: 100%;
    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  ::before {
    font-family: 'Font Awesome\ 5 Free';
    font-weight: 900;
    content: '\f007';
    position: absolute;
    left: 50%;
    top: 50%;
    opacity: 0;
    z-index: 2;
    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    transform: translate(-50%, -50%);
  }
  :hover::after {
    opacity: 1;
    visibility: visible;
    backdrop-filter: blur(1px);
  }
  :hover::before {
    opacity: 1;
  }

  input {
    position: absolute;
    width: 100%;
    height: 100%;
    background: red;
    z-index: 100;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
  }
`;

class SidebarWrapper extends React.Component {
  sidebarWrapper = React.createRef();
  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(this.sidebarWrapper.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy();
    }
  }
  render() {
    const { className, user, headerLinks, links } = this.props;
    return (
      <div className={className} ref={this.sidebarWrapper}>
        {user}
        {headerLinks}
        {links}
      </div>
    );
  }
}

class Sidebar extends React.Component {
  static contextType = FirebaseContext;

  constructor(props) {
    super(props);
    this.state = {
      uploadingPhoto: false,
      currentPhoto: null,
      openAvatar: false,
      miniActive: false,
      isSuperAdmin: false,
      isAdmin: false,
      ...this.getCollapseStates(props.routes)
    };
  }
  mainPanel = React.createRef();
  // this creates the intial state of this component based on the collapse routes
  // that it gets through this.props.routes
  getCollapseStates = routes => {
    let initialState = {};
    routes.map(prop => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: this.getCollapseInitialState(prop.views),
          ...this.getCollapseStates(prop.views),
          ...initialState
        };
      }
      return null;
    });
    return initialState;
  };
  // this verifies if any of the collapses should be default opened on a rerender of this component
  getCollapseInitialState(routes) {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && this.getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (window.location.href.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute = routeName => {
    return window.location.href.indexOf(routeName) > -1 ? 'active' : '';
  };
  openCollapse(collapse) {
    var st = {};
    st[collapse] = !this.state[collapse];
    this.setState(st);
  }
  // this function creates the links and collapses that appear in the sidebar (left menu)
  createLinks = routes => {
    const { classes, color } = this.props;
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.collapse) {
        var st = {};
        st[prop['state']] = !this.state[prop.state];
        const navLinkClasses =
          classes.itemLink +
          ' ' +
          cx({
            [' ' + classes.collapseActive]: this.getCollapseInitialState(
              prop.views
            )
          });
        const itemText =
          classes.itemText +
          ' ' +
          cx({
            [classes.itemTextMini]:
              this.props.miniActive && this.state.miniActive
          });
        const collapseItemText =
          classes.collapseItemText +
          ' ' +
          cx({
            [classes.collapseItemTextMini]:
              this.props.miniActive && this.state.miniActive
          });
        const itemIcon = classes.itemIcon + ' ';
        const caret = classes.caret + ' ';
        const collapseItemMini = classes.collapseItemMini + ' ';
        return (
          <ListItem
            key={key}
            className={cx(
              { [classes.item]: prop.icon !== undefined },
              { [classes.collapseItem]: prop.icon === undefined }
            )}
          >
            <NavLink
              to={'#'}
              className={navLinkClasses}
              onClick={e => {
                e.preventDefault();
                this.setState(st);
              }}
            >
              {prop.icon !== undefined ? (
                typeof prop.icon === 'string' ? (
                  <Icon className={itemIcon}>{prop.icon}</Icon>
                ) : (
                  <prop.icon className={itemIcon} />
                )
              ) : (
                <span className={collapseItemMini}>{prop.mini}</span>
              )}
              <ListItemText
                primary={prop.name}
                secondary={
                  <b
                    className={
                      caret +
                      ' ' +
                      (this.state[prop.state] ? classes.caretActive : '')
                    }
                  />
                }
                disableTypography={true}
                className={cx(
                  { [itemText]: prop.icon !== undefined },
                  { [collapseItemText]: prop.icon === undefined }
                )}
              />
            </NavLink>
            <Collapse in={this.state[prop.state]} unmountOnExit>
              <List className={classes.list + ' ' + classes.collapseList}>
                {this.createLinks(prop.views)}
              </List>
            </Collapse>
          </ListItem>
        );
      }
      const innerNavLinkClasses =
        classes.collapseItemLink +
        ' ' +
        cx({
          [' ' + classes[color]]: this.activeRoute(prop.path)
        });
      const collapseItemMini = classes.collapseItemMini + ' ';
      const navLinkClasses =
        classes.itemLink +
        ' ' +
        cx({
          [' ' + classes[color]]: this.activeRoute(prop.path)
        });
      const itemText =
        classes.itemText +
        ' ' +
        cx({
          [classes.itemTextMini]: this.props.miniActive && this.state.miniActive
        });
      const collapseItemText =
        classes.collapseItemText +
        ' ' +
        cx({
          [classes.collapseItemTextMini]:
            this.props.miniActive && this.state.miniActive
        });
      const itemIcon = classes.itemIcon + ' ';
      return (
        <ListItem
          key={key}
          className={cx(
            { [classes.item]: prop.icon !== undefined },
            { [classes.collapseItem]: prop.icon === undefined }
          )}
        >
          <NavLink
            to={prop.layout + prop.path}
            className={cx(
              { [navLinkClasses]: prop.icon !== undefined },
              { [innerNavLinkClasses]: prop.icon === undefined }
            )}
          >
            {prop.icon !== undefined ? (
              typeof prop.icon === 'string' ? (
                <Icon className={itemIcon}>{prop.icon}</Icon>
              ) : (
                <prop.icon className={itemIcon} />
              )
            ) : (
              <span className={collapseItemMini}>{prop.mini}</span>
            )}
            <ListItemText
              primary={prop.name}
              disableTypography={true}
              className={cx(
                { [itemText]: prop.icon !== undefined },
                { [collapseItemText]: prop.icon === undefined }
              )}
            />
          </NavLink>
        </ListItem>
      );
    });
  };

  toggleUploadingPhoto = () => {
    this.setState(prevState => {
      prevState.uploadingPhoto = !prevState.uploadingPhoto;
      return prevState;
    });
  };

  clearStatePhoto = () => {
    this.setState(prevState => {
      prevState.uploadingPhoto = false;
      prevState.currentPhoto = null;
      return prevState;
    });
  };

  dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], { type: mimeString });
    return blob;
  }

  handleChangePhoto = e => {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = ev => {
      this.setState(prevState => {
        prevState.currentPhoto = ev.target.result;
        return prevState;
      });
    };
    reader.readAsDataURL(file);
  };

  uploadAndUpdatePhoto = e => {
    e.preventDefault();
    this.toggleUploadingPhoto();
    let blobFile = this.dataURItoBlob(this.state.currentPhoto);
    let photoRef = this.context.firebase.storage
      .ref()
      .child(
        `images/profiles/${getItem('displayName').replaceAll(' ', '_')}.png`
      );
    photoRef.put(blobFile).then(snap => {
      snap.ref.getDownloadURL().then(downloadURL => {
        this.context.firebase.auth.currentUser
          .updateProfile({ photoURL: downloadURL })
          .then(() => {
            setItem('photoUrl', downloadURL);
            this.clearStatePhoto();
          });
      });
    });
  };

  render() {
    const { classes, logo, image, logoText, routes, bgColor } = this.props;
    const itemText =
      classes.itemText +
      ' ' +
      cx({
        [classes.itemTextMini]: this.props.miniActive && this.state.miniActive
      });
    const collapseItemText =
      classes.collapseItemText +
      ' ' +
      cx({
        [classes.collapseItemTextMini]:
          this.props.miniActive && this.state.miniActive
      });
    const userWrapperClass =
      classes.user +
      ' ' +
      cx({
        [classes.whiteAfter]: bgColor === 'white'
      });
    const caret = classes.caret + ' ';
    const collapseItemMini = classes.collapseItemMini + ' ';

    var user = (
      <div className={userWrapperClass}>
        <Dialog open={this.state.currentPhoto}>
          {this.state.uploadingPhoto ? (
            <DialogContent>
              <CircularProgress color="primary" />
            </DialogContent>
          ) : (
            <>
              <DialogTitle>Cambia tu foto de perfil</DialogTitle>
              <DialogContent>
                <ImagePreview src={this.state.currentPhoto}></ImagePreview>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={this.clearStatePhoto.bind(this)}
                  color="secondary"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={this.uploadAndUpdatePhoto.bind(this)}
                  color="primary"
                >
                  Actualizar foto
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
        <Avatar src={getItem('photoUrl')} default={avatar}>
          <input
            onChange={this.handleChangePhoto.bind(this)}
            type="file"
            accept="image/*"
          />
        </Avatar>
        {/* <List className={classes.list}> */}
        {/* <ListItem className={classes.item + " " + classes.userItem}> */}
        <NavLink
          to={'#'}
          className={classes.itemLink + ' ' + classes.userCollapseButton}
          onClick={() => this.openCollapse('openAvatar')}
        >
          <ListItemText
            primary={getItem('displayName')}
            // secondary={
            //   <b
            //     className={
            //       caret +
            //       " " +
            //       classes.userCaret +
            //       " " +
            //       (this.state.openAvatar ? classes.caretActive : "")
            //     }
            //   />
            // }
            disableTypography={true}
            className={itemText + ' ' + classes.userItemText}
          />
        </NavLink>
        {/* <Collapse in={this.state.openAvatar} unmountOnExit>
              <List className={classes.list + " " + classes.collapseList}>
                <ListItem className={classes.collapseItem}>
                  <NavLink
                    to="#"
                    className={
                      classes.itemLink + " " + classes.userCollapseLinks
                    }
                  >
                    <ListItemText
                      primary={"Mi Perfil"}
                      disableTypography={true}
                      className={collapseItemText}
                    />
                  </NavLink>
                </ListItem>

              </List>
            </Collapse> */}
        {/* </ListItem> */}
        {/* </List> */}
      </div>
    );
    var links = (
      <List className={classes.list}>{this.createLinks(routes)}</List>
    );

    const logoNormal =
      classes.logoNormal +
      ' ' +
      cx({
        [classes.logoNormalSidebarMini]:
          this.props.miniActive && this.state.miniActive
      });
    const logoMini = classes.logoMini + ' ';
    const logoClasses =
      classes.logo +
      ' ' +
      cx({
        [classes.whiteAfter]: bgColor === 'white'
      });
    var brand = (
      <div className={logoClasses}>
        <a href="#" target="_blank" className={logoMini}>
          <img src={logo} alt="logo" className={classes.img} />
        </a>
        <a href="#" target="_blank" className={logoNormal}>
          {logoText}
        </a>
      </div>
    );
    const drawerPaper =
      classes.drawerPaper +
      ' ' +
      cx({
        [classes.drawerPaperMini]:
          this.props.miniActive && this.state.miniActive
      });
    const sidebarWrapper =
      classes.sidebarWrapper +
      ' ' +
      cx({
        [classes.drawerPaperMini]:
          this.props.miniActive && this.state.miniActive,
        [classes.sidebarWrapperWithPerfectScrollbar]:
          navigator.platform.indexOf('Win') > -1
      });
    return (
      <div ref={this.mainPanel}>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={'right'}
            open={this.props.open}
            classes={{
              paper: drawerPaper + ' ' + classes[bgColor + 'Background']
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {/* {brand} */}
            <SidebarWrapper
              className={sidebarWrapper}
              user={user}
              headerLinks={
                this.props.isSuperAdmin ? (
                  <SuperAdminNavbarLinks />
                ) : this.props.isAdmin ? (
                  <AdminNavbarLinks />
                ) : (
                  <ClientNavbarLinks />
                )
              }
              links={links}
            />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: 'url(' + image + ')' }}
              />
            ) : null}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            onMouseOver={() => this.setState({ miniActive: false })}
            onMouseOut={() => this.setState({ miniActive: true })}
            anchor={'left'}
            variant="permanent"
            open
            classes={{
              paper: drawerPaper + ' ' + classes[bgColor + 'Background']
            }}
          >
            {/* {brand} */}
            <SidebarWrapper
              className={sidebarWrapper}
              user={user}
              links={links}
            />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: 'url(' + image + ')' }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  bgColor: PropTypes.oneOf(['white', 'black', 'blue']),
  color: PropTypes.oneOf([
    'white',
    'red',
    'orange',
    'green',
    'blue',
    'teal',
    'rose'
  ]),
  logo: PropTypes.string,
  logoText: PropTypes.string,
  image: PropTypes.object,
  routes: PropTypes.arrayOf(PropTypes.object),
  miniActive: PropTypes.bool,
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func
};

SidebarWrapper.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  headerLinks: PropTypes.object,
  links: PropTypes.object
};

export default withStyles(sidebarStyle)(Sidebar);
