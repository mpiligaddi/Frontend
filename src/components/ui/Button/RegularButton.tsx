import React, { FC } from 'react';
import classNames from 'classnames';
import Button, { ButtonProps } from '@material-ui/core/Button';

import { useStyles } from './styles';

type RegularButtonProps = Omit<ButtonProps, 'color' | 'size'> & {
  color?:
    | 'primary'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'
    | 'rose'
    | 'white'
    | 'twitter'
    | 'facebook'
    | 'google'
    | 'linkedin'
    | 'pinterest'
    | 'youtube'
    | 'tumblr'
    | 'github'
    | 'behance'
    | 'reddit'
    | 'transparent';
  size?: 'sm' | 'lg';
  simple?: boolean;
  round?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  block?: boolean;
  link?: boolean;
  justIcon?: boolean;
  className?: string;
  muiClasses?: object;
};

const RegularButton: FC<RegularButtonProps> = props => {
  const classes = useStyles();
  const {
    color = 'primary',
    round,
    children,
    fullWidth,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className = '',
    muiClasses,
    ...rest
  } = props;
  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size!]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.fullWidth]: fullWidth,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className]: className
  });
  return (
    <Button {...rest} classes={muiClasses} className={btnClasses}>
      {children}
    </Button>
  );
};

export default RegularButton;
