import { Report } from '@/lib/types';

export interface FilteredImage {
  id: string;
  revised: boolean;
  url: string;
  favorite: boolean;
  report: Report;
  isDeleted: boolean;
  label: string;
  categoryName: string;
}

export const getImages = (reports: Report[]) => {
  const images = reports.reduce((acc: FilteredImage[], report) => {
    const cats = report.categories.filter(category =>
      Array.isArray(category.photos)
    );

    const images = cats.reduce((acc: FilteredImage[], cat) => {
      const images = cat.photos.reduce((images: FilteredImage[], image) => {
        if (image.delete) return images;

        return [
          ...images,
          {
            id: image.id,
            revised: image.revised ?? false,
            url: image.name,
            favorite: image.favorite ?? false,
            report,
            isDeleted: image.delete ?? false,
            label: image.comment,
            categoryName: cat.category.name
          }
        ];
      }, []);

      return [...acc, ...images];
    }, []);
    return [...acc, ...images];
  }, []);

  return images;
};
