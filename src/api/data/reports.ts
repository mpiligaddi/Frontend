import { useQuery } from 'react-query';
import firebase from 'firebase/app';
import { Report } from '@/lib/types';

export const useReports = (clientId?: number) => {
  const getReports = async () => {
    const result = await firebase
      .firestore()
      .collection('reports')
      .where('clientId', '==', `${clientId}`)
      .orderBy('createdAt', 'asc')
      .get();

    const reports = result.docs.map(report => ({
      ...report.data(),
      id: report.id
    })) as Report[];

    return reports;
  };

  return useQuery(['reports', clientId], getReports, {
    enabled: !!clientId,
    keepPreviousData: true
  });
};
