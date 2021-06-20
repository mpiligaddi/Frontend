import React, { useState, FC } from 'react';
import Image from 'next/image';
// import ForgotPassword from './ForgotPassword';
import Contact from '../Contact';

import illustration from '@/assets/img/LANDINGILUSTRACION.png';

// @material-ui/core components
import { Link, Checkbox, TextField, FormControlLabel } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { Alert, AlertTitle } from '@material-ui/lab';
import GridItem from '@/components/ui/Grid/GridItem';
import Button from '@/components/ui/Button';
import GridContainer from '@/components/ui/Grid/GridContainer';
import { useLogin } from '@/api/auth';

import { useStyles } from './styles';

type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};

const LoginForm: FC = () => {
  const classes = useStyles();
  const [error, setError] = useState('');
  const [forgotOpen, setForgotOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control
  } = useForm<FormValues>();
  const login = useLogin();

  const handleClose = () => {
    setForgotOpen(false);
  };

  const handleCloseContact = () => {
    setContactOpen(false);
  };

  // Submit function (Login user)
  const onSubmit: SubmitHandler<FormValues> = async values => {
    setError('');

    try {
      const role = await login.mutateAsync(values);
      if (!role) return;

      await router.push(`/${role}/dashboard`);
    } catch (err) {
      if (err.code == 'auth/invalid-email') {
        setError('Formato de correo electrónico inválido');
      } else if (
        err.code == 'auth/wrong-password' ||
        err.code == 'auth/user-not-found'
      ) {
        setError('Usuario y/o contraseña inválido');
      } else if (err.code == 'auth/too-many-request') {
        setError(
          'Demasiados intentos. Intente más tarde o solicite el restablecimiento de su contraseña.'
        );
      } else if (err) {
        setError(err.message);
      }
    }
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
            {error}
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
      {/* <ForgotPassword isOpen={forgotOpen} handleClose={handleClose} /> */}
      <Contact isOpen={contactOpen} close={handleCloseContact} />
    </div>
  );
};

export default LoginForm;
