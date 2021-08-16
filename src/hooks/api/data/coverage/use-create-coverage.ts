import { Coverage } from '@/lib/types';
import { client } from '@/lib/axios';
import { useQueryClient, useMutation } from 'react-query';

type Data = {
  clientId: string;
  branchId: string;
  intensity: number;
  frequency: number;
};

const createCoverage = async ({
  clientId,
  branchId,
  intensity,
  frequency
}: Data) => {
  await client.post('/api/coverages', {
    client: clientId,
    branch: branchId,
    frecuency: frequency,
    intensity
  });
};

export const useCreateCoverage = () => {
  const queryClient = useQueryClient();

  return useMutation(createCoverage, {
    async onSuccess(coverage) {
      await queryClient.refetchQueries('coverages');
    }
  });
};
