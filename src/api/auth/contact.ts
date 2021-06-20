import { useMutation } from 'react-query';
import firebase from 'firebase/app';

type Data = {
  email: string;
  phone: string;
  name: string;
  message?: string;
};

export const useContact = () => {
  return useMutation((data: Data) =>
    firebase.firestore().collection('contact').add(data)
  );
};
