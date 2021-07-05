import { FC } from 'react';
import cn from 'classnames';
import { useStyles } from './styles';

type CardIconProps = {
  className?: string;
  color?:
    | 'warning'
    | 'success'
    | 'danger'
    | 'info'
    | 'primary'
    | 'rose'
    | 'white';
};

const CardIcon: FC<CardIconProps> = ({ color, className, children }) => {
  const classes = useStyles();
  const cardIconClasses = cn({
    [classes.cardIcon]: true,
    [(classes as any)[color + 'CardHeader']]: color,
    [className!]: className !== undefined
  });
  return <div className={cardIconClasses}>{children}</div>;
};

export default CardIcon;
