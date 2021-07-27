import { useQuery, UseQueryOptions } from 'react-query';
import firebase from 'firebase/app';
import { Report } from '@/lib/types';

export const useReports = (
  clientId?: number,
  options?: UseQueryOptions<Report[]>
) => {
  const getReports = async () => {
    const result = await firebase
      .firestore()
      .collection('reports')
      .where('clientId', '==', `${clientId}`)
      .orderBy('createdAt', 'desc')
      .get();

    const reports = result.docs.map(report => ({
      ...report.data(),
      id: report.id
    })) as Report[];

    return reports;
  };

  return useQuery(['reports', clientId], getReports, {
    enabled: !!clientId,
    keepPreviousData: true,
    ...options
  });
};
