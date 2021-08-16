import { FC } from 'react';
import {
  useClients,
  useAdmins,
  useComercials,
  useDeleteClient,
  useUpdateClient
} from '@/hooks/api';
import { TableCrud } from '@/components/ui';

const ClientsTable: FC = () => {
  const clients = useClients();
  const admins = useAdmins();
  const comercials = useComercials();
  const updateClient = useUpdateClient();
  const deleteClient = useDeleteClient();

  return (
    <div>
      <TableCrud
        title="Clientes"
        data={clients.data || []}
        columns={[
          { title: 'Empresa', field: 'displayName' },
          { title: 'Nombre', field: 'name' },
          { title: 'CUIT', field: 'cuit' },
          { title: 'Direccion', field: 'address' },
          {
            title: 'Back Office',
            field: 'adminId',
            lookup: admins.data?.reduce(
              (admins, admin) => ({
                ...admins,
                [admin.id]: admin.name
              }),
              {}
            )
          },
          {
            title: 'Comercial',
            field: 'comercialId',
            lookup: comercials.data?.reduce(
              (object, comercial) => ({
                ...object,
                [comercial.id]: comercial.name
              }),
              {}
            )
          }
        ]}
        editable={{
          async onRowUpdate(data) {
            await updateClient.mutateAsync({
              id: data.id,
              adminId: data.adminId,
              comercialId: data.comercialId,
              displayName: data.displayName,
              cuit: data.cuit,
              address: data.address,
              name: data.name
            });
          },
          async onRowDelete(data) {
            deleteClient.mutate(data.id);
          }
        }}
        isLoading={
          clients.isLoading || admins.isLoading || comercials.isLoading
        }
      />
    </div>
  );
};

export default ClientsTable;
