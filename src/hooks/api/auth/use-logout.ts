import { useMutation } from 'react-query';
import { client } from '@/lib/axios';
import { useQueryClient } from 'react-query';

export const useLogout = () => {
  const queryClient = useQueryClient();

  const logout = async () => {
    await client.delete('/auth');
  };

  return useMutation(logout, {
    onSuccess() {
      queryClient.removeQueries('me');
    }
  });
};
