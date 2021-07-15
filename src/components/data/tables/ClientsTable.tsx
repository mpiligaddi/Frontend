import { useState, useEffect, FC } from 'react';
import { useClients, useAdmins, useComercials } from '@/api/data';
import { LinearProgress, TableCrud } from '@/components/ui';

const columns = [
  { title: 'Identificador', field: 'id' },
  { title: 'Empresa', field: 'companyName' },
  { title: 'Nombre', field: 'name' },
  { title: 'Contacto', field: 'contact' },
  { title: 'Back Office', field: 'admin' },
  { title: 'Comercial', field: 'comercial' }
];

const ClientsTable: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const clients = useClients();
  const admins = useAdmins();
  const comercials = useComercials();
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    if (!clients.data || !admins.data || !comercials.data) return;

    const getClients = async () => {
      setIsLoading(true);
      try {
        const data = clients.data.map(client => ({
          id: client.ID,
          companyName: client.companyName,
          name: client.name,
          contact: client.contactName,
          admin: admins.data.find(adm => adm.ID == client.adminId)?.name,
          comercial: comercials.data.find(com => com.ID == client.comercialId)
            ?.name
        }));
        setData(data);
      } catch (error) {
        console.error(`getClients. Ocurrió el error: ${error}`);
      }
      setIsLoading(false);
    };
    getClients();
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
            columns={columns}
            isLoading={isLoading}
          />
        </div>
      )}
    </>
  );
};

export default ClientsTable;
