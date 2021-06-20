import React from 'react';
import { at } from 'lodash';
import { useField } from 'formik';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch
} from '@material-ui/core';

export default function CheckboxField(props) {
  const { label, ...rest } = props;
  const [field, meta, helper] = useField(props);
  const { setValue } = helper;

  function _renderHelperText() {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  function _onChange(e) {
    setValue(e.target.checked);
  }

  return (
    <FormControl {...rest}>
      <FormControlLabel
        value={field.checked}
        checked={field.checked}
        control={<Switch color='primary' {...field} onChange={_onChange} />}
        label={label}
      />
      {_renderHelperText()}
    </FormControl>
  );
}
