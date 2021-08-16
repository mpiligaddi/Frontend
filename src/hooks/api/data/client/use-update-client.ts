import { client } from '@/lib/axios';
import { useQueryClient, useMutation } from 'react-query';

interface UpdateData {
  id: string;
  adminId: string;
  comercialId: string;
  name: string;
  address: string;
  displayName: string;
  cuit: string;
}

const updateClient = async ({ id, ...data }: UpdateData) => {
  await client.put(`/api/clients/${id}`, {
    cuit: data.cuit,
    name: data.name,
    address: data.address,
    displayname: data.displayName,
    comercial: data.comercialId,
    admin: data.adminId
  });
};

export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation(updateClient, {
    async onSuccess() {
      await queryClient.refetchQueries('clients');
    }
  });
};
