import { Format } from '@/lib/types';
import { useMutation, useQueryClient } from 'react-query';
import { client } from '@/lib/axios';

type Data = {
  formatId: string;
  chainId: string;
  oldChain: string;
};

const updateChainOfFormat = async ({ formatId, chainId, oldChain }: Data) => {
  const res = await client.put(`/formats/${formatId}/${oldChain}`, {
    chainId
  });

  console.log(res.data);
};

export const useUpdateFormat = () => {
  return useMutation(updateChainOfFormat);
};
