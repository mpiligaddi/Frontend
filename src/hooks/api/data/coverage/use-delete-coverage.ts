import { Coverage } from '@/lib/types';
import firebase from 'firebase';
import { useQueryClient, useMutation } from 'react-query';

export const useDeleteCoverage = () => {
  const queryClient = useQueryClient();
  const deleteCoverage = async (id: string) => {
    await firebase.firestore().collection('coverages').doc(id).delete();

    return id;
  };

  return useMutation(deleteCoverage, {
    onSuccess(id) {
      queryClient.setQueryData<Coverage[]>('coverages', data =>
        (data || []).filter(c => c.id !== id)
      );
    }
  });
};
