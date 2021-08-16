import { FC } from 'react';
import { Divider } from '@material-ui/core';
import { useFilters } from '@/context/filters';
import FilterImages from '../FilterImages';

import { ReportType } from '@/lib/types';

type AccordionProps = {
  type: ReportType;
  disableAction?: boolean;
  revisable?: boolean;
};

const Accordion: FC<AccordionProps> = ({ type, revisable, disableAction }) => {
  const { filters } = useFilters();

  if (!filters?.chain?.name || !filters?.branch?.name) return null;

  return (
    <>
      {filters.branch?.name !== '' && (
        <FilterImages
          disableAction={disableAction}
          revisable={revisable}
          type={type}
        />
      )}
      <Divider />
    </>
  );
};

export default Accordion;
