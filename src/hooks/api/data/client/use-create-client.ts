import { client } from '@/lib/axios';
import { useMutation } from 'react-query';

export type CreateClientFields = {
  displayname: string;
  name: string;
  address: string;
  cuit: string;
  admin?: string;
  comercial?: string;
  categories: { value: string }[];
};

const createClient = async ({
  categories,
  ...newClient
}: CreateClientFields) => {
  const res = await client.post('/api/client', {
    ...newClient
  });
};

export const useCreateClient = () => {
  return useMutation(createClient);
};
