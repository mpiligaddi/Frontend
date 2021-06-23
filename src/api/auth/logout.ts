import { useMutation } from 'react-query';
import firebase from 'firebase/app';
import { useQueryClient } from 'react-query';

export const useLogout = () => {
  const queryClient = useQueryClient();

  const logout = async () => {
    await firebase.auth().signOut();
  };

  return useMutation(logout, {
    onSuccess() {
      queryClient.removeQueries('me');
    }
  });
};
