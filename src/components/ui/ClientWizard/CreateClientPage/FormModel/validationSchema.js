import * as Yup from "yup";
import createClientFormModel from "./createClientFormModel";

const {
  formField: {
    companyName,
    comercialName,
    identifier,
    email,
    phone,
    taxIdentifier,
    address,
    province,
    locality,
    contactName,
    contactPhone,
    description,
    isMultibrand,
    brandName,
    brandIdentifier,
    category,
  },
} = createClientFormModel;


export default [
  Yup.object().shape({
    [companyName.name]: Yup.string()
      .min(5, "Debe tener al menos 5 caracteres")
      .required("Campo obligatorio"),
    [comercialName.name]: Yup.string()
      .min(3, "Debe tener al menos 3 caracteres")
      .required("Campo obligatorio"),
    [identifier.name]: Yup.string()
      .min(3, "Debe tener al menos 3 caracteres")
      .required("Campo obligatorio"),
    [email.name]: Yup.string()
      .email("Formato de email inválido")
      .required("Campo obligatorio"),
    [phone.name]: Yup.string().required("Campo obligatorio"),
    [address.name]: Yup.string().min(10, "Debe tener al menos 10 caracteres"),
    [province.name]: Yup.object().nullable(),
    [locality.name]: Yup.object().nullable(),
    [taxIdentifier.name]: Yup.string()
      .min(10, "Debe tener al menos 10 caracteres")
      .required("Campo obligatorio"),
    [contactName.name]: Yup.string()
      .min(3, "Debe tener al menos 3 caracteres")
      .required("Campo obligatorio"),
    [contactPhone.name]: Yup.string().min(
      8,
      "Debe tener al menos 8 caracteres"
    ),

    [description.name]: Yup.string().min(
      10,
      "La descripción debe ser más larga"
    ),
  }),
  Yup.object().shape({
  }),
];
