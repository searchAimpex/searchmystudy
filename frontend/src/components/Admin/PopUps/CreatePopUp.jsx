import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useCreateMyPopupMutation } from '../../../slices/adminApiSlice';
import { AddPopup } from '../../../slices/popUpSlice';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useDispatch } from 'react-redux';
import { app } from '../../../firebase'; // Adjust the import path accordingly
import { toast } from 'react-toastify';
import { DialogActions } from '@mui/material';

const storage = getStorage(app);

function CreatePopUp({ open, handleClose }) {
  const [formValues, setFormValues] = useState({
    title: '',
    target: '',
    imageURL: '',
  });

  const [errors, setErrors] = useState({
    title: false,
    target: false,
    image: false,
  });

  const [imageValid, setImageValid] = useState(false); // For image validation status
  const [imageErrorMessage, setImageErrorMessage] = useState('');
  const [CreateMyPopup, { isSuccess }] = useCreateMyPopupMutation();
  const dispatch = useDispatch();

  const handleChange = async (event) => {
    const { name, value, type, files } = event.target;

    // Text field and select validation
    if (type === 'text' || name === 'target') {
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
          setImageErrorMessage('Image must be at least 400x600 pixels.');
        }
      }
    }
  };

  const uploadImage = async (file) => {
    const storageRef = ref(storage, `popups/${file.name}`);
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
        resolve(width >= 400 && height >= 600);
      };
    });
  };

  const onSubmit = async () => {
    if (!errors.title && !errors.target && imageValid) {
      const res = await CreateMyPopup(formValues).unwrap();
      dispatch(AddPopup({ ...res }));
      handleClose();
    } else {
      toast.error('Please fix the form errors.');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Popup Added Successfully');
    }
  }, [isSuccess]);

  return (
    <div>
      <Dialog fullWidth="lg" open={open} onClose={handleClose}>
        <DialogTitle>Add PopUp</DialogTitle>
        <DialogContent>
          <DialogContentText>You can add a popup with an image and target.</DialogContentText>
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
              id="target"
              name="target"
              label="Target"
              select
              value={formValues.target}
              onChange={handleChange}
              error={errors.target}
              helperText={errors.target ? 'Target is required' : ''}
              variant="standard"
            >
              <MenuItem value="main">Main</MenuItem>
              <MenuItem value="partner">Partner</MenuItem>
            </TextField>
            <TextField
              id="imageFile"
              name="imageFile"
              type="file"
              label="Popup Image"
              variant="standard"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={!!imageErrorMessage}
              helperText={imageErrorMessage || 'Image must be at least 700x800 pixels'}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            onClick={onSubmit}
            disabled={errors.title || errors.target || !imageValid} // Disable until validation passes
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreatePopUp;
