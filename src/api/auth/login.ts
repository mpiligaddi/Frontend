import { useMutation } from 'react-query';
import firebase from 'firebase/app';

type Data = {
  email: string;
  remember: boolean;
  password: string;
};

export const useLogin = () => {
  const login = async ({
    email,
    remember,
    password
  }: Data): Promise<string | null> => {
    const persistence = remember
      ? firebase.auth.Auth.Persistence.LOCAL
      : firebase.auth.Auth.Persistence.SESSION;

    await firebase.auth().setPersistence(persistence);

    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    const userDoc = await firebase
      .firestore()
      .collection('users')
      .doc(user!.uid)
      .get();

    if (!userDoc.exists) return null;
    const userData = userDoc.data() as any;

    return userData.role;
  };

  return useMutation(login);
};
