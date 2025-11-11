import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useCreateBannerMutation } from '../../../slices/adminApiSlice';
import { AddBanner } from '../../../slices/bannerSlice';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useDispatch } from 'react-redux';
import { app } from '../../../firebase'; // Adjust the import path accordingly
import { toast } from 'react-toastify';
import { DialogActions } from '@mui/material';

const storage = getStorage(app);

function CreateBannerPop({ open, handleClose }) {
  const [formValues, setFormValues] = useState({
    title: '',
    altName: '',
    imageURL: '',
  });

  const [errors, setErrors] = useState({
    title: false,
    altName: false,
    image: false,
  });

  const [imageValid, setImageValid] = useState(false); // For image validation status
  const [imageErrorMessage, setImageErrorMessage] = useState('');
  const [CreateBanner, { isSuccess }] = useCreateBannerMutation();
  const dispatch = useDispatch();

  const handleChange = async (event) => {
    const { name, value, type, files } = event.target;

    // Text field validation
    if (type === 'text') {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: !value.trim(), // Set error to true if value is empty
      }));
    }

    // File validation (Image)
    if (type === 'file') {
      const file = files[0];
      if (file) {
        // Validate image size
        const imageValid = await validateImageDimensions(file);
        if (imageValid) {
          const imageURL = await uploadImage(file);
          setFormValues((prevValues) => ({
            ...prevValues,
            imageURL,
          }));
          setImageValid(true);
          setImageErrorMessage('');
        } else {
          setImageValid(false);
          setImageErrorMessage('Image must be at least 1520x500 pixels.');
        }
      }
    }
  };

  const uploadImage = async (file) => {
    const storageRef = ref(storage, `banners/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const validateImageDimensions = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;

      img.onload = () => {
        const { width, height } = img;
        URL.revokeObjectURL(objectUrl);
        resolve(width >= 1520 && height >= 500);
      };
    });
  };

  const onSubmit = async () => {
    if (!errors.title && !errors.altName && imageValid) {
      const res = await CreateBanner(formValues).unwrap();
      dispatch(AddBanner({ ...res }));
      handleClose();
    } else {
      toast.error('Please fix the form errors.');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Banner Added Successfully');
    }
  }, [isSuccess]);

  return (
    <div>
      <Dialog fullWidth="lg" open={open} onClose={handleClose}>
        <DialogTitle>Add Banner</DialogTitle>
        <DialogContent>
          <DialogContentText>You can add a banner.</DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
            <TextField
              id="title"
              name="title"
              label="Title"
              variant="standard"
              value={formValues.title}
              onChange={handleChange}
              error={errors.title}
              helperText={errors.title ? 'Title is required' : ''}
            />
            <TextField
              id="altName"
              name="altName"
              label="Alternate Name"
              variant="standard"
              value={formValues.altName}
              onChange={handleChange}
              error={errors.altName}
              helperText={errors.altName ? 'Alternate name is required' : ''}
            />
            <TextField
              id="imageFile"
              name="imageFile"
              type="file"
              label="Banner"
              variant="standard"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={!!imageErrorMessage}
              helperText={imageErrorMessage || 'Image must be at least 1520x500 pixels'}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            onClick={onSubmit}
            disabled={errors.title || errors.altName || !imageValid} // Disable until validation passes
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateBannerPop;
