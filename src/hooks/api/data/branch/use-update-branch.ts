import { useMutation } from 'react-query';
import firebase from 'firebase/app';

interface Data {
  id: string;
  chainId: string;
  chainName: string;
  name: string;
  ID: string;
  address: string;
  zoneId: string;
}

export const useUpdateBranch = () => {
  const updateBranch = async ({ id, ...data }: Data) => {
    await firebase.firestore().collection('branches').doc(id).update(data);

    return {
      id,
      ...data
    };
  };

  return useMutation(updateBranch);
};
