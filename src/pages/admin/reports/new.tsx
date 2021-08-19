import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/common';
import { ensureAuth } from '@/lib/auth';
import { GridContainer, GridItem, Button } from '@/components/ui';
import { CategoryReport } from '@/components/reports';
import { Page } from '@/typings';
import { Image } from '@/components/ui/Upload/ImageUpload';
import { primaryColor } from '@/utils/styles';
import { TextField } from '@material-ui/core';
import { Toaster, toast } from 'react-hot-toast';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useFilteredData, useAddPhotoReport } from '@/hooks/api';
import { useFilters } from '@/context/filters';
import { useRouter } from 'next/router';
import { Category } from '@/lib/types';

function getPosition(options?: PositionOptions): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  );
}

type ReportCategory = Category & {
  images: (Image & { type: string })[];
};

const NewReport: Page = () => {
  const [selectedCategories, setCategories] = useState<ReportCategory[]>([]);
  const { filters, setBranch, setChain, setClient } = useFilters();
  const { clients, chains, branches, categories } = useFilteredData();
  const { mutateAsync } = useAddPhotoReport();
  const router = useRouter();

  useEffect(() => {
    setCategories(
      (categories.data || []).map(cat => ({
        ...cat,
        images: []
      }))
    );
  }, [categories.data]);

  const sendReport = async () => {
    if (!filters?.client) {
      toast.error('Es necesario elegir un cliente');
      return;
    }

    if (!filters?.chain) {
      toast.error('Es necesario elegir una cadena');
      return;
    }

    if (!filters?.branch) {
      toast.error('Es necesario elegir una sucursal');
      return;
    }

    const formData = new FormData();
    const position = await getPosition();

    if (!position) {
      toast.error('Es necesario activar la ubicacion para enviar el reporte');
      return;
    }

    const report = {
      clientId: filters?.client?.id,
      branchId: filters?.branch?.id,
      chainId: filters?.chain?.id,
      type: 'photographic',
      location: {
        latitude: position.coords.longitude,
        longitude: position.coords.longitude
      },
      categories: selectedCategories.map(cat => ({
        withoutStock: false,
        badCategory: false,
        category: cat.id,
        images: cat.images.map(image => ({
          name: image.name,
          type: image.type,
          comment: ''
        }))
      })),
      isComplete: selectedCategories.every(
        cat => Array.isArray(cat.images) && cat.images.length > 0
      ),
      createdAt: Date.now()
    };

    formData.append('report', JSON.stringify(report));

    selectedCategories.forEach(category => {
      category.images.forEach(image => {
        formData.append('image', image.file!, `${image.name}.jpg`);
      });
    });

    try {
      await toast.promise(mutateAsync(formData), {
        success: ({ message }) => message,
        error: err => err.response.data.message,
        loading: 'Subiendo Reporte...'
      });

      router.push('/admin/revision');
    } catch (err) {
      // if (err.response.data) {
      //   toast.error(err.response.data.message);
      // }
      // toast.error('Sucedio un error al enviar el reporte, vuelve a intentar');
    }
  };

  return (
    <GridContainer justify="center" style={{ padding: 10 }}>
      <Toaster position="top-right" />
      <GridItem xs={10} sm={10} md={10}>
        <br />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <h4 style={{ color: primaryColor[0] }}>
              Seleccioná los datos para el reporte:
            </h4>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={4} md={4}>
            <Autocomplete
              id="client"
              options={clients.data || []}
              value={filters?.client || null}
              getOptionLabel={option => option.name}
              onChange={(_, value) => setClient(value!)}
              renderInput={params => (
                <TextField {...params} variant="standard" label="Cliente" />
              )}
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <Autocomplete
              id="chain"
              disabled={!filters?.client}
              options={chains.data || []}
              value={filters?.chain || null}
              getOptionLabel={option => option.name}
              onChange={(_, value) => setChain(value ?? undefined)}
              renderInput={params => (
                <TextField {...params} variant="standard" label="Cadena" />
              )}
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <Autocomplete
              disabled={!filters?.chain}
              id="branch"
              value={filters?.branch || null}
              options={branches.data || []}
              getOptionSelected={(option, value) => option.id === value.id}
              getOptionLabel={option => option.name}
              onChange={(_, value) => setBranch(value ?? undefined)}
              renderInput={params => (
                <TextField {...params} variant="standard" label="Sucursal" />
              )}
            />
          </GridItem>
        </GridContainer>
        {categories.data && categories.data.length > 0 && (
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <br />
              <br />
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <h4 style={{ color: primaryColor[0] }}>
                    Subí fotografías por categorías:
                  </h4>
                </GridItem>
              </GridContainer>
              <br />
              <GridContainer>
                {categories.data?.map(category => (
                  <CategoryReport
                    setCategories={setCategories}
                    category={category}
                    key={category.id}
                  />
                ))}
              </GridContainer>
            </GridItem>
          </GridContainer>
        )}
        <Button onClick={sendReport}>Subir</Button>
      </GridItem>
    </GridContainer>
  );
};

NewReport.Layout = AdminLayout;

export const getServerSideProps = ensureAuth('backoffice');

export default NewReport;
