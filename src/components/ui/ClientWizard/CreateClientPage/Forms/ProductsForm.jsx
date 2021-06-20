import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { InputField, AutocompleteField, DatePickerField } from '../../FormFields';
import GridItem from "../../../Grid/GridItem.js";
import GridContainer from "../../../Grid/GridContainer.js";
//https://codesandbox.io/s/optimistic-kare-9wqfq?file=/src/Component.tsx

export default function ProductsForm(props) {
  const { values: formValues } = useFormikContext();
   const {
    formField: { brandName, cardNumber, expiryDate, cvv }
   } = props;

  return (
    <React.Fragment>
    <GridContainer justify="center">
      <GridItem xs={12} sm={12}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={2}>
            <FormLabel className={classes.labelHorizontal}>
            <legend>Marcas y categorías</legend>
            </FormLabel>
          </GridItem>
          <GridItem xs={12} sm={10} md={10}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={5}>
                <InputField
                  name={brandName.name}
                  label={brandName.label}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <InputField
                  name={comercialName.name}
                  label={comercialName.label}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <InputField name={identifier.name} label={identifier.label} />
              </GridItem>
            </GridContainer>
          </GridItem>
          </GridContainer>
          </GridItem>
      </GridContainer>
    </React.Fragment>
  );
};
      // {/* <Grid container spacing={3}>
      //   <Grid item xs={12} md={6}>
      //     <InputField
      //       name={nameOnCard.name}
      //       label={nameOnCard.label}
      //       fullWidth
      //     />
      //   </Grid>
      //   <Grid item xs={12} md={6}>
      //     <InputField
      //       name={cardNumber.name}
      //       label={cardNumber.label}
      //       fullWidth
      //     />
      //   </Grid>
      //   <Grid item xs={12} md={6}>
      //     <DatePickerField
      //       name={expiryDate.name}
      //       label={expiryDate.label}
      //       format="MM/yy"
      //       views={['year', 'month']}
      //       minDate={new Date()}
      //       maxDate={new Date('2050/12/31')}
      //       fullWidth
      //     />
      //   </Grid>
      //   <Grid item xs={12} md={6}>
      //     <InputField name={cvv.name} label={cvv.label} fullWidth />
      //   </Grid>
      // </Grid> */}
