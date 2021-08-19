import { useState, FC } from 'react';
import Image from 'next/image';

import ForgotPassword from '../ForgotPassword';
import Contact from '../Contact';

import illustration from '@/assets/img/LANDINGILUSTRACION.png';

import { Link, Checkbox, TextField, FormControlLabel } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { GridItem, Button, GridContainer } from '@/components/ui';
import { useLogin } from '@/hooks/api';

import { useStyles } from './styles';

type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};

const LoginForm: FC = () => {
  const classes = useStyles();
  const [forgotOpen, setForgotOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { register, handleSubmit, control } = useForm<FormValues>();
  const { mutate, isLoading, error } = useLogin();

  const handleClose = () => {
    setForgotOpen(false);
  };

  const handleCloseContact = () => {
    setContactOpen(false);
  };

  const onSubmit: SubmitHandler<FormValues> = async values => {
    mutate(values);
  };

  return (
    <div className={classes.paper}>
      <div className={classes.illustration}>
        <Image placeholder="blur" src={illustration} alt="illustration" />
      </div>

      <h3 className={classes.cardTitle}>¡Bienvenido!</h3>
      {error && (
        <GridItem>
          <br />
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {(error as any).response.data.message}
          </Alert>
        </GridItem>
      )}
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          {...register('email')}
          fullWidth
          type="email"
          label="Correo electrónico"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          {...register('password')}
          label="Contraseña"
          type="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={
            <Controller
              control={control}
              name="remember"
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  color="primary"
                  onChange={e => onChange(e.target.checked)}
                  checked={value}
                />
              )}
              defaultValue={false}
            />
          }
          label="Recordar usuario"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Iniciar sesión
        </Button>

        <GridContainer justify="center">
          <GridItem>
            <Link
              href="#"
              underline="none"
              variant="body2"
              color="textSecondary"
              align="center"
              onClick={() => setForgotOpen(true)}
            >
              <small>¿Olvidó su contraseña?</small>
            </Link>
          </GridItem>
          <br />
          <GridItem>
            <Link
              href="#"
              underline="none"
              variant="body2"
              color="textSecondary"
              align="center"
              onClick={() => setContactOpen(true)}
            >
              <small>Si aún no tiene cuenta, contáctenos</small>
            </Link>
          </GridItem>
        </GridContainer>
      </form>
      <ForgotPassword isOpen={forgotOpen} close={handleClose} />
      <Contact isOpen={contactOpen} close={handleCloseContact} />
    </div>
  );
};

export default LoginForm;
