import { useState, FC } from 'react';
import { GridContainer } from '@/components/ui';
import { GridListTile, IconButton, Icon, GridList } from '@material-ui/core';
import firebase from 'firebase/app';

import dayjs from 'dayjs';
import { Report as IReport, Category } from '@/lib/types';

import { primaryColor } from '@/utils/styles';

import Tile from '../Tile';

import { useStyles } from './styles';

type ReportProps = {
  report: IReport;
  category?: Category;
  disableAction?: boolean;
  revisable?: boolean;
};

const Report: FC<ReportProps> = ({
  report,
  category,
  disableAction,
  revisable = true
}) => {
  const classes = useStyles();
  const [revised, setRevised] = useState(report.revised ?? false);

  const handleRevised = async () => {
    await firebase.firestore().collection('reports').doc(report.id).update({
      revised: !revised
    });

    setRevised(!revised);
  };

  return (
    <div>
      <div>
        <p className={classes.date}>
          {dayjs(report.createdAt.toDate()).format('DD/MM/YYYY')}
        </p>
        {revisable && (
          <span style={{ display: 'flex' }}>
            <IconButton className={classes.iconCheck} onClick={handleRevised}>
              <Icon style={{ color: primaryColor[0] }}>
                {revised ? 'check_circle' : 'check_circle_outlined'}
              </Icon>
            </IconButton>
            <span
              style={{
                color: primaryColor[0],
                fontWeight: 400,
                marginTop: '13px'
              }}
            >
              {' '}
              Marcar todas las fotos de este reporte como revisadas{' '}
            </span>
          </span>
        )}
      </div>
      {report.categories.map((cat, catIndex) => (
        <GridContainer key={cat.id} className={classes.report}>
          {!category && (
            <div className={classes.reportDate}>
              <p>{cat.name}</p>
            </div>
          )}
          <GridList className={classes.gridList2} cols={4}>
            {cat.images.map(tile => (
              <GridListTile key={tile.name}>
                <Tile
                  report={report}
                  disableAction={disableAction}
                  catIndex={catIndex}
                  tile={tile}
                />
              </GridListTile>
            ))}
          </GridList>
        </GridContainer>
      ))}
    </div>
  );
};

export default Report;
