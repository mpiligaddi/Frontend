import * as yup from 'yup';

export const validations = yup.object().shape({
  companyName: yup
    .string()
    .trim()
    .min(5, 'Debe tener al menos 5 caracteres')
    .required('Campo obligatorio'),
  address: yup
    .string()
    .min(5, 'Debe tener al menos 5 caracteres')
    .required('Campo obligatorio'),
  name: yup
    .string()
    .min(3, 'Debe tener al menos 3 caracteres')
    .required('Campo obligatorio'),
  ID: yup
    .string()
    .matches(/^[0-9]*$/, 'Código interno númerico')
    .max(3, 'Revise este campo')
    .required('Campo obligatorio'),
  admin: yup.string().required('Campo obligatorio'),
  comercial: yup.string().required('Campo obligatorio'),
  categories: yup
    .array()
    .of(
      yup.object({
        value: yup
          .string()
          .required('Debe completar la categoría')
          .matches(
            /[abcdefghijklmnopqrstuvwxyz]+/,
            'Sólo puede contener letras'
          )
      })
    )
    .min(1, 'Tenés que cargar al menos una categoría')
});
