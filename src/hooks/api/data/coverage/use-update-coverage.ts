import { useQueryClient, useMutation } from 'react-query';

const updateCoverage = async () => {};

export const useUpdateCoverage = () => {
  const queryClient = useQueryClient();

  return useMutation(updateCoverage, {
    async onSuccess() {
      await queryClient.refetchQueries('coverages');
    }
  });
};
