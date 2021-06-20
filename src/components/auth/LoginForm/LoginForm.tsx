import React, { useState, FC } from 'react';
import Image from 'next/image';
// import ForgotPassword from './ForgotPassword';
import Contact from '../Contact';

import illustration from '@/assets/img/LANDINGILUSTRACION.png';

// @material-ui/core components
import { Link, Checkbox, TextField, FormControlLabel } from '@material-ui/core';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';

//core components
// import Error from '@/myComponents/ui/Error';
import GridItem from '@/components/ui/Grid/GridItem';
import Button from '@/components/ui/Button';
import GridContainer from '@/components/ui/Grid/GridContainer';

import { useStyles } from './styles';

const LoginForm: FC = () => {
  const classes = useStyles();
  const [error, setError] = useState('');
  const [checked, setChecked] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleClose = () => {
    setForgotOpen(false);
  };

  const handleCloseContact = () => {
    setContactOpen(false);
  };

  const setPersistence = async () => {
    const persistence = rememberMe
      ? firebase.auth.Auth.Persistence.LOCAL
      : firebase.auth.Auth.Persistence.SESSION;

    return firebase.auth().setPersistence(persistence);
  };

  const clearErrors = () => {
    setError('');
  };

  // Submit function (Login user)
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    clearErrors();
    setLoading(true);
    await setPersistence();
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => userCredential.user)
      .then(user => {
        const docRef = firebase.firestore().collection('users').doc(user!.uid);
        return docRef.get();
      })
      .then(doc => {
        if (doc.exists) {
          const { role } = doc.data() as any;
          return role;
        }
      })
      .then(role => {
        router.push(`/${role}`);
      })
      .catch(error => {
        if (error.code == 'auth/invalid-email') {
          setError('Formato de correo electrónico inválido');
        } else if (
          error.code == 'auth/wrong-password' ||
          error.code == 'auth/user-not-found'
        ) {
          setError('Usuario y/o contraseña inválido');
        } else if (error.code == 'auth/too-many-request') {
          setError(
            'Demasiados intentos. Intente más tarde o solicite el restablecimiento de su contraseña.'
          );
        } else if (error) {
          setError(error.message);
        }
      });
    setLoading(false);
  }

  return (
    <div className={classes.paper}>
      <div className={classes.illustration}>
        <Image placeholder="blur" src={illustration} alt="illustration" />
      </div>

      <h3 className={classes.cardTitle}>¡Bienvenido!</h3>
      {error && (
        <GridItem>
          <br />
          {/* <Error msg={error} /> */}
        </GridItem>
      )}
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="email"
          id="email"
          label="Correo electrónico"
          name="email"
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Contraseña"
          type="password"
          id="password"
          onChange={e => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={() => setRememberMe(!rememberMe)}
              value={rememberMe}
              color="primary"
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
