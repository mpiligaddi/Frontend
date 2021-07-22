import { Image, Report } from '@/lib/types';
import firebase from 'firebase/app';
import { useMutation, useQueryClient } from 'react-query';
import { useFilters } from './filters';

type Data = {
  report: Report;
  tile: Image;
  favorite: boolean;
};

export const useAddFavorite = () => {
  const queryClient = useQueryClient();
  const { filters } = useFilters();

  const addToFavorite = async ({ report, tile, favorite }: Data) => {
    const categories = report.realCategories!.map(category => {
      if (!category.images) return category;

      const images = category.images.map(image =>
        image.name === tile.name
          ? {
              ...image,
              favorite: !favorite
            }
          : image
      );

      return {
        ...category,
        images
      };
    });

    await firebase.firestore().collection('reports').doc(report.id).update({
      categories
    });

    return { report, categories };
  };

  return useMutation(addToFavorite, {
    onSuccess({ report, categories }) {
      queryClient.setQueryData<Report[]>(
        ['reports', +filters?.client?.ID!],
        data =>
          (data || []).map(r => (r.id === report.id ? { ...r, categories } : r))
      );
    }
  });
};
