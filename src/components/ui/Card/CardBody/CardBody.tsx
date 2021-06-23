import { FC } from 'react';
import cn from 'classnames';
import { useStyles } from './styles';

type CardBodyProps = {
  plain?: boolean;
  color?: boolean;
  signup?: boolean;
  pricing?: boolean;
  profile?: boolean;
  calendar?: boolean;
  background?: boolean;
  className?: string;
  formHorizontal?: boolean;
};

const CardBody: FC<CardBodyProps> = props => {
  const classes = useStyles();
  const {
    plain,
    color,
    signup,
    profile,
    pricing,
    children,
    calendar,
    className,
    background,
    formHorizontal,
    ...rest
  } = props;

  const cardBodyClasses = cn({
    [classes.cardBody]: true,
    [classes.cardSignup]: signup,
    [classes.cardBodyPlain]: plain,
    [classes.cardPricing]: pricing,
    [classes.cardBodyColor]: color,
    [classes.cardBodyProfile]: profile,
    [className!]: className !== undefined,
    [classes.cardBodyCalendar]: calendar,
    [classes.cardBodyBackground]: background,
    [classes.cardBodyFormHorizontal]: formHorizontal
  });
  return (
    <div className={cardBodyClasses} {...rest}>
      {children}
    </div>
  );
};

export default CardBody;
