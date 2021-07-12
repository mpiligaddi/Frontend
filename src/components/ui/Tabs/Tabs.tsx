import { FC, useState } from 'react';
import cn from 'classnames';

import { Tab, Tabs as MaterialTabs } from '@material-ui/core';
import { Card, CardBody, CardHeader } from '@/components/ui';
import { useStyles } from './styles';

type TabsProps = {
  value?: number;
  handleChange?(event: React.ChangeEvent<{}>, value: any): void;
  headerColor: 'warning' | 'success' | 'danger' | 'info' | 'primary' | 'rose';
  title?: string;
  tabs: {
    tabName: string;
    tabIcon?: FC;
    tabContent: React.ReactNode;
    onClick?(): void;
  }[];
  plainTabs: boolean;
};

const Tabs: FC<TabsProps> = props => {
  const [value, setValue] = useState(props.value || 0);

  const { headerColor, plainTabs, tabs, title } = props;

  const handleChange = (event: React.ChangeEvent<{}>, value: any) => {
    setValue(value);
  };

  const classes = useStyles();
  const cardTitle = cn({
    [classes.cardTitle]: true
  });

  return (
    <Card plain={plainTabs}>
      <CardHeader color={headerColor} plain={plainTabs}>
        {title && <div className={cardTitle}>{title}</div>}
        <MaterialTabs
          value={value}
          onChange={props.handleChange ? props.handleChange : handleChange}
          classes={{
            root: classes.tabsRoot,
            indicator: classes.displayNone
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab, key) => (
            <Tab
              classes={{
                root: classes.tabRootButton,
                selected: classes.tabSelected,
                wrapper: classes.tabWrapper
              }}
              onClick={tab.onClick}
              key={key}
              label={tab.tabName}
              icon={tab.tabIcon ? <tab.tabIcon /> : <></>}
            />
          ))}
        </MaterialTabs>
      </CardHeader>
      <CardBody>
        {tabs.map(
          (tab, key) =>
            key === value && (
              <div onClick={tab.onClick} key={key}>
                {tab.tabContent}
              </div>
            )
        )}
      </CardBody>
    </Card>
  );
};

export default Tabs;
