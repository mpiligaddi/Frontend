import { FC } from 'react';
import { useFilters } from '@/context/filters';
import { useFilteredData } from '@/hooks/api';
import { GridContainer, GridItem, TableOFC } from '@/components/ui';
import { primaryBackgroundText, primaryColor } from '@/utils/styles';
import frequency from '@/utils/frequency';

export const PhotosDetail: FC = () => {
  const { filters } = useFilters();
  const { branches, categories } = useFilteredData();

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <br />
          <h3>Objetivo de fotografías contratadas</h3>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <br />
          <div style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <p>
              Período de reporte fotográfico acordado: {'  '}
              <span style={primaryBackgroundText}>
                {frequency[filters?.client?.periodReportId!]}
              </span>
            </p>
          </div>
          <br />

          {filters?.chain ? (
            <>
              <h5 style={{ color: primaryColor[0] }}>
                OFC CADENA SELECCIONADA
              </h5>
              <div
                style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
              >
                <p>
                  Número de tiendas contratadas en la cadena seleccionada:{' '}
                  <span style={primaryBackgroundText}>
                    {branches.data?.length}
                  </span>
                </p>
              </div>
              <div
                style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
              >
                <p>
                  Número de categorías activas en la cadena seleccionada: {'  '}
                  <span style={primaryBackgroundText}>
                    {categories.data?.length}
                  </span>
                </p>
              </div>
            </>
          ) : (
            <>
              <h5 style={{ color: primaryColor[0] }}> OFC TOTAL </h5>

              <div
                style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
              >
                <p>
                  Número de tiendas totales contratadas: {'  '}
                  <span style={primaryBackgroundText}>
                    {branches.data?.length}
                  </span>
                </p>
              </div>
              <div
                style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
              >
                <p>
                  Número de categorías totales del cliente:{'  '}
                  <span style={primaryBackgroundText}>
                    {categories.data?.length}
                  </span>
                </p>
              </div>
            </>
          )}

          <br />
          <p>
            <em>
              * El OFC se calcula en base al PRA (Período de Reporte Acordado) y
              se obtiene del cálculo{' '}
              <span style={{ color: primaryColor[0], fontWeight: 'bold' }}>
                Tiendas Contratadas x Categorías
              </span>
            </em>
          </p>
          <TableOFC />
          <br />
        </GridItem>
      </GridContainer>
    </>
  );
};

export default PhotosDetail;
