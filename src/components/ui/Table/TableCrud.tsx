import { FC } from 'react';
import MaterialTable from 'material-table';
import { format } from 'date-fns';

type TableCrudProps = {
  data: any;
  columns: any;
  title: string;
  isLoading?: boolean;
  editable?: boolean;
};

const TableCrud: FC<TableCrudProps> = props => {
  const { data, columns, title, editable, isLoading } = props;

  return (
    <div>
      <MaterialTable
        title=""
        data={data}
        columns={columns}
        isLoading={isLoading}
        options={{
          exportButton: true,
          exportFileName: `${title}_${format(new Date(), 'dd-mm-yyyy')}`,
          addRowPosition: 'first',
          exportAllData: true,
          actionsColumnIndex: -1,
          filtering: true,
          loadingType: 'overlay',
          headerStyle: {
            backgroundColor: '#9e9e9e',
            color: '#FFF',
            justifyItems: 'center'
          },
          pageSizeOptions: [10, 30, 50],
          pageSize: 30
        }}
        localization={{
          header: {
            actions: 'Acciones'
          },

          body: {
            emptyDataSourceMessage: 'No hay registros para mostrar',
            deleteTooltip: 'Eliminar',
            editTooltip: 'Editar',
            addTooltip: 'Añadir registro',
            filterRow: {
              filterPlaceHolder: 'Buscar...',
              filterTooltip: 'Filtrar'
            },

            editRow: {
              deleteText: '¿Seguro desea eliminar este registro?',
              cancelTooltip: 'Cancelar',
              saveTooltip: 'Guardar'
            }
          },
          toolbar: {
            searchTooltip: 'Buscador',
            searchPlaceholder: 'Buscar..',
            exportTitle: 'Exportar',
            exportAriaLabel: 'Exportar'
          },
          pagination: {
            labelRowsSelect: 'registros por página',
            labelDisplayedRows: '{count} de {from}-{to}',
            firstTooltip: 'Primera página',
            previousTooltip: 'Página anterior',
            nextTooltip: 'Próxima página',
            lastTooltip: 'Última página'
          }
        }}
      />
    </div>
  );
};

export default TableCrud;
