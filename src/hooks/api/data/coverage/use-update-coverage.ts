import { Coverage } from '@/lib/types';
import firebase from 'firebase';
import { useQueryClient, useMutation } from 'react-query';

export const useUpdateCoverage = () => {
  const queryClient = useQueryClient();

  const createCoverage = async ({ id, ...data }: Coverage) => {
    await firebase.firestore().collection('coverages').doc(id).update(data);

    return {
      id,
      ...data
    };
  };

  return useMutation(createCoverage, {
    onSuccess(coverage) {
      queryClient.setQueryData<Coverage[]>('coverages', data =>
        (data || []).map(c =>
          c.id === coverage.id ? { ...c, ...coverage } : c
        )
      );
    }
  });
};
