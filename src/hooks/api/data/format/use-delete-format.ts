import { Format } from '@/lib/types';
import { useMutation, useQueryClient } from 'react-query';

export const useDeleteFormat = () => {
  const queryClient = useQueryClient();

  return useMutation(async (id: string) => id, {
    onSuccess(id) {
      queryClient.setQueryData<Format[]>('formats', data =>
        (data || []).filter(format => format.id !== id)
      );
    }
  });
};
