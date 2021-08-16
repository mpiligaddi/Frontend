import { Format } from '@/lib/types';
import { useMutation, useQueryClient } from 'react-query';
import { client } from '@/lib/axios';

type Data = {
  id: string;
  chainId: string;
};

const deleteFormat = async ({ id, chainId }: Data) => {
  const res = await client.delete(`/api/formats/${id}/${chainId}`);

  console.log(res.data);
};

export const useDeleteFormat = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteFormat);
};
