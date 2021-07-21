import {
  useMutation,
  useQuery,
  UseQueryOptions,
  useQueryClient
} from 'react-query';
import firebase from 'firebase/app';
import { Coverage } from '@/lib/types';

export const useCoverages = (options?: UseQueryOptions<Coverage[]>) => {
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

  return useQuery('coverages', getCoverages, options);
};

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
