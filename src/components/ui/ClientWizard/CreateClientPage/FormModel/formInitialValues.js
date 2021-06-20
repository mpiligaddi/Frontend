import createClientFormModel from './createClientFormModel';

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
    description,
    contactName,
    contactPhone,
    isMultibrand,
    brandName,
    brandIdentifier,
    category,
  }
} = createClientFormModel;

export default {
  [companyName.name]: '',
  [comercialName.name]: '',
  [identifier.name]: '',
  [email.name]: '',
  [phone.name]: '',
  [taxIdentifier.name]: '',
  [address.name]: '',
  //[province.name]: {id:'', nombre: ''},
  //[locality.name]: {id:'', nombre: ''},
  [contactName.name]: '',
  [contactPhone.name]: '',
  [isMultibrand.name]: false,
  [description.name]: '',
  //[brands.name]: [],
};
