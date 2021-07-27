import { FC, useEffect } from 'react';
import { FiltersProvider } from '@/context/filters';

import { ClientNavbar } from '@/components/ui';
import logo from '@/assets/img/CHEK-NEGRO (1).png';
import { useStyles } from './styles';

type ClientLayoutProps = {
  clean?: boolean;
};

const ClientLayout: FC<ClientLayoutProps> = ({ children, clean = false }) => {
  const classes = useStyles();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  return (
    <FiltersProvider>
      {clean && <>{children}</>}
      <div className={classes.wrapper}>
        <div id="mainpanel" className={classes.mainPanel}>
          <ClientNavbar logo={logo} />
          <div className={classes.content}>
            <div className={classes.container}>{children}</div>
          </div>
        </div>
      </div>
    </FiltersProvider>
  );
};

export default ClientLayout;
