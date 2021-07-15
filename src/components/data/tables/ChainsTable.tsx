import { FC, useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { Column } from 'material-table';
import { TableCrud } from '@/components/ui';

const columns: Column<any>[] = [
  {
    title: 'Identificador',
    field: 'ID',
    validate: rowData =>
      rowData.ID === ''
        ? { isValid: false, helperText: 'Campo obligatorio' }
        : true
  },
  {
    title: 'Nombre',
    field: 'name',
    validate: rowData =>
      rowData.name === ''
        ? { isValid: false, helperText: 'Campo obligatorio' }
        : true
  }
];

const ChainsTable: FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([
    {
      ID: '',
      name: ''
    }
  ]);

  const getChains = async () => {
    try {
      setLoading(true);
      let data = [];
      let result = await firebase
        .firestore()
        .collection('chains')
        .orderBy('name')
        .get();
      data = result.docs.map(aChain => {
        return {
          ...aChain.data(),
          id: aChain.id
        };
      });
      setData(data as any);
    } catch (error) {
      console.error(`getChains. Ocurrió el error: ${error}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    getChains();
  }, []);

  return (
    <div>
      <TableCrud
        title="Cadenas"
        data={data}
        columns={columns}
        isLoading={loading}
        editable={{
          async onRowAdd(data: any) {
            await firebase.firestore().collection('chains').add({
              ID: data.ID,
              name: data.name
            });
            getChains();
          },
          async onRowUpdate(newData: any, oldData: any) {
            firebase
              .firestore()
              .collection('chains')
              .doc(`${oldData.id}`)
              .set({
                ID: newData.ID,
                name: newData.name
              })
              .then(function () {
                console.log('Document successfully written!');
                getChains();
              })
              .catch(function (error) {
                console.error('Error writing document: ', error);
              });
          },

          async onRowDelete(oldData: any) {
            firebase
              .firestore()
              .collection('chains')
              .doc(`${oldData.id}`)
              .delete()
              .then(function () {
                console.log('Document successfully deleted!');
                getChains();
              })
              .catch(function (error) {
                console.error('Error removing document: ', error);
              });
          }
        }}
      />
    </div>
  );
};

export default ChainsTable;
