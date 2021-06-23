import { FC } from 'react';
import cn from 'classnames';
import { useStyles } from './styles';

type CardHeaderProps = {
  className?: string;
  color?:
    | 'warning'
    | 'success'
    | 'danger'
    | 'info'
    | 'primary'
    | 'rose'
    | 'white';
  plain?: boolean;
  image?: boolean;
  client?: boolean;
  signup?: boolean;
  stats?: boolean;
  icon?: boolean;
  text?: boolean;
};

const CardHeader: FC<CardHeaderProps> = props => {
  const classes = useStyles();
  const {
    className,
    children,
    color,
    plain,
    image,
    client,
    signup,
    stats,
    icon,
    text,
    ...rest
  } = props;
  const cardHeaderClasses = cn({
    [classes.cardHeader]: true,
    [(classes as any)[color! + 'CardHeader']]: color,
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderImage]: image,
    [classes.cardHeaderSignup]: signup,
    [classes.cardHeaderStats]: stats,
    [classes.cardHeaderIcon]: icon,
    [classes.cardHeaderText]: text,
    [className!]: className !== undefined
  });
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
};

export default CardHeader;
