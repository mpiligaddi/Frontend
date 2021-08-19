import { useMutation, useQueryClient } from 'react-query';
import { client } from '@/lib/axios';

const addReport = async (formData: FormData) => {
  const res = await client.post<{ message: string }>('/api/reports', formData);

  return res.data;
};

export const useAddPhotoReport = () => {
  const queryClient = useQueryClient();

  return useMutation(addReport, {
    async onSuccess() {
      await queryClient.refetchQueries('reports');
    }
  });
};
