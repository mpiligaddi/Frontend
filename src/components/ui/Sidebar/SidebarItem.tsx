import React, { FC, useState } from 'react';
import { Route } from './Sidebar';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { primaryColor, hexToRgb, grayColor } from '@/utils/styles';
import Link from 'next/link';
import { useUI } from '@/components/ui';

import {
  ListItem,
  ListItemText,
  Collapse,
  List,
  ListItemIcon
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

type SidebarItemProps = {
  route: Route;
};

const useStyles = makeStyles(theme => ({
  listItem: {
    margin: '10px 0px',
    color: '#FFF',
    borderRadius: 3,
    '&:hover': {
      backgroundColor: 'rgba(' + hexToRgb(grayColor[17]) + ', 0.2)'
    }
  },
  listActive: {
    backgroundColor: primaryColor[0],
    boxShadow:
      '0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(242 105 43 / 40%)',
    '&:hover': {
      backgroundColor: primaryColor[0]
    }
  },
  listItemIcon: {
    color: '#fff',
    minWidth: '35px'
  },
  listItemText: {
    fontSize: '14px',
    fontWeight: 200,
    '& span': {
      fontSize: '14px',
      fontWeight: 200
    }
  },
  nested: {
    paddingLeft: theme.spacing(2)
  }
}));

const SidebarItem: FC<SidebarItemProps> = ({ route }) => {
  const router = useRouter();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { displayMiniSidebar } = useUI();

  const handleClick = () => {
    if (!route.collapse) {
      router.push(route.path!);
      return;
    }

    setOpen(!open);
  };

  return (
    <>
      <ListItem
        onClick={handleClick}
        className={cn(classes.listItem, {
          [classes.listActive]: router.pathname === route.path
        })}
        button
      >
        <ListItemIcon className={classes.listItemIcon}>
          {route.icon}
        </ListItemIcon>

        {!displayMiniSidebar && (
          <ListItemText className={classes.listItemText} primary={route.name} />
        )}
        {!displayMiniSidebar && route.collapse ? (
          open ? (
            <ExpandLess />
          ) : (
            <ExpandMore />
          )
        ) : null}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {route.routes?.map((route, i) => (
            <Link key={route.path! + i} passHref href={route.path!}>
              <ListItem
                button
                className={cn(classes.nested, classes.listItem, {
                  [classes.listActive]: router.pathname === route.path
                })}
              >
                <ListItemIcon className={classes.listItemIcon}>
                  {route.icon}
                </ListItemIcon>
                {!displayMiniSidebar && (
                  <ListItemText
                    className={classes.listItemText}
                    primary={route.name}
                  />
                )}
              </ListItem>
            </Link>
          ))}
        </List>
      </Collapse>
    </>
  );
};

SidebarItem.displayName = 'SidebarItem';

export default SidebarItem;
