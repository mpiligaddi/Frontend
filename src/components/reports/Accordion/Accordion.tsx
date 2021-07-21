import { FC } from 'react';
import { AccordionActions, Typography, Divider } from '@material-ui/core';
import cn from 'classnames';
import Pagination from '@material-ui/lab/Pagination';
import { Card, CardBody, CardHeader } from '@/components/ui';
import { useFilters } from '@/api/reports/filters';
import FilterImages from '../FilterImages';

import { useStyles } from './styles';
import { ReportType } from '@/lib/types';

type AccordionProps = {
  type: ReportType;
  disableAction?: boolean;
  revisable?: boolean;
  top?: boolean;
};

const Accordion: FC<AccordionProps> = ({
  type,
  revisable,
  disableAction,
  top
}) => {
  const classes = useStyles();
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
