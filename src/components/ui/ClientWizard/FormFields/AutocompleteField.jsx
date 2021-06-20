import React, {useState} from "react";
import PropTypes from "prop-types";
import { at } from "lodash";
import { useField } from "formik";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CustomInput from "../../CustomInput/CustomInput.js";
//import { Field } from 'formik';


export default function AutocompleteField(props) {
  const { name, label, options, ...rest } = props;
  const [field, meta, helper] = useField(props);
  const { value } = field;
  const [touched, error] = at(meta, "touched", "error");
  const isError = touched && error && true;
  const { setValue } = helper;


  function _renderHelperText() {
    if (isError) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  return (
    <>
    <FormControl {...rest} error={isError}> 
      <Autocomplete
      {...field} 
      value={value}
        getOptionSelected={(value, option) => {
          value.name === option.name;
          //console.log(option.nombre)
          //console.log(value.nombre)
        }}
        noOptionsText="Sin opciones"
        getOptionLabel={(option) => option.nombre}
        options={options}
        openOnFocus
        onChange={(event, newValue) => {
        setValue(newValue);
      }}
        renderInput={(params) => (
          <TextField {...params} label={label} />
        )}
      />
      {_renderHelperText()}
      {console.log('valor', value)}
    </FormControl> 
    </>
  );
}
