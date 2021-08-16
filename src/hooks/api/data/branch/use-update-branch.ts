import { useMutation, useQueryClient } from 'react-query';
import { client } from '@/lib/axios';

interface Data {
  zone: string;
  chain: string;
  address: string;
  locality: string;
  id: string;
  name: string;
  displayName: string;
}

const updateBranch = async ({ id, ...data }: Data) => {
  await client.put(`/api/branches/${id}`, {
    ...data,
    displayname: data.displayName
  });
};

export const useUpdateBranch = () => {
  const queryClient = useQueryClient();

  return useMutation(updateBranch, {
    async onSuccess() {
      await queryClient.refetchQueries('branches');
    }
  });
};
