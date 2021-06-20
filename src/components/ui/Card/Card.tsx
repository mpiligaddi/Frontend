import React, { FC } from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useStyles } from './styles';

type CardProps = {
  className?: string;
  plain?: boolean;
  profile?: boolean;
  blog?: boolean;
  raised?: boolean;
  background?: boolean;
  pricing?: boolean;
  testimonial?: boolean;
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'rose';
  product?: boolean;
  chart?: boolean;
  login?: boolean;
};

const Card: FC<CardProps> = props => {
  const classes = useStyles();

  const {
    className,
    children,
    plain,
    profile,
    blog,
    raised,
    background,
    pricing,
    color = 'primary',
    product,
    testimonial,
    chart,
    login,
    ...rest
  } = props;

  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile || testimonial,
    [classes.cardBlog]: blog,
    [classes.cardRaised]: raised,
    [classes.cardBackground]: background,
    [classes.cardPricingColor]:
      (pricing && color !== undefined) || (pricing && background !== undefined),
    [classes[color]]: color,
    [classes.cardPricing]: pricing,
    [classes.cardProduct]: product,
    [classes.cardChart]: chart,
    [classes.cardLogin]: login,
    [typeof className === 'string' ? className : '']: className
  });

  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  blog: PropTypes.bool,
  raised: PropTypes.bool,
  background: PropTypes.bool,
  pricing: PropTypes.bool,
  testimonial: PropTypes.bool,
  color: PropTypes.oneOf([
    'primary',
    'info',
    'success',
    'warning',
    'danger',
    'rose'
  ]),
  product: PropTypes.bool,
  chart: PropTypes.bool,
  login: PropTypes.bool
};

export default Card;
