import { Image, Report } from '@/lib/types';
import firebase from 'firebase/app';
import { useMutation, useQueryClient } from 'react-query';
import { useFilters } from '@/context/filters';

type Data = {
  report: Report;
  tile: Image;
  reason: string;
};

export const useDeleteTile = () => {
  const queryClient = useQueryClient();
  const { filters } = useFilters();

  const deleteTile = async ({ report, tile, reason }: Data) => {
    await firebase
      .storage()
      .refFromURL(tile.uri)
      .delete()
      .catch(() => console.log('La imagen no existe'));

    const categories = report.realCategories!.map(category => {
      if (!category.images) return category;
      const images = category.images.map(image =>
        image.name === tile.name ? { ...image, isDeleted: true, reason } : image
      );

      return {
        ...category,
        images
      };
    }, []);

    await firebase.firestore().collection('reports').doc(report.id).update({
      categories
    });

    return { report, categories };
  };

  return useMutation(deleteTile, {
    onSuccess({ report, categories }) {
      queryClient.setQueryData<Report[]>(
        ['reports', +filters?.client?.ID!],
        data =>
          (data || []).map(r => (r.id === report.id ? { ...r, categories } : r))
      );
    }
  });
};
