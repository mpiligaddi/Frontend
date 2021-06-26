/*eslint-disable*/
import React, { useContext, FC, useRef, useState } from 'react';

import PropTypes from 'prop-types';
// javascript plugin used to create scrollbars on windows
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
import AdminNavbarLinks from '@/components/ui/Navbars/AdminNavbarLinks';
import ClientNavbarLinks from '@/components/ui/Navbars/ClientNavbarLinks';
import SuperAdminNavbarLinks from '@/components/ui/Navbars/SuperAdminNavbarLinks';

import sidebarStyle from '../../assets/jss/trade-app/components/sidebarStyle.js';

import avatar from '@/assets/img/placeholder.jpg';
import { Avatar, ImagePreview } from './styles';
import SidebarWrapper from './SidebarWrapper';

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

const Sidebar: FC = props => {
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [openAvatar, setOpenAvatar] = useState(false);
  const [miniActive, setMiniActive] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const mainPanel = useRef<HTMLDivElement>(null);

  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = routes => {
    const { classes, color } = props;
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.collapse) {
        var st = {};
        st[prop['state']] = !state[prop.state];
        const navLinkClasses =
          classes.itemLink +
          ' ' +
          cx({
            [' ' + classes.collapseActive]: getCollapseInitialState(prop.views)
          });
        const itemText =
          classes.itemText +
          ' ' +
          cx({
            [classes.itemTextMini]: props.miniActive && miniActive
          });
        const collapseItemText =
          classes.collapseItemText +
          ' ' +
          cx({
            [classes.collapseItemTextMini]: props.miniActive && miniActive
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
                setState(st);
              }}
            >
              {prop.icon ? (
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
                      (state[prop.state] ? classes.caretActive : '')
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
            <Collapse in={state[prop.state]} unmountOnExit>
              <List className={classes.list + ' ' + classes.collapseList}>
                {createLinks(prop.views)}
              </List>
            </Collapse>
          </ListItem>
        );
      }
      const innerNavLinkClasses =
        classes.collapseItemLink +
        ' ' +
        cx({
          [' ' + classes[color]]: activeRoute(prop.path)
        });
      const collapseItemMini = classes.collapseItemMini + ' ';
      const navLinkClasses =
        classes.itemLink +
        ' ' +
        cx({
          [' ' + classes[color]]: activeRoute(prop.path)
        });
      const itemText =
        classes.itemText +
        ' ' +
        cx({
          [classes.itemTextMini]: props.miniActive && state.miniActive
        });
      const collapseItemText =
        classes.collapseItemText +
        ' ' +
        cx({
          [classes.collapseItemTextMini]: props.miniActive && state.miniActive
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

  const toggleUploadingPhoto = () => {
    setState(prevState => {
      prevState.uploadingPhoto = !prevState.uploadingPhoto;
      return prevState;
    });
  };

  const clearStatePhoto = () => {
    setState(prevState => {
      prevState.uploadingPhoto = false;
      prevState.currentPhoto = null;
      return prevState;
    });
  };

  const dataURItoBlob = dataURI => {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], { type: mimeString });
    return blob;
  };

  const handleChangePhoto = e => {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = ev => {
      setState(prevState => {
        prevState.currentPhoto = ev.target.result;
        return prevState;
      });
    };
    reader.readAsDataURL(file);
  };

  const uploadAndUpdatePhoto = e => {
    e.preventDefault();
    toggleUploadingPhoto();
    let blobFile = dataURItoBlob(state.currentPhoto);
    let photoRef = context.firebase.storage
      .ref()
      .child(
        `images/profiles/${getItem('displayName').replaceAll(' ', '_')}.png`
      );
    photoRef.put(blobFile).then(snap => {
      snap.ref.getDownloadURL().then(downloadURL => {
        context.firebase.auth.currentUser
          .updateProfile({ photoURL: downloadURL })
          .then(() => {
            setItem('photoUrl', downloadURL);
            clearStatePhoto();
          });
      });
    });
  };

  const { classes, logo, image, logoText, routes, bgColor } = props;
  const itemText =
    classes.itemText +
    ' ' +
    cx({
      [classes.itemTextMini]: props.miniActive && state.miniActive
    });
  const collapseItemText =
    classes.collapseItemText +
    ' ' +
    cx({
      [classes.collapseItemTextMini]: props.miniActive && state.miniActive
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
      <Dialog open={state.currentPhoto}>
        {state.uploadingPhoto ? (
          <DialogContent>
            <CircularProgress color="primary" />
          </DialogContent>
        ) : (
          <>
            <DialogTitle>Cambia tu foto de perfil</DialogTitle>
            <DialogContent>
              <ImagePreview src={currentPhoto}></ImagePreview>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => clearStatePhoto()} color="secondary">
                Cancelar
              </Button>
              <Button onClick={() => uploadAndUpdatePhoto()} color="primary">
                Actualizar foto
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      <Avatar src={getItem('photoUrl')} default={avatar}>
        <input onChange={handleChangePhoto} type="file" accept="image/*" />
      </Avatar>
      {/* <List className={classes.list}> */}
      {/* <ListItem className={classes.item + " " + classes.userItem}> */}
      <NavLink
        to={'#'}
        className={classes.itemLink + ' ' + classes.userCollapseButton}
        onClick={() => openCollapse('openAvatar')}
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
          //       (state.openAvatar ? classes.caretActive : "")
          //     }
          //   />
          // }
          disableTypography={true}
          className={itemText + ' ' + classes.userItemText}
        />
      </NavLink>
      {/* <Collapse in={state.openAvatar} unmountOnExit>
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
  var links = <List className={classes.list}>{createLinks(routes)}</List>;

  const logoNormal =
    classes.logoNormal +
    ' ' +
    cx({
      [classes.logoNormalSidebarMini]: props.miniActive && state.miniActive
    });

  const drawerPaper =
    classes.drawerPaper +
    ' ' +
    cx({
      [classes.drawerPaperMini]: miniActive && miniActive
    });
  const sidebarWrapper =
    classes.sidebarWrapper +
    ' ' +
    cx({
      [classes.drawerPaperMini]: miniActive && miniActive,
      [classes.sidebarWrapperWithPerfectScrollbar]:
        navigator.platform.indexOf('Win') > -1
    });

  return (
    <div ref={mainPanel}>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={'right'}
          open={props.open}
          classes={{
            paper: drawerPaper + ' ' + classes[bgColor + 'Background']
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {/* {brand} */}
          <SidebarWrapper
            className={sidebarWrapper}
            user={user}
            headerLinks={
              props.isSuperAdmin ? (
                <SuperAdminNavbarLinks />
              ) : props.isAdmin ? (
                <AdminNavbarLinks />
              ) : (
                <ClientNavbarLinks />
              )
            }
            links={links}
          />
          {image && (
            <div
              className={classes.background}
              style={{ backgroundImage: 'url(' + image + ')' }}
            />
          )}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          onMouseOver={() => setMiniActive(false)}
          onMouseOut={() => setMiniActive(true)}
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
          {image && (
            <div
              className={classes.background}
              style={{ backgroundImage: 'url(' + image + ')' }}
            />
          )}
        </Drawer>
      </Hidden>
    </div>
  );
};

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

export default withStyles(sidebarStyle)(Sidebar);
