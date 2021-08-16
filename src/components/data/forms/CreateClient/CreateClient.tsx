import { FC, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';
import { validations } from './validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateClient, CreateClientFields } from '@/hooks/api';
import { useAdmins, useComercials } from '@/hooks/api';
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
    register('admin');
    register('comercial');
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
                      {...register('displayname')}
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
                    <Autocomplete
                      //disabled
                      size="small"
                      id="admin"
                      getOptionSelected={(option, value) =>
                        option.name === value.name
                      }
                      getOptionLabel={option => option.name}
                      //defaultValue={admins.filter(adm => adm.ID === adminID)[0]}
                      options={admins!}
                      openOnFocus
                      onChange={(e, value) => setValue('admin', value?.id)}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Back Office"
                          margin="normal"
                          helperText={errors?.admin?.message}
                          error={Boolean(errors?.admin)}
                        />
                      )}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <Autocomplete
                      size="small"
                      id="comercial"
                      options={comercials!}
                      getOptionSelected={(option, value) =>
                        option.name === value.name
                      }
                      getOptionLabel={option => option.name}
                      onChange={(e, value) => setValue('comercial', value?.id)}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Comercial"
                          margin="normal"
                          helperText={errors?.comercial?.message}
                          error={Boolean(errors?.comercial)}
                        />
                      )}
                    />
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
