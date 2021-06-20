import React, { useRef, useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";

import {
  InputField,
  SwitchField,
  AutocompleteField,
} from "../../FormFields";
import GridItem from "../../../Grid/GridItem.js";
import GridContainer from "../../../Grid/GridContainer.js";
import ImageUpload from "../../../CustomUpload/ImageUpload.js";
import { FirebaseContext } from "../../../../Firebase";
//import CustomInput from "../../../CustomInput/CustomInput.js";

import styles from "../../../../assets/jss/trade-app/views/regularFormsStyle";
//import provincias from "../../../../../data/provinces/provinces.js"
//import locs from "../../../../data/localities/localities.js";
//import { Field } from "formik";

const useStyles = makeStyles(styles);

export default function BassicInfoForm(props) {
  const classes = useStyles();
  const multiChainsRef = useRef();
  // state para las imagenes
  const [checkedA, setCheckedA] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [urlImage, setUrlImage] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedChains, setSelectedChains] = useState([]);

  // Context con las operaciones de firebase
  const { firebase } = useContext(FirebaseContext);

  const [provinces, setProvinces] = useState([]);
  const [localities, setLocalities] = useState([]);

  const brand = { brandName: "", brandIdentifier: "", categories: [] };
  const brands = [];
  const [brandsCount, setBrandsCount] = useState(0);
  const [brandsCountState, setBrandsCountState] = useState("");
  const [moreCategories, setMoreCategories] = useState(false);

  //API prov
  useEffect(() => {
    fetch(
      "https://apis.datos.gob.ar/georef/api/provincias?orden=nombre&aplanar=true&campos=basico&formato=json"
    )
      .then((response) => response.json())
      .then((provinces) => {
        setProvinces(provinces.provincias);
      });
  }, []);

  useEffect(() => {
    fetch(
      `${"https://apis.datos.gob.ar/georef/api/localidades?aplanar=true&campos=basico&max=5000&exacto=true&formato=json"}`
    )
      .then((response) => response.json())
      .then((localities) => {
        setLocalities(localities.localidades);
      });
  }, []);

  // const getLocalitiesByProvinces = (prov) => {
  //    let locs= []

  //    locs = localities.filter((loc) => {
  //       return loc[prov] == prov;
  //   });

  //   if(locs.length = 0){
  //     return "Seleccione primero una provincia"
  //   }
  // }

  // Todo sobre las imagenes
  const handleUploadStart = () => {
    setProgress(0);
    setUploading(true);
  };
  const handleUploadError = (error) => {
    setUploading(false);
    console.log(error);
  };
  const handleUploadSuccess = async (nombre) => {
    setProgress(100);
    setUploading(false);

    // Almacenar la URL de destino
    const url = await firebase.storage
      .ref("clients")
      .child(nombre)
      .getDownloadURL();

    console.log(url);
    setUrlImage(url);
  };
  const handleProgress = (progress) => {
    setProgress(progress);
    console.log(progress);
  };
  // const handleToggle = () => {
  //   setIsMultibrand(!isMultibrand);
  // };
  const handleMore = () => {
    setMoreCategories(!moreCategories);
    console.log(moreCategories);
  };

  const handleSelect = () => {
    const actualSelected = multiChainsRef.current.getSelectedItems();
    setSelectedChains(actualSelected);
  };

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setBrandsCount(value);
  };

  const analysts = [
    { name: "Daniela", id: parseInt("0001") },
    { name: "Matías", id: parseInt("0002") },
    { name: "Francisco", id: parseInt("0003") },
    { name: "Pedro", id: parseInt("0004") },
  ];

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
    },
  } = props;

  return (
    <React.Fragment>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={2}>
              <FormLabel className={classes.labelHorizontal}>
                <legend>Información general</legend>
              </FormLabel>
            </GridItem>
            <GridItem xs={12} sm={10} md={10}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <InputField
                    name={companyName.name}
                    label={companyName.label}
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

              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <InputField name={email.name} label={email.label} />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <InputField name={phone.name} label={phone.label} />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <InputField
                    name={taxIdentifier.name}
                    label={taxIdentifier.label}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer alignItems="center">
                <GridItem xs={12} sm={12} md={5}>
                  <InputField name={address.name} label={address.label} />
                </GridItem>
            
                <GridItem xs={12} sm={12} md={3} >
                  <AutocompleteField
                    name={province.name}
                    label={province.label}
                    options={provinces}
                    fullWidth
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <AutocompleteField
                    name={locality.name}
                    label={locality.label}
                    options={localities}
                    fullWidth
                  />
                </GridItem>
     
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                  <InputField
                    name={description.name}
                    label={description.label}
                    placeholder="Ingrese información que considere pertinente"
                    mutiline
                    rows="3"
                  />
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <br />
                      <h5>Datos de contacto</h5>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <InputField
                            name={contactName.name}
                            label={contactName.label}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <InputField
                            name={contactPhone.name}
                            label={contactPhone.label}
                          />
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                <br />
                 
                  <GridItem xs={12} sm={12} md={12}>
                  <GridContainer justify="center">
                    <h5>Logo de la compañía</h5>
                    <ImageUpload
                      addButtonProps={{
                        //color: grayColor[4],
                        round: true,
                        size: "sm",
                      }}
                      changeButtonProps={{
                        //color: grayColor[4],
                        round: true,
                        size: "sm",
                      }}
                      removeButtonProps={{
                        color: "danger",
                        round: true,
                        size: "sm",
                      }}
                    />
                         </GridContainer>
                  </GridItem>
             
                </GridItem>
              </GridContainer>
              <h5>Indique si el cliente tiene más de una marca</h5>
              <SwitchField name={isMultibrand.name} label={isMultibrand.label} />
              {/* {isMultibrand.createClientForm &&
              <> <CustomInput
                labelText="Marcas"
                id="brandsCount"
                required
                name="brandsCount"
                helperText={
                  brandsCountState === "error" ? (
                    <span>Verifique este campo</span>
                  ) : (
                    "Cant. de marcas"
                  )
                }
                error={brandsCountState === "error"}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: brandsCount,
                  onChange: event => handleInputChange(event),
                  type: "number",
                }}
              />
              </> */}
            </GridItem>
          </GridContainer>
         
          {/* <FormControlLabel
                  control={
                    <Switch
                    color= 'primary'
                      checked={isMultibrand}
                      onChange={event => setIsMultibrand(event.target.checked)}
                    //value={formik.values.isMultibrand}
                      classes={{
                        switchBase: styles.switchBase,
                        checked: styles.switchChecked,
                        thumb: styles.switchIcon,
                        track: classes.switchBar
                      }}
                    />
                  }
                  classes={{
                    label: classes.label
                  }}
                  label="Es multimarca"
                /> */}

          {/* <CustomInput
                    labelText="Marcas"
                    id="brandsCount"
                    required
                    name="brandsCount"
                    helperText={
                      brandsCountState === "error" ? (
                        <span>Verifique este campo</span>
                      ) : (
                        "Cant. de marcas"
                      )
                    }
                    error={brandsCountState === "error"}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: brandsCount,
                      //onBlur: formik.handleBlur,
                      onChange: event => handleInputChange(event),
                      type: "number",
                    }}
                  />
     */}
        </GridItem>
      </GridContainer>
    </React.Fragment>
  );
}
