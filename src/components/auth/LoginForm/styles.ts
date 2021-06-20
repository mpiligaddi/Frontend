import { makeStyles } from '@material-ui/core';
import { hexToRgb, grayColor, blackColor, cardTitle } from '@/utils/styles';

export const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center ',
    padding: '20px, 0'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '5px',
    marginLeft: '15px',
    marginRight: '15px',
    paddingLeft: '50px',
    paddingRight: '50px',
    paddingBottom: '10px',
    position: 'relative'
  },
  submit: {
    margin: theme.spacing(1, 0, 1)
  },
  cardTitle: {
    ...cardTitle,
    textAlign: 'center',
    color: '#F26B3D',
    fontWeight: 500
  },
  center: {
    textAlign: 'center'
  },
  right: {
    textAlign: 'right'
  },
  left: {
    textAlign: 'left'
  },
  inputAdornment: {
    marginRight: '18px',
    position: 'relative'
  },
  inputAdornmentIcon: {
    color: grayColor[6]
  },
  customFormControlClasses: {
    margin: '0 12px'
  },
  checkboxLabelControl: {
    margin: '0'
  },
  checkboxLabel: {
    fontSize: '0.875rem',
    marginLeft: '6px',
    color: 'rgba(' + hexToRgb(blackColor) + ', 0.26)'
  },
  illustration: {
    width: '50%',
    padding: '20px'
  }
}));
