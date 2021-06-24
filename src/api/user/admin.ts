import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { Client } from '@/lib/types';

export const useAdmin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [adminID, setAdminID] = useState();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const user = await firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser!.uid)
          .get();

        const { displayName, email } = user.data() as any;
        setName(displayName);
        setEmail(email);

        const admin = await firebase
          .firestore()
          .collection('admins')
          .where('email', '==', `${email}`)
          .get();

        const adminId = admin.docs.map(doc => doc.data())[0].ID;
        setAdminID(adminId);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    name,
    email,
    adminID
  };
};

export const useAdminClients = () => {
  const { adminID } = useAdmin();
  const [clientsData, setClientsData] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const getClients = async () => {
    setLoading(true);
    try {
      const result = await firebase
        .firestore()
        .collection('clients')
        .where('adminId', '==', `${adminID}`)
        .get();
      const data = result.docs.map(client => ({
        ...client.data(),
        id: client.id
      }));
      setClientsData(data as any);
    } catch (error) {
      console.error(`getClients. Ocurrió el error: ${error}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (adminID) getClients();
  }, [adminID]);

  return {
    loading,
    clientsData
  };
};
