import { FC } from 'react';
import { ButtonBase, Typography } from '@material-ui/core';
import cn from 'classnames';
import { useStyles } from './styles';
import { ReportType } from '@/lib/types';

const images = [
  {
    url: 'https://firebasestorage.googleapis.com/v0/b/chek-app.appspot.com/o/images%2FSanIgnacio%2FSanIgnacio_2.jpg?alt=media&token=c54de3ef-ad5a-49bb-94e2-eaebb2fe835a',
    title: 'Destacadas',
    width: '25%',
    value: 'favorites'
  },
  {
    url: 'https://firebasestorage.googleapis.com/v0/b/chek-app.appspot.com/o/images%2FSanIgnacio%2FSanIgnacio_4.jpg?alt=media&token=3f8048fd-b8ea-4fe3-9479-148e2564c6f6',
    title: 'Todas',
    width: '25%',
    value: 'all'
  },
  {
    url: 'https://firebasestorage.googleapis.com/v0/b/chek-app.appspot.com/o/images%2FSanIgnacio%2FSanIgnacio_3.jpg?alt=media&token=3a731e23-700a-4688-bddf-f3813cc2ac1d',
    title: 'Pendientes',
    width: '25%',
    value: 'pendings'
  },
  {
    url: 'https://firebasestorage.googleapis.com/v0/b/chek-app.appspot.com/o/images%2FSanIgnacio%2FSanIgnacio_1.jpg?alt=media&token=a4cd8bbb-8964-44e8-b9b8-fffc6a15350b',
    title: 'Revisadas',
    width: '25%',
    value: 'revised'
  }
] as const;

type ReportTypeSelectorProps = {
  type: ReportType;
  showFilters(type: ReportType): void;
};

const ReportTypeSelector: FC<ReportTypeSelectorProps> = ({
  showFilters,
  type
}) => {
  const classes = useStyles();

  return (
    <>
      {images.map(image => (
        <ButtonBase
          //focusRipple
          key={image.title}
          className={cn(classes.image, {
            [classes.buttonSelected]: type === image.value
          })}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: image.width,
            zIndex: (type == image.value && 2) || 1,
            opacity: (type == image.value && '1') || undefined
          }}
          onClick={() => {
            showFilters(image.value);
          }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${image.url})`
            }}
          />
          <span
            className={classes.imageBackdrop}
            style={{
              backgroundColor: type == image.value ? 'inherit' : 'black'
            }}
          />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {image.title}
              <span
                className={cn({
                  [classes.imageMarked]: type == image.value
                })}
              />
            </Typography>
          </span>
        </ButtonBase>
      ))}
    </>
  );
};

export default ReportTypeSelector;
