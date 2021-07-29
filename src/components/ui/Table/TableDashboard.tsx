import { FC } from 'react';
import MaterialTable, { Column } from 'material-table';
import dayjs from 'dayjs';

type TableDashboardProps = {
  columns: Column<any>[];
  data: any[];
  title: string;
};

const TableDashboard: FC<TableDashboardProps> = ({ columns, data, title }) => {
  return (
    <div>
      <MaterialTable
        title=""
        data={data}
        columns={columns}
        options={{
          exportButton: true,
          exportFileName: `${title}_${dayjs().format('DD-MM-YYYY')}`,
          exportAllData: true,
          actionsColumnIndex: -1,
          filtering: true,
          headerStyle: {
            backgroundColor: '#9e9e9e',
            color: '#FFF',
            justifyItems: 'center'
          },
          pageSizeOptions: [10, 30, 50],
          pageSize: 10
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
            }
          },
          toolbar: {
            searchTooltip: 'Buscador',
            searchPlaceholder: 'Buscar..',
            exportTitle: 'Exportar',
            exportAriaLabel: 'Exportar',
            exportCSVName: 'Exportar en CSV'
          },
          pagination: {
            labelRowsSelect: 'registros por página',
            labelDisplayedRows: '{from}-{to} de {count}',
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

export default TableDashboard;
