import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';

// material-ui components
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// core components
import Card from '../../components/Card/Card.js';
import CardBody from '../../components/Card/CardBody.js';
import CardHeader from '../../components/Card/CardHeader.js';

import styles from '../../assets/jss/trade-app/components/customTabsStyle.js';

const useStyles = makeStyles(styles);

export default function CustomTabs(props) {
  const [value, setValue] = React.useState(props.value);
  const handleChange = (event, value) => {
    setValue(value);
  };
  const classes = useStyles();
  const { headerColor, plainTabs, tabs, title } = props;
  const cardTitle = classNames({
    [classes.cardTitle]: true
  });
  return (
    <Card plain={plainTabs}>
      <CardHeader color={headerColor} plain={plainTabs}>
        {title !== undefined ? <div className={cardTitle}>{title}</div> : null}
        <Tabs
          value={value}
          onChange={props.changeValue ? props.changeValue : handleChange}
          classes={{
            root: classes.tabsRoot,
            indicator: classes.displayNone
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab, key) => {
            var icon = {};
            if (tab.tabIcon) {
              icon = {
                icon: <tab.tabIcon />
              };
            }
            return (
              <Tab
                classes={{
                  root: classes.tabRootButton,
                  selected: classes.tabSelected,
                  wrapper: classes.tabWrapper
                }}
                onClick={tab.onClick}
                key={key}
                label={tab.tabName}
                {...icon}
              />
            );
          })}
        </Tabs>
      </CardHeader>
      <CardBody>
        {tabs.map((tab, key) => {
          if (key === value) {
            return (
              <div onClick={tab.onClick} key={key}>
                {tab.tabContent}
              </div>
            );
          }
          return null;
        })}
      </CardBody>
    </Card>
  );
}

CustomTabs.defaultProps = {
  value: 0
};

CustomTabs.propTypes = {
  // the default opened tab - index starts at 0
  value: PropTypes.number,
  // function for changing the value
  // note, if you pass this function,
  // the default function that changes the tabs will no longer work,
  // so you need to create the changing functionality as well
  changeValue: PropTypes.func,
  headerColor: PropTypes.oneOf([
    'warning',
    'success',
    'danger',
    'info',
    'primary',
    'rose'
  ]),
  title: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabName: PropTypes.string.isRequired,
      tabIcon: PropTypes.object,
      tabContent: PropTypes.node.isRequired,
      onClick: PropTypes.func
    })
  ),
  plainTabs: PropTypes.bool
};
