import { useQuery } from 'react-query';
import firebase from 'firebase/app';
import { Coverage } from '@/lib/types';

export const useCoverages = () => {
  const getCoverages = async () => {
    const result = await firebase
      .firestore()
      .collection('coverages')
      .orderBy('clientId', 'asc')
      .get();

    const coverages = result.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    })) as Coverage[];

    return coverages;
  };

  return useQuery('coverages', getCoverages);
};
