import { useState, useEffect, FC } from 'react';
import {
  useClients,
  useAdmins,
  useComercials,
  useDeleteClient,
  useUpdateClient
} from '@/api/data';
import { LinearProgress, TableCrud } from '@/components/ui';

const ClientsTable: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const clients = useClients();
  const admins = useAdmins();
  const comercials = useComercials();
  const updateClient = useUpdateClient();
  const deleteClient = useDeleteClient();
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    if (!clients.data || !admins.data || !comercials.data) return;

    setIsLoading(true);

    const data = clients.data.map(client => ({
      ID: client.ID,
      id: client.id,
      companyName: client.companyName,
      name: client.name,
      contact: client.contactName,
      admin: admins.data.find(adm => adm.ID == client.adminId)?.ID,
      comercial: comercials.data.find(com => com.ID == client.comercialId)?.ID
    }));

    setData(data);
    setIsLoading(false);
  }, [clients.data, admins.data, comercials.data]);

  if (clients.isLoading || admins.isLoading || comercials.isLoading)
    return <LinearProgress />;

  return (
    <>
      {data && (
        <div>
          <TableCrud
            title="Clientes"
            data={data}
            columns={[
              { title: 'Identificador', field: 'ID', editable: 'never' },
              { title: 'Empresa', field: 'companyName' },
              { title: 'Nombre', field: 'name' },
              { title: 'Contacto', field: 'contact' },
              {
                title: 'Back Office',
                field: 'admin',
                lookup: admins.data?.reduce(
                  (admins, admin) => ({
                    ...admins,
                    [admin.ID]: admin.name
                  }),
                  {}
                )
              },
              {
                title: 'Comercial',
                field: 'comercial',
                lookup: comercials.data?.reduce(
                  (object, comercial) => ({
                    ...object,
                    [comercial.ID]: comercial.name
                  }),
                  {}
                )
              }
            ]}
            editable={{
              async onRowUpdate(data) {
                updateClient.mutate({
                  id: (data as any).id,
                  adminId: data.admin,
                  comercialId: data.comercial,
                  companyName: data.companyName,
                  contactName: data.contact,
                  name: data.name
                });
              },
              async onRowDelete(data: any) {
                deleteClient.mutate(data.id);
              }
            }}
            isLoading={isLoading}
          />
        </div>
      )}
    </>
  );
};

export default ClientsTable;
