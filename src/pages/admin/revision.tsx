import { useState } from 'react';
import { AdminLayout } from '@/components/common';
import { Page } from '@/typings/page';
import { SelectClient, FilterBar, Accordion } from '@/components/reports';
import { ReportType } from '@/lib/types';
import { ensureAuth } from '@/lib/auth';

const Revision: Page = () => {
  const [type, setType] = useState<ReportType>('all');
  const [filtersVisible, setFiltersVisible] = useState(true);

  const showFilters = (type: ReportType) => {
    setFiltersVisible(true);
    setType(type);
  };

  return (
    <>
      <SelectClient type={type} showFilters={showFilters} />

      {filtersVisible && (
        <FilterBar
          exportable
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

export const getServerSideProps = ensureAuth('backoffice');

export default Revision;
