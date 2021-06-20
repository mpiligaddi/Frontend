import React from 'react';
import { at } from 'lodash';
import { useField } from 'formik';
import CustomInput from "../../CustomInput/CustomInput.js";
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//import customInputStyle from '../../../assets/jss/trade-app/components/customInputStyle'

//const useStyles = makeStyles(customInputStyle);

export default function InputField(props) {
  //const classes = useStyles();
  const { errorText, placeholder, multiline, rows, ...rest } = props;
  const [field, meta] = useField(props);

  function _renderHelperText() {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return error;
    }
  }
  return (
    <CustomInput
            labelText={props.label}
            error={meta.touched && meta.error && true}
            helperText={_renderHelperText()}   
            formControlProps={{
              fullWidth: true,
            }}   
            inputProps={
              {...field}
            }
            {...rest}
          />
  );
}
