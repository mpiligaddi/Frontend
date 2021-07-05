import {
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  grayColor
} from '@/utils/styles';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  cardIcon: {
    '&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader':
      {
        borderRadius: '6px',
        backgroundColor: grayColor[0],
        padding: '5px',
        marginTop: '-10px',
        //marginRight: "5px",
        float: 'left'
      }
  },
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader
});
