import { Report } from '@/lib/types';
import firebase from 'firebase';
import { useQuery } from 'react-query';

export const useReport = (id: string) => {
  const getReport = async () => {
    const result = await firebase
      .firestore()
      .collection('reports')
      .doc(id)
      .get();

    const report = { ...result.data(), id: result.id };

    return report as Report;
  };

  return useQuery(['report', id], getReport, {
    enabled: id !== null,
    keepPreviousData: true
  });
};
