import { useState, FC, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, IconButton } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

import { dangerColor } from '@/utils/styles';
import defaultImage from '@/assets/img/upload.jpg';
import defaultAvatar from '@/assets/img/placeholder.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    marginRight: '10px'
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  small: {
    width: theme.spacing(2),
    height: theme.spacing(2)
  },
  large: {
    width: theme.spacing(18),
    height: theme.spacing(18)
  }
}));

const noop = () => {};

export type Image = {
  name?: string;
  imagePreviewUrl: string | null | ArrayBuffer;
  file: File | null;
};

export type ImageUploadEvent = (image: Image) => void;

type ImageUploadProps = {
  avatar?: string;
  removeButtonProps?: any;
  onRemove?: ImageUploadEvent;
  onChange?: ImageUploadEvent;
  basePreviewUrl?: string | null | ArrayBuffer;
  baseFile?: File | null;
  name?: string;
  onlyUpload?: boolean;
};

const ImageUpload: FC<ImageUploadProps> = ({
  avatar,
  removeButtonProps,
  onRemove = noop,
  onChange = noop,
  basePreviewUrl,
  baseFile = null,
  name,
  onlyUpload = false
}) => {
  const [file, setFile] = useState(baseFile);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<
    string | null | ArrayBuffer
  >(avatar ? defaultAvatar.src : defaultImage.src);
  const fileInput = useRef<HTMLInputElement>(null);
  const classes = useStyles();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    if (!e.target?.files) return;
    const file = e.target.files[0];
    reader.onloadend = () => {
      onChange({
        file,
        imagePreviewUrl: reader.result,
        name
      });

      if (onlyUpload) return;
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInput.current?.click();
  };

  const handleRemove = () => {
    if (onlyUpload) return;
    onRemove({
      file,
      imagePreviewUrl,
      name
    });
    setFile(null);
    setImagePreviewUrl(avatar ? defaultAvatar.src : defaultImage.src);
  };

  return (
    <div className={classes.root}>
      <input
        accept="image/png, image/jpeg"
        type="file"
        hidden
        onChange={handleImageChange}
        ref={fileInput}
      />
      <Button style={{ padding: 0 }} onClick={handleClick}>
        <div>
          <Avatar
            variant="square"
            src={(basePreviewUrl as string) || (imagePreviewUrl as string)}
            className={classes.large}
          />
        </div>
      </Button>
      <div>
        {file && (
          <span className={classes.center}>
            <IconButton onClick={handleClick}>
              <Edit fontSize="small" />
            </IconButton>
            {avatar && <br />}
            <IconButton {...removeButtonProps} onClick={() => handleRemove()}>
              <Delete fontSize="small" style={{ color: dangerColor[0] }} />
            </IconButton>
          </span>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
