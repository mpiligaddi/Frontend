import { Format } from '@/lib/types';
import { useMutation, useQueryClient } from 'react-query';

export const useUpdateFormat = () => {
  const queryClient = useQueryClient();

  return useMutation(async (data: Format) => data, {
    onSuccess(format) {
      queryClient.setQueryData<Format[]>('formats', data =>
        (data || []).map(f => (f.id === format.id ? { ...f, ...format } : f))
      );
    }
  });
};
