import { useMutation } from 'react-query';
import { User } from '@/lib/types';
import { useQueryClient } from 'react-query';
import { client } from '@/lib/axios';
import { useRouter } from 'next/router';

type Data = {
  email: string;
  remember: boolean;
  password: string;
};

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

const roleRoute: Record<string, string> = {
  backoffice: 'admin',
  client: 'client'
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(login, {
    async onSuccess(user) {
      if (!user?.role) return;

      if (roleRoute[user.role]) {
        await router.push(`/${roleRoute[user.role]}/dashboard`);
      }

      queryClient.setQueryData('me', user);
    }
  });
};
