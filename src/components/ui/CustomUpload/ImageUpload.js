import React, { useState, useMemo } from 'react';
// core components
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { dangerColor } from '../../assets/jss/trade-app';
import defaultImage from '../../assets/img/upload.jpg';
import defaultAvatar from '../../assets/img/placeholder.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1)
    }
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

export default function ImageUpload({
  avatar,
  addButtonProps,
  changeButtonProps,
  removeButtonProps,
  onRemove = noop,
  onChange = noop,
  basePreviewUrl,
  baseFile = null,
  name,
  onlyUpload = false
}) {
  const [file, setFile] = useState(baseFile);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    avatar ? defaultAvatar : defaultImage
  );
  let fileInput = React.createRef();
  const classes = useStyles();

  const handleImageChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
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
  // eslint-disable-next-line
  const handleSubmit = e => {
    e.preventDefault();
    // file is the file/image uploaded
    // in this function you can save the image (file) on form submit
    // you have to call it yourself
  };
  const handleClick = () => {
    fileInput.current.click();
  };
  const handleRemove = () => {
    if (onlyUpload) return;
    onRemove({
      file,
      imagePreviewUrl,
      name
    });
    setFile(null);
    setImagePreviewUrl(avatar ? defaultAvatar : defaultImage);
    fileInput.current.value = null;
  };

  return (
    <div className="fileinput text-center">
      <input type="file" onChange={handleImageChange} ref={fileInput} />
      <Button
        style={{ padding: 0 }}
        color="transparent"
        onClick={() => handleClick()}
      >
        <div>
          <Avatar
            variant="square"
            src={basePreviewUrl || imagePreviewUrl}
            className={classes.large}
          />
        </div>
      </Button>
      <div>
        {file && (
          <span>
            <IconButton onClick={() => handleClick()}>
              <EditIcon fontSize="small" />
            </IconButton>
            {avatar && <br />}
            <IconButton {...removeButtonProps} onClick={() => handleRemove()}>
              <DeleteIcon fontSize="small" style={{ color: dangerColor[0] }} />
            </IconButton>
          </span>
        )}
      </div>
    </div>
  );
}
