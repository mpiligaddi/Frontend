import { useState, useEffect, FC } from 'react';
import { LinearProgress } from '@/components/ui';

import Report from '../Report';
import { useClientsFilters } from '@/api/reports/filters';
import CarouselProvider from '../Carousel/CarouselProvider';
import { ReportCategory, Report as IReport } from '@/lib/types';

const FilterImages: FC<{ type: string }> = ({ type }) => {
  const [loading, setLoading] = useState(true);
  const [filteredReports, setFilteredReports] = useState<IReport[]>([]);
  const { reports, category } = useClientsFilters();

  useEffect(() => {
    if (!reports) return;

    setLoading(true);
    const newReports = reports.reduce((reports: IReport[], report) => {
      if (!report.revised) return reports;

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

    setFilteredReports(newReports);
    setLoading(false);
  }, [reports, type]);

  if (loading) return <LinearProgress />;

  return (
    <CarouselProvider disableAction>
      {filteredReports.map(report => (
        <Report
          key={report.id}
          report={report}
          category={category}
          disableAction
          revisable={false}
        />
      ))}
    </CarouselProvider>
  );
};

export default FilterImages;
