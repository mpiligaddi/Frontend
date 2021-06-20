import { useEffect, FC } from 'react';
import Image from 'next/image';
import Carousel from './Carousel';

//assets
import logo from '@/assets/img/chek-blanca.png';
import { useStyles } from './styles';

const AuthLayout: FC = ({ children, ...rest }) => {
  const classes = useStyles();

  useEffect(() => {
    document.body.style.overflow = 'unset';
  });

  return (
    <div className={classes.wrapper}>
      <div className={classes.carousel}>
        <div className={classes.logo}>
          <Image
            src={logo}
            alt="logo"
            className={classes.logo}
            placeholder="blur"
          />
        </div>
        <Carousel />
      </div>
      <div className={classes.login}>{children}</div>
    </div>
  );
};

export default AuthLayout;
