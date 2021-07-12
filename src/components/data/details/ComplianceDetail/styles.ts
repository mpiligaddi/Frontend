import { grayColor } from '@/utils/styles';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  stats: {
    color: grayColor[0],
    fontSize: '12px',
    lineHeight: '22px',
    display: 'inline-flex',
    '& svg': {
      position: 'relative',
      top: '4px',
      width: '16px',
      height: '16px',
      marginRight: '3px'
    },
    '& .fab,& .fas,& .far,& .fal,& .material-icons': {
      position: 'relative',
      top: '4px',
      fontSize: '12px',
      marginRight: '2px'
    }
  },
  progress: {
    padding: '2px',
    marginTop: '25px',
    marginLeft: '50%'
  }
}));
