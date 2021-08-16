import { Coverage } from '@/lib/types';
import { client } from '@/lib/axios';
import { useQueryClient, useMutation } from 'react-query';

export const useDeleteCoverage = () => {
  const queryClient = useQueryClient();
  const deleteCoverage = async (id: string) => {
    await client.delete(`/api/coverages/${id}`);

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
