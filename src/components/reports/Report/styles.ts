import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  gridList2: {
    width: '80%',
    display: 'flex',
    marginBottom: '15px',
    flexWrap: 'nowrap',
    transform: 'translateZ(0)'
    //justifyContent: 'flex-end',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  },
  date: {
    display: 'flex',
    width: '90%',
    fontSize: 22,
    fontWeight: 400,
    color: 'rgba(0, 0, 0, 0.45)',
    marginTop: '30px',
    marginBottom: 15,
    marginLeft: '10px'
  },
  iconCheck: {
    display: 'flex',
    width: '5%'
  },
  reportDate: {
    //display: 'flex',
    fontSize: '18px',
    width: '15%',
    color: 'rgba(0, 0, 0, 0.54)',
    //flexDirection: 'row',
    display: 'inline'
  },
  report: {
    flexDirection: 'column',
    width: '100%',
    marginLeft: '15px',
    marginBottom: 20
  }
});
