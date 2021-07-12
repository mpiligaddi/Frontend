import { containerFluid, transition } from '@/utils/styles';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  content: {
    marginTop: '70px',
    padding: '30px 15px'
  },
  container: containerFluid,
  mainPanel: {
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease',
    overflow: 'auto',
    position: 'relative',
    float: 'right',
    ...transition,
    maxHeight: '100%',
    width: '100%',
    overflowScrolling: 'touch'
  }
}));
