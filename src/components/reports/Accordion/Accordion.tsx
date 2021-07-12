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
      <Card
        className={cn(classes.card, {
          [classes.cardTop]: top
        })}
      >
        <CardHeader>
          <Typography className={classes.heading1}>
            {filters.chain?.name}
            {filters.branch?.name && ` / ${filters.branch.name}`}
            {filters?.category?.ID
              ? ` / ${filters.category.name}`
              : ' / Todas las categorías'}
          </Typography>
        </CardHeader>
        <CardBody>
          {filters.branch?.name !== '' && (
            <FilterImages
              disableAction={disableAction}
              revisable={revisable}
              type={type}
            />
          )}
        </CardBody>
        <Divider />
        <AccordionActions>
          <Pagination count={1} className={classes.pagination} />
        </AccordionActions>
      </Card>
    </>
  );
};

export default Accordion;
