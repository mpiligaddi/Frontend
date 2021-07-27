/* eslint-disable react/display-name */
import { useState, useEffect, FC } from 'react';
import firebase from 'firebase/app';
import { TableCrud, SuccessAlert } from '@/components/ui';
import { useChains, useZones, useUpdateBranch } from '@/hooks/api';
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
  const updateBranch = useUpdateBranch();

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
                      : true
                },
                {
                  title: 'Nombre',
                  field: 'name',
                  validate: rowData =>
                    rowData.name === '' || rowData.name?.length < 3
                      ? { isValid: false, helperText: 'Revise este campo' }
                      : true
                },
                {
                  title: 'Cadena',
                  field: 'chainId',
                  validate: rowData =>
                    rowData.chainId === ''
                      ? { isValid: false, helperText: 'Campo obligatorio' }
                      : true,
                  lookup: allChains?.reduce(
                    (chains, chain) => ({
                      ...chains,
                      [chain.ID]: chain.name
                    }),
                    {}
                  )
                },
                {
                  title: 'Dirección',
                  field: 'address'
                },
                {
                  title: 'Zona',
                  field: 'zoneId',
                  validate: rowData =>
                    rowData.zoneId === ''
                      ? { isValid: false, helperText: 'Campo obligatorio' }
                      : true,
                  lookup: zones?.reduce(
                    (zones, zone) => ({ ...zones, [zone.ID]: zone.name }),
                    {}
                  )
                }
              ]}
              isLoading={loading}
              editable={{
                async onRowUpdate(data) {
                  updateBranch.mutate({
                    id: data.id,
                    ID: data.ID,
                    address: data.address,
                    chainId: data.chainId,
                    chainName: allChains!.find(
                      chain => chain.ID === data.chainId
                    )!.name,
                    name: data.name,
                    zoneId: data.zoneId
                  });
                },
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
