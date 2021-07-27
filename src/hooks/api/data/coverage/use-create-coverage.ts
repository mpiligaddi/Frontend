import { Coverage } from '@/lib/types';
import firebase from 'firebase';
import { useQueryClient, useMutation } from 'react-query';

type Data = {
  clientId: number;
  branchId: string;
  intensity: number;
  frequency: number;
};

export const useCreateCoverage = () => {
  const queryClient = useQueryClient();

  const createCoverage = async ({
    clientId,
    branchId,
    intensity,
    frequency
  }: Data) => {
    const coverage: Omit<Coverage, 'id'> = {
      clientId,
      branchId,
      intensity,
      frequency
    };

    const ref = await firebase
      .firestore()
      .collection('coverages')
      .add(coverage);

    return {
      ...coverage,
      id: ref.id
    };
  };

  return useMutation(createCoverage, {
    onSuccess(coverage) {
      queryClient.setQueryData<Coverage[]>('coverages', data => [
        ...(data || []),
        coverage
      ]);
    }
  });
};
