import { useQuery } from 'react-query';
import { client } from '@/lib/axios';
import { Format } from '@/lib/types';

const getFormats = async () => {
  const res = await client.get<{ formats: Format[] }>('/api/formats');

  return res.data.formats;
};

export const useFormats = () => {
  return useQuery('formats', getFormats);
};
