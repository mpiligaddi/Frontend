import { useState, useEffect } from 'react';
import firebase from 'firebase/app';

export const useClient = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [client, setClient] = useState();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const user = await firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser!.uid)
          .get();

        if (!user.exists) return;

        const { displayName, email } = user.data() as any;
        setName(displayName);
        setEmail(email);

        const client = await firebase
          .firestore()
          .collection('clients')
          .where('email', '==', `${email}`)
          .get();

        const clientId = client.docs.map(doc => doc.data())[0].ID;
        setClient(clientId);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    name,
    email,
    client
  };
};
