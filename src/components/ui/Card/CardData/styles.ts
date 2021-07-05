import {
  successColor,
  tooltip,
  cardTitle,
  grayColor,
  whiteColor,
  dangerColor,
  primaryColor
} from '@/utils/styles';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  tooltip,
  cardTitle: {
    ...cardTitle,
    marginTop: '0px',
    marginBottom: '3px',
    fontSize: 35
  },
  progress: {
    padding: '2px',
    marginTop: '25px',
    marginLeft: '50%'
  },
  titleName: {
    color: primaryColor[0],
    fontWeight: 'bold'
  },
  cardTitleRed: {
    ...cardTitle,
    marginTop: '0px',
    marginBottom: '3px',
    fontSize: 35,
    color: dangerColor[1]
  },
  cardTitlePorc: {
    minHeight: '2px',
    marginTop: '0px',
    marginBottom: '0px',
    //fontWeight: "bold",
    color: 'red'
  },
  cardHeader: {
    paddingRight: '20%',
    paddingLeft: '20%',
    margin: '0',
    marginBottom: '0px'
  },
  cardTitleChart: {
    ...cardTitle,
    marginTop: '0px',
    marginBottom: '3px',
    fontSize: 18,
    justifyContent: 'center'
    //fontWeight: "bold"
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: '10px',
    marginBottom: '0px',
    borderRadius: '20px'
  },
  cardProductTitle: {
    ...cardTitle,
    marginTop: '10px',
    marginBottom: '3px',
    textAlign: 'center'
  },
  cardCategory: {
    color: grayColor[0],
    fontSize: '14px',
    paddingTop: '5px',
    marginBottom: '0',
    marginTop: '5px',
    margin: '0',
    //display: "inline",
    '& svg': {
      fontSize: '10px',
      //display: "inline",
      padding: '1px'
      //position: "relative",
      //top: "4px",
      //marginRight: "3px"
    }
  },
  cardPhotos: {
    color: grayColor[1],
    fontSize: '20px',
    padding: '2px',
    //marginBottom: '0',
    //marginTop: '5px',
    //margin: '0',
    justifyItems: 'center'
    //display: "inline",
  },
  cardCategoryWhite: {
    color: whiteColor,
    fontSize: '14px',
    paddingTop: '10px',
    marginBottom: '0',
    marginTop: '0',
    margin: '0'
  },
  cardProductDesciprion: {
    textAlign: 'center',
    color: grayColor[0]
  },
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
  statsWhite: {
    color: whiteColor,
    fontSize: '12px',
    lineHeight: '22px',
    display: 'inline-flex',
    marginBottom: '0px',
    paddingBottom: '1px',
    marginTop: '-2px',

    '& svg': {
      position: 'relative',
      top: '1px',
      width: '16px',
      height: '16px',
      marginRight: '4px'
    },
    '& .fab,& .fas,& .far,& .fal,& .material-icons': {
      position: 'relative',
      top: '4px',
      fontSize: '12px',
      marginRight: '4px'
    }
  },
  productStats: {
    paddingTop: '7px',
    paddingBottom: '7px',
    margin: '0'
  },
  successText: {
    color: successColor[0]
  },
  upArrowCardCategory: {
    width: 14,
    height: 14
  },
  underChartIcons: {
    width: '17px',
    height: '17px'
  },
  price: {
    color: 'inherit',
    '& h4': {
      marginBottom: '0px',
      marginTop: '0px'
    }
  },
  cardContentLeft: {
    padding: '15px 20px 15px 0px',
    position: 'relative'
  },
  cardContentRight: {
    padding: '15px 20px 15px 0px',
    position: 'relative'
  }
});
