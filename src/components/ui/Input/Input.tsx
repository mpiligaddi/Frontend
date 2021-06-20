import React from 'react';
import classNames from 'classnames';
import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MaterialInput, {
  InputProps as MaterialInputProps
} from '@material-ui/core/Input';
import { DeepMap, FieldError } from 'react-hook-form';

import { useStyles } from './styles';

type InputProps = MaterialInputProps & {
  labelText?: React.ReactNode;
  labelProps?: object;
  name: string;
  inputRootCustomClasses?: string;
  error?: boolean;
  formControlProps?: FormControlProps;
  success?: boolean;
  white?: boolean;
  helperText?: React.ReactNode;
  errors?: DeepMap<any, FieldError>;
  placeholder?: string;
  fullWidth?: boolean;
};

const Input = React.forwardRef<any, InputProps>((props, ref) => {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    name,
    labelProps,
    inputProps,
    error,
    white,
    inputRootCustomClasses,
    success,
    helperText,
    placeholder,
    errors,
    fullWidth,
    className,
    ...rest
  } = props;

  const checkError = (): boolean => {
    if (error) {
      return error;
    }

    if (errors && errors[name]) {
      return true;
    }

    return false;
  };

  const labelClasses = classNames({
    [' ' + classes.labelRootError]: checkError(),
    [' ' + classes.labelRootSuccess]: success && !checkError()
  });

  const underlineClasses = classNames({
    [classes.underlineError]: checkError(),
    [classes.underlineSuccess]: success && !checkError(),
    [classes.underline]: true,
    [classes.whiteUnderline]: white
  });
  const marginTop = classNames({
    [inputRootCustomClasses!]: inputRootCustomClasses !== undefined
  });
  const inputClasses = classNames({
    [classes.input]: true,
    [classes.whiteInput]: white
  });
  let formControlClasses;
  if (className) {
    formControlClasses = classNames(className, classes.formControl);
  } else {
    formControlClasses = classes.formControl;
  }
  var helpTextClasses = classNames({
    [classes.labelRootError]: checkError(),
    [classes.labelRootSuccess]: success && !checkError()
  });

  const newInputProps = {
    maxLength:
      inputProps && inputProps.maxLength ? inputProps.maxLength : undefined,
    minLength:
      inputProps && inputProps.minLength ? inputProps.minLength : undefined
  };

  return (
    <FormControl fullWidth={fullWidth} className={formControlClasses}>
      {labelText && (
        <InputLabel
          className={classes.labelRoot + ' ' + labelClasses}
          htmlFor={name}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      )}
      <MaterialInput
        {...rest}
        classes={{
          input: inputClasses,
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses
        }}
        inputRef={ref}
        id={name}
        name={name}
        inputProps={{
          inputRef: ref,
          name: name,
          placeholder,
          ...newInputProps,
          ...inputProps
        }}
      />
      {(helperText || (errors && errors[name])) && (
        <FormHelperText id={name + '-text'} className={helpTextClasses}>
          {helperText || (errors && errors[name]?.message)}
        </FormHelperText>
      )}
    </FormControl>
  );
});

export default Input;
