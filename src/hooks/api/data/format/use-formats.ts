import { useQuery } from 'react-query';
import formats from '@/data/formats';
import { Format } from '@/lib/types';

export const useFormats = () => {
  return useQuery('formats', () => formats as Format[]);
};
