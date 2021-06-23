import { useState, FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'yup-phone';
import { useContact } from '@/api/auth';

import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { Button, GridContainer, GridItem, Input } from '@/components/ui';

import { useStyles } from './styles';

type FormValues = {
  email: string;
  name: string;
  phone: string;
  message?: string;
};

type ContactProps = {
  close(): void;
  isOpen?: boolean;
};

const Contact: FC<ContactProps> = ({ close, isOpen = false }) => {
  const [disabled, setDisabled] = useState(false);
  const classes = useStyles();
  const contact = useContact();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .email('Formato de correo electrónico inválido')
          .required('Campo obligatorio'),
        name: yup.string().required('Campo obligatorio'),
        phone: yup
          .string()
          .required('Campo obligatorio')
          .phone('Numero invalido.'),
        message: yup.string()
      })
    ),
    mode: 'all'
  });

  const onSubmit: SubmitHandler<FormValues> = async values => {
    setDisabled(true);
    await contact.mutateAsync(values);
    reset();
    setDisabled(false);
  };

  return (
    <Dialog open={isOpen} aria-labelledby="form-dialog-title">
      <div style={{ alignItems: 'row' }}>
        <DialogTitle id="form-dialog-title">Formulario de contacto</DialogTitle>
      </div>
      <DialogContent>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <GridItem xs={12} sm={12} md={10}>
              <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <Input
                  fullWidth
                  className={classes.customFormControlClasses}
                  errors={errors}
                  {...register('name')}
                  placeholder="Nombre"
                />
                <Input
                  fullWidth
                  errors={errors}
                  className={classes.customFormControlClasses}
                  {...register('email')}
                  placeholder="Correo Electronico"
                />
                <Input
                  fullWidth
                  className={classes.customFormControlClasses}
                  errors={errors}
                  {...register('phone')}
                  placeholder="Teléfono"
                />
                <Input
                  labelText="Mensaje (opcional)"
                  errors={errors}
                  fullWidth
                  className={classes.customFormControlClasses}
                  {...register('message')}
                  multiline
                  rows={3}
                />
                <div className={classes.center}>
                  <br />
                  <Button
                    disabled={disabled}
                    onClick={close}
                    color="transparent"
                  >
                    Cerrar
                  </Button>
                  <Button disabled={disabled} type="submit" color="primary">
                    Enviar
                  </Button>
                </div>
              </form>
            </GridItem>
          </GridItem>
        </GridContainer>
      </DialogContent>
    </Dialog>
  );
};

export default Contact;
