import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  gridList2: {
    width: '80%',
    display: 'flex',
    paddingTop: '20px',
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    cursor: 'pointer'
    //justifyContent: 'flex-end',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  },
  date: {
    display: 'flex',
    width: '90%',
    fontSize: 18,
    fontWeight: 400,
    color: 'gray',
    marginTop: '30px'
  },
  iconCheck: {
    display: 'flex',
    width: '5%'
  },
  reportDate: {
    paddingTop: '20px',
    //display: 'flex',
    marginLeft: '15px',
    width: '15%',
    color: 'black',
    //flexDirection: 'row',
    display: 'inline'
  },
  report: {
    flexDirection: 'row',
    width: '100%'
  }
});
