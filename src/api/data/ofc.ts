import { Branch, Category, Report, OFC } from '@/lib/types';
import { useQuery, UseQueryOptions } from 'react-query';

type Data = {
  branches?: Branch[];
  reports?: Report[];
  categories?: Category[];
  options?: UseQueryOptions<OFC[]>;
};

export const useOFC = ({ branches, reports, categories, options }: Data) => {
  const getOFC = () => {
    const ofcs: OFC[] = [];

    branches?.forEach(bxc => {
      const filteredReports = reports?.filter(
        report => report.branchId === bxc.ID
      );

      categories?.forEach(cat => {
        let done = false;
        if (filteredReports) {
          filteredReports.forEach(report => {
            const category = report.categories.find(
              category =>
                category.ID === cat.ID && Array.isArray(category.images)
            );
            if (category) {
              done = true;
            }
          });
        } else done = false;

        ofcs.push({
          categoryId: cat.ID,
          branchId: bxc.ID,
          done
        });
      });
    });

    return ofcs;
  };

  return useQuery(
    ['ofc', branches?.length, reports?.length, categories?.length],
    getOFC,
    {
      keepPreviousData: true,
      ...options
    }
  );
};
