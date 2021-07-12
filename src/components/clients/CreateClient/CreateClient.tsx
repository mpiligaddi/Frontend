import { FC, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';
import { validations } from './validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateClient, CreateClientFields } from '@/api/data';
import { useAdmins, useComercials } from '@/api/data';
import {
  FormLabel,
  FormControlLabel,
  Divider,
  TextField,
  Switch,
  Paper
} from '@material-ui/core';
import {
  GridItem,
  GridContainer,
  Button,
  Input,
  SuccessAlert
} from '@/components/ui';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useFormStyles } from '@/styles/form';

const CreateClient: FC = () => {
  const classes = useFormStyles();
  const router = useRouter();
  const { data: admins } = useAdmins();
  const { mutate, isLoading, isSuccess } = useCreateClient();
  const { data: comercials } = useComercials();

  const {
    watch,
    formState: { errors },
    register,
    setValue,
    handleSubmit,
    control
  } = useForm<CreateClientFields>({
    mode: 'all',
    resolver: yupResolver(validations)
  });
  const { append, fields, remove } = useFieldArray({
    control,
    name: 'categories'
  });

  useEffect(() => {
    register('adminId');
    register('comercialId');
  }, [register]);

  return (
    <form onSubmit={handleSubmit(values => mutate(values))}>
      <Paper elevation={3} style={{ padding: 30 }}>
        {isSuccess && (
          <SuccessAlert
            msg="Cliente creado con éxito"
            onConfirm={() => router.push('/admins/clients')}
          />
        )}
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={2}>
                <FormLabel className={classes.labelHorizontal}>
                  <legend>Información general</legend>
                </FormLabel>
              </GridItem>
              <GridItem xs={12} sm={10} md={10}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <Input
                      labelText="Razón social"
                      required
                      errors={errors}
                      fullWidth
                      {...register('companyName')}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Input
                      labelText="Nombre comercial"
                      required
                      errors={errors}
                      fullWidth
                      {...register('name')}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <Input
                      labelText="Identificador"
                      required
                      {...register('ID')}
                      fullWidth
                      errors={errors}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <Input
                      labelText="Email"
                      errors={errors}
                      fullWidth
                      {...register('email')}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <Input
                      labelText="Teléfono"
                      {...register('phone')}
                      fullWidth
                      errors={errors}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <Input
                      labelText="CUIT"
                      required
                      fullWidth
                      errors={errors}
                      {...register('CUIT')}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <Input
                      labelText="Dirección"
                      fullWidth
                      errors={errors}
                      {...register('address')}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <Input
                      labelText="Nombre de contacto"
                      fullWidth
                      {...register('contactName')}
                      errors={errors}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <Autocomplete
                      //disabled
                      size="small"
                      id="adminId"
                      getOptionSelected={(option, value) =>
                        option.name === value.name
                      }
                      getOptionLabel={option => option.name}
                      //defaultValue={admins.filter(adm => adm.ID === adminID)[0]}
                      options={admins!}
                      openOnFocus
                      onChange={(e, value) => setValue('adminId', value?.ID)}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Back Office"
                          margin="normal"
                          helperText={errors?.adminId?.message}
                          error={Boolean(errors?.adminId)}
                        />
                      )}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <Autocomplete
                      size="small"
                      id="comercialId"
                      options={comercials!}
                      getOptionSelected={(option, value) =>
                        option.name === value.name
                      }
                      getOptionLabel={option => option.name}
                      onChange={(e, value) =>
                        setValue('comercialId', value?.ID)
                      }
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Comercial"
                          margin="normal"
                          helperText={errors?.comercialId?.message}
                          error={Boolean(errors?.comercialId)}
                        />
                      )}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <GridItem xs={12} sm={12} md={12}>
                        <Input
                          labelText="Descripción"
                          required
                          {...register('description')}
                          fullWidth
                          errors={errors}
                          placeholder="Agregue información adicional que considere relevante sobre el cliente (no obligatorio)"
                          multiline
                          rows={3}
                        />
                      </GridItem>
                    </GridItem>
                  </GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <br />
                    <FormControlLabel
                      control={
                        <Controller
                          name="control"
                          render={({ field }) => (
                            <Switch
                              color="primary"
                              {...field}
                              classes={{
                                switchBase: classes.switchBase,
                                checked: classes.switchChecked,
                                thumb: classes.switchIcon,
                                track: classes.switchBar
                              }}
                            />
                          )}
                          control={control}
                          defaultValue={false}
                        />
                      }
                      classes={{
                        label: classes.label
                      }}
                      label="Requiere control de reportes fotográficos"
                    />
                    {watch('control', false) && (
                      <h6>
                        El cliente no podrá ver las fotografías tomadas en los
                        puntos de venta hasta que el analista de cuentas a cargo
                        las apruebe.
                      </h6>
                    )}
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
            <br />
            <Divider light />

            <GridContainer>
              <GridItem xs={12} sm={12} md={2}>
                <FormLabel className={classes.labelHorizontal}>
                  <legend style={{ alignSelf: 'flex-start' }}>
                    Categorías de productos{' '}
                  </legend>
                </FormLabel>
              </GridItem>

              <GridItem xs={12} sm={12} md={10}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <GridContainer>
                          {fields.map((field, index) => (
                            <GridItem key={field.id} xs={12} sm={12} md={3}>
                              <Input
                                labelText={`Categoría ${index + 1}`}
                                required
                                fullWidth
                                defaultValue={field.value}
                                helperText={
                                  errors?.categories?.[index]?.value?.message
                                }
                                error={Boolean(errors?.categories?.[index])}
                                {...register(`categories.${index}.value`)}
                              />
                            </GridItem>
                          ))}
                        </GridContainer>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <Button
                          size="sm"
                          round
                          onClick={() => append({ value: '' })}
                        >
                          + Categorías
                        </Button>
                        {fields.length > 1 && (
                          <Button
                            size="sm"
                            round
                            onClick={() => remove(fields.length - 1)}
                          >
                            - Categorías
                          </Button>
                        )}
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <br />
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
            <Button
              disabled={isLoading}
              type="submit"
              color="primary"
              fullWidth
            >
              Crear Cliente
            </Button>
          </GridItem>
        </GridContainer>
      </Paper>
    </form>
  );
};

export default CreateClient;
