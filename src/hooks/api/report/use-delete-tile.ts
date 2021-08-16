import { client } from '@/lib/axios';
import { useMutation, useQueryClient } from 'react-query';

type Data = {
  imageId: string;
  reason: string;
};

const deleteTile = async ({ imageId, reason }: Data) => {
  await client.patch(`/api/images/${imageId}/delete`, {
    delete: true,
    reason
  });
};

export const useDeleteTile = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteTile, {
    async onSuccess() {
      await queryClient.refetchQueries('reports');
    }
  });
};
