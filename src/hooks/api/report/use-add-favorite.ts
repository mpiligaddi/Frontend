import { client } from '@/lib/axios';
import { useMutation, useQueryClient } from 'react-query';

type Data = {
  imageId: string;
  favorite: boolean;
};

const addToFavorite = async ({ imageId, favorite }: Data) => {
  await client.patch(
    `/api/images/${imageId}/favorite`,
    {},
    {
      params: {
        favorite
      }
    }
  );
};

export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation(addToFavorite, {
    async onSuccess() {
      await queryClient.refetchQueries('reports');
    }
  });
};
