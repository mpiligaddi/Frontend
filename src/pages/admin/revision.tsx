import { useState } from 'react';
import { AdminLayout } from '@/components/common';
import { Page } from '@/typings/page';
import { SelectClient, FilterBar, Accordion } from '@/components/reports';
import { ReportType } from '@/lib/types';

const Revision: Page = () => {
  const [type, setType] = useState<ReportType>('');
  const [filtersVisible, setFiltersVisible] = useState(false);

  const showFilters = (type: ReportType) => {
    setFiltersVisible(true);
    setType(type);
  };

  return (
    <>
      <SelectClient type={type} showFilters={showFilters} />

      {filtersVisible && (
        <FilterBar
          size={{
            xs: 12,
            sm: 6,
            md: 3
          }}
          reported
        />
      )}

      {filtersVisible && <Accordion type={type} />}
    </>
  );
};

Revision.Layout = AdminLayout;

export default Revision;
