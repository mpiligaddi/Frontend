import { client } from '@/lib/axios';
import { useMutation, useQueryClient } from 'react-query';

type Data = {
  reportId: string;
  revised: boolean;
};

const reviewReport = async ({ reportId, revised }: Data) => {
  const res = await client.patch(
    `/api/reports/${reportId}/revised`,
    {},
    {
      params: {
        revised
      }
    }
  );

  console.log(res);
};

export const useReviewReport = () => {
  const queryClient = useQueryClient();

  return useMutation(reviewReport, {
    async onSuccess() {
      await queryClient.refetchQueries('reports');
    }
  });
};
