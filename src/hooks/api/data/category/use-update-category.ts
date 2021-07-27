import { Category } from '@/lib/types';
import firebase from 'firebase';
import { useMutation } from 'react-query';

export const useUpdateCategory = () => {
  const updateCategory = async ({ id, ...data }: Category) => {
    await firebase.firestore().collection('categories').doc(id).update(data);

    return {
      id,
      ...data
    };
  };

  return useMutation(updateCategory);
};
