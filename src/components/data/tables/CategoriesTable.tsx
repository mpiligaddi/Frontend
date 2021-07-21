import { FC } from 'react';
import { TableCrud } from '@/components/ui';
import {
  useCategories,
  useUpdateCategory,
  useDeleteCategory
} from '@/api/data';

const CategoryTable: FC = () => {
  const categories = useCategories({ all: true });
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  return (
    <TableCrud
      title="Categories"
      isLoading={categories.isLoading}
      data={categories.data || []}
      columns={[
        {
          field: 'ID',
          title: 'Identificador'
        },
        {
          field: 'name',
          title: 'Nombre'
        }
      ]}
      editable={{
        async onRowUpdate(data) {
          updateCategory.mutate(data);
        },
        async onRowDelete(data) {
          deleteCategory.mutate(data.id);
        }
      }}
    />
  );
};

export default CategoryTable;
