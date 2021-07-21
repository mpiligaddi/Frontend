import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';

const authRoutes = ['/auth/login', ''];

const AutoRedirect: FC = ({ children }) => {
  const router = useRouter();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        router.push('/auth/login');
      }

      setInitialized(true);
    });

    return unsubscribe();
  }, [router]);

  if (!initialized) return <p>Loading...</p>;

  return <>{children}</>;
};

export default AutoRedirect;
