import { useMutation, useQuery, UseQueryOptions } from 'react-query';
import firebase from 'firebase/app';
import { Category } from '@/lib/types';

type Config = {
  clientId?: number;
  all?: boolean;
  options?: UseQueryOptions<Category[]>;
};

export const useCategories = ({ clientId, options, all }: Config) => {
  const getCategories = async () => {
    const ref = firebase.firestore().collection('categories');

    if (all) {
      const { docs } = await ref.get();

      return docs.map(doc => ({ ...doc.data(), id: doc.id })) as Category[];
    }

    const result = await ref.where('clientId', '==', clientId).get();

    const categories = result.docs.map(c => {
      return { ...c.data(), id: c.id };
    }) as Category[];

    return categories;
  };

  return useQuery(['categories', { clientId, all }], getCategories, {
    enabled: all || !!clientId,
    ...options
  });
};

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

export const useDeleteCategory = () => {
  const deleteCategory = async (id: string) => {
    await firebase.firestore().collection('categories').doc(id).delete();

    return {
      id
    };
  };

  return useMutation(deleteCategory);
};
