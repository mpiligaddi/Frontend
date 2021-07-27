import { Format } from '@/lib/types';
import { useMutation, useQueryClient } from 'react-query';

export const useCreateFormat = () => {
  const queryClient = useQueryClient();

  return useMutation(async (data: Format) => data, {
    onSuccess(format) {
      queryClient.setQueryData<Format[]>('formats', data => [
        ...(data || []),
        format
      ]);
    }
  });
};
