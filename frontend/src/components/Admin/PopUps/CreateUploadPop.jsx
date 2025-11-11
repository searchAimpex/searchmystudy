import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useCreateMyPopupMutation, useCreateMyUploadMutation } from '../../../slices/adminApiSlice';
import { AddPopup } from '../../../slices/popUpSlice';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useDispatch } from 'react-redux';
import { app } from '../../../firebase'; // Adjust the import path accordingly
import { toast } from 'react-toastify';
import { DialogActions } from '@mui/material';
import { AddUpload } from '../../../slices/uploadSlice';

const storage = getStorage(app);

function CreateUploadPop({ open, handleClose }) {
  const [formValues, setFormValues] = useState({
    title: '',
    target: '',
    imageURL: '', // Accept any file type
    iconURL: '',  // Icon URL validation remains
  });

  const [errors, setErrors] = useState({
    title: false,
    target: false,
    image: false,
    icon: false,  // Error for icon validation
  });

  const [iconValid, setIconValid] = useState(false); // For icon validation status
  const [iconErrorMessage, setIconErrorMessage] = useState(''); // New error message for icon
  const [CreateMyUpload, { isSuccess }] = useCreateMyUploadMutation();
  const dispatch = useDispatch();

  const handleChange = async (event) => {
    const { name, value, type, files } = event.target;

    if (type === 'text' || name === 'target') {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: !value.trim(),
      }));
    }

    if (type === 'file') {
      const file = files[0];
      if (file) {
        if (name === 'iconFile') {
          // Icon dimension validation (30x30)
          const iconValid = await validateImageDimensions(file, 30, 30);
          if (iconValid) {
            const iconURL = await uploadImage(file);
            setFormValues((prevValues) => ({
              ...prevValues,
              iconURL,
            }));
            setIconValid(true);
            setIconErrorMessage('');
          } else {
            setIconValid(false);
            setIconErrorMessage('Icon must be at least 50x50 pixels.');
          }
        } else {
          // Accept any file type for imageURL (No dimension check)
          const fileURL = await uploadImage(file);
          setFormValues((prevValues) => ({
            ...prevValues,
            imageURL: fileURL,
          }));
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

  const validateImageDimensions = (file, minWidth, minHeight) => {
    return new Promise((resolve) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;

      img.onload = () => {
        const { width, height } = img;
        URL.revokeObjectURL(objectUrl);
        resolve(width >= minWidth && height >= minHeight);
      };
    });
  };

  const onSubmit = async () => {
    if (!errors.title && !errors.target && iconValid) {
      const res = await CreateMyUpload(formValues).unwrap();
      dispatch(AddUpload({ ...res }));
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
        <DialogTitle>Add Useful Information File</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can add a Useful information file, icon, and target.
          </DialogContentText>
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
              <MenuItem value="frenchise">Frenchise</MenuItem>
              <MenuItem value="partner">Partner</MenuItem>
            </TextField>
            <TextField
              id="imageFile"
              name="imageFile"
              type="file"
              label="Popup File (Any type)"
              variant="standard"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              helperText="Any file type is accepted."
            />
            <TextField
              id="iconFile"
              name="iconFile"
              type="file"
              label="Popup Icon"
              variant="standard"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={!!iconErrorMessage}
              helperText={iconErrorMessage || 'Icon must be at least 50x50 pixels.'}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            onClick={onSubmit}
            disabled={errors.title || errors.target || !iconValid}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateUploadPop;
