/* eslint-disable react/display-name */
import { useState, useEffect, FC } from 'react';
import firebase from 'firebase/app';
import { TableCrud, SuccessAlert, LinearProgress } from '@/components/ui';
import { useChains, useZones } from '@/api/data';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Branch, Chain, Zone } from '@/lib/types';

const BranchesTable: FC = () => {
  const { data: zones } = useZones();
  const { data: allChains } = useChains({ all: true });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [branches, setBranches] = useState<(Branch & { id: string })[]>([]);
  const [selectedChain, setSelectedChain] = useState<Chain | undefined>();
  const [selectedIdentifier, setSelectedIdentifier] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedZone, setSelectedZone] = useState<Zone | undefined>();
  const [create, setCreate] = useState(false);

  const onConfirm = () => {
    setCreate(false);
    getAllBranches();
  };

  const getAllBranches = async () => {
    const result = await firebase
      .firestore()
      .collection('branches')
      .orderBy('ID', 'asc')
      .get();

    const branches = result.docs.map(br => ({
      ...br.data(),
      id: br.id
    })) as (Branch & { id: string })[];
    setBranches(branches);
  };

  const saveNewBranch = async () => {
    setLoading(true);
    await firebase
      .firestore()
      .collection('branches')
      .add({
        ID: selectedIdentifier,
        name: selectedName,
        chainId: selectedChain?.ID,
        chainName: selectedChain?.name,
        address: selectedAddress,
        zoneId: selectedZone?.ID
      })
      .then(docRef => {
        console.log('Document successfully written!', docRef.id);
        setCreate(true);
        setSelectedIdentifier('');
        setSelectedChain(undefined);
        setSelectedAddress('');
        setSelectedZone(undefined);
      })
      .catch(error => {
        console.error('Error writing document: ', error);
      });
    setLoading(false);
  };

  useEffect(() => {
    getAllBranches();
  }, []);

  return (
    <>
      {create && (
        <SuccessAlert msg="Sucursal creada con éxito" onConfirm={onConfirm} />
      )}
      <>
        {data && (
          <div>
            <TableCrud
              title="Sucursales"
              data={branches}
              columns={[
                {
                  title: 'Identificador',
                  field: 'ID',
                  validate: rowData =>
                    rowData.ID === ''
                      ? { isValid: false, helperText: 'Campo obligatorio' }
                      : true,
                  editComponent: () => (
                    <TextField
                      InputLabelProps={{
                        shrink: true
                      }}
                      id="selectedIdentifier"
                      variant="standard"
                      label="Identificador"
                      value={selectedIdentifier}
                      onChange={e => setSelectedIdentifier(e.target.value)}
                      helperText="ID Cadena + N° Sucursal"
                    />
                  )
                },
                {
                  title: 'Nombre',
                  field: 'name',
                  validate: rowData =>
                    rowData.name === '' || rowData.name?.length > 3
                      ? { isValid: false, helperText: 'Revise este campo' }
                      : true,
                  editComponent: props => (
                    <TextField
                      InputLabelProps={{
                        shrink: true
                      }}
                      id="selectedName"
                      variant="standard"
                      label="Nombre"
                      value={selectedName}
                      onChange={e => setSelectedName(e.target.value)}
                      helperText="Nombre de la sucursal"
                    />
                  )
                },
                {
                  title: 'Cadena',
                  field: 'chainName',
                  validate: rowData =>
                    rowData.chainId === ''
                      ? { isValid: false, helperText: 'Campo obligatorio' }
                      : true,
                  editComponent: props => (
                    <Autocomplete
                      disableClearable
                      id="selectedChain"
                      options={allChains!}
                      value={selectedChain}
                      getOptionLabel={option => option.name}
                      onChange={(_, value) => setSelectedChain(value)}
                      size="small"
                      renderInput={params => (
                        <TextField
                          {...params}
                          InputLabelProps={{
                            shrink: true
                          }}
                          variant="standard"
                          label="Cadena"
                          helperText="Cadena de la sucursal"
                        />
                      )}
                    />
                  ),
                  initialEditValue: (rowData: Chain) => rowData.name
                },
                {
                  title: 'Dirección',
                  field: 'address',
                  editComponent: props => (
                    <TextField
                      InputLabelProps={{
                        shrink: true
                      }}
                      id="selectedAddress"
                      variant="standard"
                      label="Dirección"
                      value={selectedAddress}
                      onChange={e => setSelectedAddress(e.target.value)}
                      helperText="Calle y numeración"
                    />
                  )
                },
                {
                  title: 'Zona',
                  field: 'zoneId',
                  validate: rowData =>
                    rowData.zoneId === ''
                      ? { isValid: false, helperText: 'Campo obligatorio' }
                      : true,
                  render: rowData =>
                    zones!.find(z => z.ID == rowData.zoneId)?.name,
                  editComponent: () => {
                    return (
                      <Autocomplete
                        disableClearable
                        id="selectedZone"
                        options={zones!}
                        value={selectedZone}
                        getOptionLabel={option => option.name}
                        onChange={(_, value) => setSelectedZone(value)}
                        size="small"
                        renderInput={params => (
                          <TextField
                            {...params}
                            InputLabelProps={{
                              shrink: true
                            }}
                            variant="standard"
                            label="Zona"
                            id="zone"
                            helperText="Zona geográfica"
                          />
                        )}
                      />
                    );
                  }
                }
              ]}
              isLoading={loading}
              editable={{
                onRowAdd: async () => saveNewBranch(),
                onRowDelete: oldData =>
                  firebase
                    .firestore()
                    .collection('branches')
                    .doc(`${oldData.id}`)
                    .delete()
                    .then(function () {
                      console.log('Document successfully deleted!');
                      getAllBranches();
                    })
                    .catch(function (error) {
                      console.error('Error removing document: ', error);
                    })
              }}
            />
          </div>
        )}
      </>
    </>
  );
};

export default BranchesTable;
