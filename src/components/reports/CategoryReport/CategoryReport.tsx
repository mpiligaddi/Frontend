import { useState, useEffect, FC } from 'react';
import { GridItem, Button } from '@/components/ui';
import ImageUpload, {
  ImageUploadEvent,
  Image
} from '@/components/ui/Upload/ImageUpload';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '@/lib/types';

type CategoryReportProps = {
  category: Category;
  setCategories: any;
};

const CategoryReport: FC<CategoryReportProps> = ({
  category,
  setCategories
}) => {
  const [images, setImages] = useState<(Image & { type: string })[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setCategories((categories: any) =>
      categories.map((cat: any) =>
        cat.id === category.id ? { ...cat, images } : cat
      )
    );
  }, [images, category, setCategories]);

  const onRemove: ImageUploadEvent = ({ name }) => {
    setImages(images.filter(image => image.name !== name));

    //   setCategories((categories: any) =>
    //   categories.map((cat: any) =>
    //     cat.id === category.id ? { ...cat, images } : cat
    //   )
    // );
  };

  const onChange = (image: Image, type: string) => {
    const updatedImages = images.map(i =>
      i.name === image.name ? { ...image, type } : i
    );
    setImages(updatedImages);
  };

  const addImage = (image: Image, type: string) => {
    setImages([
      ...images,
      {
        ...image,
        type,
        name: `${uuidv4()}-${type}`
      }
    ]);
  };

  return (
    <>
      <GridItem xs={12} sm={12} md={12}>
        <Button
          variant="outlined"
          color="primary"
          style={{ width: '100%' }}
          onClick={() => setOpen(!open)}
        >
          {category.name}
        </Button>
      </GridItem>
      {open && (
        <div style={{ paddingTop: 10, paddingBottom: 10 }}>
          <GridItem xs={12} sm={12} md={12}>
            <p style={{ fontWeight: 400 }}>
              Exhibición primaria (máx. 5 fotos)
            </p>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <div style={{ justifyContent: 'space-between', display: 'flex' }}>
              {images
                .filter(image => image.type === 'primary')
                .map(image => (
                  <ImageUpload
                    name={image.name}
                    key={image.name}
                    baseFile={image.file}
                    basePreviewUrl={image.imagePreviewUrl}
                    onChange={image => onChange(image, 'primary')}
                    onRemove={onRemove}
                  />
                ))}
              {images.filter(image => image.type === 'primary').length < 5 && (
                <ImageUpload
                  onlyUpload
                  onChange={image => addImage(image, 'primary')}
                />
              )}
            </div>
          </GridItem>
          <div style={{ paddingTop: 10, paddingBottom: 10 }}>
            <GridItem xs={12} sm={12} md={12}>
              <p style={{ fontWeight: 400 }}>
                Exhibición secundaria (máx. 10 fotos)
              </p>
              {images
                .filter(image => image.type === 'secondary')
                .map(image => (
                  <ImageUpload
                    name={image.name}
                    key={image.name}
                    baseFile={image.file}
                    basePreviewUrl={image.imagePreviewUrl}
                    onChange={image => onChange(image, 'secondary')}
                    onRemove={onRemove}
                  />
                ))}
              {images.filter(image => image.type === 'secondary').length <
                10 && (
                <ImageUpload
                  onlyUpload
                  onChange={image => addImage(image, 'secondary')}
                />
              )}
            </GridItem>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryReport;
