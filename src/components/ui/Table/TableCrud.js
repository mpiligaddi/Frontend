/*/////////////////////////////////////////////////////////////////////////////

props: Columns , data , title, isLoading

//embedding components in the file that will use it

Format example: 
columns = [{title: "", field: "", validate: rowData => rowData.field === '' ? { isValid: false, helperText: 'text' } : true, },{.....}, {.....}]

for data:
const [data, setData] = useState([])
const get .. {
  setData(data)
}

<TableCrud data={data} columns={columns} title='some title'/>

/////////////////////////////////////////////////////////////////////////////*/
import MaterialTable from 'material-table';
import _filefy, { CsvBuilder } from 'filefy';
import moment from 'moment';

export default function TableCrud(props) {
  const { data, columns, title, editable, isLoading } = props;

  //Export to cvs wiht columns
  const exportedData = data.map(rowData =>
    columns.map(columnDef => rowData[columnDef.field])
  );
  const exportCsv = function () {
    new CsvBuilder(`${title}.csv`)
      .setColumns(columns.map(columnDef => columnDef.title))
      .setDelimeter(';')
      .addRows(exportedData)
      .exportFile();
  };
  return (
    <div>
      <MaterialTable
        title=""
        data={data}
        columns={columns}
        isLoading={isLoading}
        options={{
          exportButton: true,
          exportFileName: `${title}_${moment().format('DD-MM-YYYY')}`,
          addRowPosition: 'first',
          exportAllData: true,
          actionsColumnIndex: -1,
          filtering: true,
          loadingType: 'overlay',
          headerStyle: {
            backgroundColor: '#9e9e9e',
            color: '#FFF',
            justifyItems: 'center',
          },
          pageSizeOptions: [10, 30, 50],
          pageSize: 30,
          exportCsv
        }}
        editable={editable}
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
            exportAriaLabel: 'Exportar',
            toolbarExportName: 'Exportar en CSV'
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
}
