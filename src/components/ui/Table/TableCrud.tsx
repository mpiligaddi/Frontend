import MaterialTable, {
  MaterialTableProps,
  Column,
  Components
} from 'material-table';
import dayjs from 'dayjs';

type TableCrudProps<T extends object = any> = {
  data: T[];
  columns: Column<T>[];
  title: string;
  components?: Components;
  isLoading?: boolean;
  editable?: MaterialTableProps<T>['editable'];
};

const TableCrud = <T extends object = any>(props: TableCrudProps<T>) => {
  const { data, columns, title, editable, isLoading, components } = props;

  return (
    <div>
      <MaterialTable
        title=""
        data={data}
        columns={columns}
        isLoading={isLoading}
        editable={editable}
        components={components}
        options={{
          exportButton: {
            csv: true,
            pdf: false
          },
          exportFileName: `${title}_${dayjs().format('DD-MM-YYYY')}`,
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
