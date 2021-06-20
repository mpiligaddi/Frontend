import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress
} from '@material-ui/core';
import { Formik, Form } from 'formik';

import BasicInfoForm from './Forms/BasicInfoForm';
import ProductsForm from './Forms/ProductsForm';
import ReviewInfo from './ReviewInfo';
import CreateClientSuccess from './CreateClientSuccess';

import validationSchema from './FormModel/validationSchema';
import createClientFormModel from './FormModel/createClientFormModel';
import formInitialValues from './FormModel/formInitialValues';

import useStyles from './styles';

const steps = ['Datos del cliente', 'Productos y Categorías', 'Detalle del servicio'];

const { formId, formField } = createClientFormModel;


function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <BasicInfoForm formField={formField} />;
    case 1:
      return <ProductsForm formField={formField} />;
    case 2:
      return <ReviewInfo />;
    default:
      return <div>Not Found</div>;
  }
}

export default function CreateClientPage() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  function _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);

    setActiveStep(activeStep + 1);
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  return (
    <React.Fragment>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        {activeStep === steps.length ? (
          <CreateClientSuccess />
        ) : (
          <Formik
            initialValues={formInitialValues}
            validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form id={formId}>
                {_renderStepContent(activeStep)}

                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={_handleBack} className={classes.button}>
                      Atrás
                    </Button>
                  )}
                  <div className={classes.wrapper}>
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      {isLastStep ? 'Crear cliente' : 'Siguiente'}
                    </Button>
                    {isSubmitting && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </React.Fragment>
    </React.Fragment>
  );
}
