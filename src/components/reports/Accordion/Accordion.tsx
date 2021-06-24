import { FC } from 'react';
import { AccordionActions, Typography, Divider } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { Card, CardBody, CardHeader } from '@/components/ui';
import { useClientsFilters } from '@/api/reports/filters';
import FilterImages from '../FilterImages';

import { useStyles } from './styles';

type AccordionProps = {
  type: 'revised' | 'all' | 'pendings' | 'favorites';
};

const Accordion: FC<AccordionProps> = ({ type }) => {
  const classes = useStyles();
  const { chain, branch, category } = useClientsFilters();

  if (!chain.name || !branch.name) return null;

  return (
    <>
      <Card className={classes.card}>
        <CardHeader>
          <Typography className={classes.heading1}>
            {chain.name}
            {branch.name && ` / ${branch.name}`}
            {category.ID ? ` / ${category.name}` : ' / Todas las categorías'}
          </Typography>
        </CardHeader>
        <CardBody>
          {branch.name !== '' && <FilterImages type={type} />}
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
