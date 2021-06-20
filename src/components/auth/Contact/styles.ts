import {
  container,
  cardTitle,
  blackColor,
  hexToRgb,
  grayColor
} from '@/utils/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  cardTitle: {
    ...cardTitle,
    textAlign: 'center'
  },
  container: {
    ...container,
    position: 'relative',
    zIndex: 3,
    paddingTop: '0vh'
  },
  cardSignup: {
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(' +
      hexToRgb(blackColor) +
      ', 0.14), 0 6px 30px 5px rgba(' +
      hexToRgb(blackColor) +
      ', 0.12), 0 8px 10px -5px rgba(' +
      hexToRgb(blackColor) +
      ', 0.2)',
    marginBottom: '100px',
    padding: '40px 0px',
    marginTop: '0vh'
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
  form: {
    padding: '0 20px',
    position: 'relative'
  },
  socialTitle: {
    fontSize: '14px'
  },
  inputAdornment: {
    marginRight: '14px',
    position: 'relative'
  },
  inputAdornmentIcon: {
    color: grayColor[6]
  },
  customFormControlClasses: {
    margin: '0 10px'
  },
  checkboxLabelControl: {
    margin: '0'
  },
  checkboxLabel: {
    fontSize: '0.875rem',
    marginLeft: '6px',
    color: 'rgba(' + hexToRgb(blackColor) + ', 0.26)'
  }
});
