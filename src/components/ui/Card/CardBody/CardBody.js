import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons

// core components
import styles from '../../assets/jss/trade-app/components/cardBodyStyle.js';

const useStyles = makeStyles(styles);

export default function CardBody(props) {
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

  const cardBodyClasses = classNames({
    [classes.cardBody]: true,
    [classes.cardSignup]: signup,
    [classes.cardBodyPlain]: plain,
    [classes.cardPricing]: pricing,
    [classes.cardBodyColor]: color,
    [classes.cardBodyProfile]: profile,
    [className]: className !== undefined,
    [classes.cardBodyCalendar]: calendar,
    [classes.cardBodyBackground]: background,
    [classes.cardBodyFormHorizontal]: formHorizontal
  });
  return (
    <div className={cardBodyClasses} {...rest}>
      {children}
    </div>
  );
}

CardBody.propTypes = {
  plain: PropTypes.bool,
  color: PropTypes.bool,
  signup: PropTypes.bool,
  pricing: PropTypes.bool,
  profile: PropTypes.bool,
  calendar: PropTypes.bool,
  children: PropTypes.node,
  background: PropTypes.bool,
  className: PropTypes.string,
  formHorizontal: PropTypes.bool
};
