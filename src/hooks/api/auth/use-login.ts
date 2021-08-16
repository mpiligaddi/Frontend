import { useMutation } from 'react-query';
import { User } from '@/lib/types';
import { useQueryClient } from 'react-query';
import { client } from '@/lib/axios';

type Data = {
  email: string;
  remember: boolean;
  password: string;
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  const login = async ({
    email,
    remember,
    password
  }: Data): Promise<User | null> => {
    const { data } = await client.post<{ user: User }>(
      '/auth/login',
      {
        email,
        password,
        remember: true
      },
      {
        withCredentials: true
      }
    );

    console.log(data);

    return data.user;
  };

  return useMutation(login, {
    onSuccess(user) {
      queryClient.setQueryData('me', user);
    }
  });
};
