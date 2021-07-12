import { useQuery, UseQueryOptions } from 'react-query';
import firebase from 'firebase/app';
import { Category } from '@/lib/types';

export const useCategories = (
  clientId?: number,
  options?: UseQueryOptions<Category[]>
) => {
  const getCategories = async () => {
    const result = await firebase
      .firestore()
      .collection('categories')
      .where('clientId', '==', clientId)
      .get();

    const categories = result.docs.map(c => {
      return { ...c.data(), id: c.id };
    }) as Category[];

    return categories;
  };

  return useQuery(['categories', clientId], getCategories, {
    enabled: !!clientId,
    ...options
  });
};
