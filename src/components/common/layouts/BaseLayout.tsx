import { FC, useEffect, useState } from 'react';
import firebase from 'firebase/app';

const BaseLayout: FC = ({ children }) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(() => {
      setInitialized(true);
      unsubscribe();
    });

    return () => unsubscribe();
  }, []);

  if (!initialized) return <p>Cargando...</p>;

  return <>{children}</>;
};

export default BaseLayout;
