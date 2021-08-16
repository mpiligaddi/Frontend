import { useMutation } from 'react-query';

type Data = {
  email: string;
  phone: string;
  name: string;
  message?: string;
};

export const useContact = () => {
  return useMutation(async (data: Data) => {});
};
