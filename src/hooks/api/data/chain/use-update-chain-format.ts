import { useMutation, useQueryClient } from 'react-query';
import { client } from '@/lib/axios';
import { Chain } from '@/lib/types';

type Data = {
  id: string;
  format: string;
};

const updateChainFormat = async ({ id, format }: Data) => {
  const res = await client.patch<{ chain: Chain }>(`/api/chains/${id}/format`, {
    format
  });

  return res.data.chain;
};

export const useUpdateChainFormat = () => {
  const queryClient = useQueryClient();

  return useMutation(updateChainFormat, {
    onSuccess({ id, formatId }) {
      queryClient.setQueryData<Chain[]>(['chains', { all: true }], data =>
        (data || []).map(chain =>
          chain.id === id ? { ...chain, formatId } : chain
        )
      );
    }
  });
};
