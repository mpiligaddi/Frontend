import { FC } from 'react';
import { TableCrud } from '@/components/ui';
import {
  useCategories,
  useUpdateCategory,
  useDeleteCategory,
  useCreateCategory
} from '@/hooks/api';

const CategoryTable: FC = () => {
  const categories = useCategories({ all: true });
  const updateCategory = useUpdateCategory();
  const createCategory = useCreateCategory();
  const deleteCategory = useDeleteCategory();

  return (
    <TableCrud
      title="Categories"
      isLoading={categories.isLoading}
      data={categories.data || []}
      columns={[
        {
          field: 'name',
          title: 'Nombre'
        }
      ]}
      editable={{
        async onRowAdd(data) {
          await createCategory.mutateAsync(data.name);
        },
        async onRowUpdate(data) {
          await updateCategory.mutateAsync(data);
        },
        async onRowDelete(data) {
          await deleteCategory.mutateAsync(data.id);
        }
      }}
    />
  );
};

export default CategoryTable;
