import { FC, useEffect } from 'react';
import { ClientsFiltersProvider } from '@/api/reports/filters';

import { ClientNavbar } from '@/components/ui';
import logo from '@/assets/img/CHEK-NEGRO (1).png';
import { useStyles } from './styles';

const ClientLayout: FC = ({ children }) => {
  const classes = useStyles();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  return (
    <ClientsFiltersProvider>
      <div className={classes.wrapper}>
        <div className={classes.mainPanel}>
          <ClientNavbar logo={logo} />
          <div className={classes.content}>
            <div className={classes.container}>{children}</div>
          </div>
        </div>
      </div>
    </ClientsFiltersProvider>
  );
};

export default ClientLayout;
