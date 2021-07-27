import firebase from 'firebase';
import { useMutation } from 'react-query';

export const useDeleteCategory = () => {
  const deleteCategory = async (id: string) => {
    await firebase.firestore().collection('categories').doc(id).delete();

    return {
      id
    };
  };

  return useMutation(deleteCategory);
};
