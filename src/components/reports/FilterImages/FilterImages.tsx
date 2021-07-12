import { useState, useEffect, FC } from 'react';
import { LinearProgress } from '@/components/ui';

import Report from '../Report';
import { useFilters } from '@/api/reports/filters/';
import CarouselProvider from '../Carousel/CarouselProvider';
import { ReportCategory, Report as IReport } from '@/lib/types';

type FilterImagesProps = {
  type: string;
  disableAction?: boolean;
  revisable?: boolean;
};

const FilterImages: FC<FilterImagesProps> = ({
  type,
  disableAction,
  revisable
}) => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<IReport[]>([]);
  const { filteredReports, filters } = useFilters();

  useEffect(() => {
    if (!filteredReports) return;

    setLoading(true);
    const newReports = filteredReports.reduce((reports: IReport[], report) => {
      if (type === 'revised' && !report.revised) return reports;
      if (type === 'pendings' && report.revised) return reports;

      const categories = report.categories.reduce(
        (categories: ReportCategory[], category) => {
          if (!category.images) return categories;

          const baseImages = category.images.filter(image => !image.isDeleted);

          const images = baseImages.filter(image => {
            if (type === 'favorites' && image.favorite) return true;
            else if (type === 'pendings' && !report.revised) return true;
            else if (type === 'revised' && report.revised) return true;
            else if (type === 'all') return true;
            else return false;
          });

          if (images.length === 0) return categories;

          return [
            ...categories,
            {
              ...category,
              images
            }
          ];
        },
        []
      );

      if (categories.length === 0) return reports;

      return [
        ...reports,
        {
          ...report,
          categories,
          realCategories: report.categories
        }
      ];
    }, []);

    setReports(newReports);
    setLoading(false);
  }, [filteredReports, type]);

  if (loading) return <LinearProgress />;

  return (
    <CarouselProvider disableAction={disableAction}>
      {reports.map(report => (
        <Report
          key={report.id}
          report={report}
          category={filters?.category}
          disableAction={disableAction}
          revisable={revisable}
        />
      ))}
    </CarouselProvider>
  );
};

export default FilterImages;
