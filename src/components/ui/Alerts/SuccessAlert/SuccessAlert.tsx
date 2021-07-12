/*eslint-disable*/
import { FC } from 'react';
import cn from 'classnames';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useStyles } from './styles';

type SuccessAlertProps = {
  msg: string;
  onConfirm(): void;
};

const SuccessAlert: FC<SuccessAlertProps> = ({ msg, onConfirm }) => {
  const classes = useStyles();

  return (
    <SweetAlert
      success
      style={{ display: 'block', marginTop: '-100px' }}
      title="¡Buen trabajo!"
      onConfirm={onConfirm}
      confirmBtnCssClass={cn(classes.button, classes.success)}
    >
      {msg}
    </SweetAlert>
  );
};

export default SuccessAlert;
