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
      Array.isArray(category.images)
    );

    const images = cats.reduce((acc: FilteredImage[], cat) => {
      const images = cat.images.reduce((images: FilteredImage[], image) => {
        if (image.isDeleted) return images;

        return [
          ...images,
          {
            id: image.name,
            revised: image.revised ?? false,
            url: image.uri,
            favorite: image.favorite ?? false,
            report,
            isDeleted: image.isDeleted ?? false,
            label: image.comment,
            categoryName: cat.name
          }
        ];
      }, []);

      return [...acc, ...images];
    }, []);
    return [...acc, ...images];
  }, []);

  return images;
};
