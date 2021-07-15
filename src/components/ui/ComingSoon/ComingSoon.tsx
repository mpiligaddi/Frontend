import { FC } from 'react';
import { GridItem, GridContainer } from '@/components/ui';
import { grayColor, title } from '@/utils/styles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  contentCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    textAlign: 'center',
    color: grayColor[2],
    padding: '0 15px'
  },
  title: {
    ...title,
    fontSize: '2.7em',
    color: grayColor[2],
    letterSpacing: '14px',
    fontWeight: 700
  },
  subTitle: {
    fontSize: '1.25rem',
    marginTop: '0',
    marginBottom: '8px'
  },
  description: {
    fontSize: '1.125rem',
    marginTop: '0',
    marginBottom: '8px'
  }
});

const ComingSoon: FC<{ message?: string }> = ({ message }) => {
  const classes = useStyles();

  return (
    <div className={classes.contentCenter}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <h1 className={classes.title}>Próximamente</h1>
          <h4 className={classes.subTitle}>{message}</h4>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default ComingSoon;
