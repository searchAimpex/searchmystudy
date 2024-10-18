import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useCreateBannerMutation, useCreateMyPopupMutation } from '../../../slices/adminApiSlice';
import { AddBanner } from '../../../slices/bannerSlice';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useDispatch } from 'react-redux';
import { app } from '../../../firebase'; // Adjust the import path accordingly
import { toast } from 'react-toastify';
import { DialogActions } from '@mui/material';
import { AddPopup } from '../../../slices/popUpSlice';

const storage = getStorage(app);

function CreatePopUp({ open, handleClose }) {
  const [formValues, setFormValues] = useState({
    title: '',
    details: '',
  });

  const [errors, setErrors] = useState({
    title: false,
    details: false,
   
  });

  const [CreateMyPopup, { isSuccess }] = useCreateMyPopupMutation();
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

    
  };




  const onSubmit = async () => {
    if (!errors.title && !errors.details) {
      const res = await CreateMyPopup(formValues).unwrap();
      dispatch(AddPopup({ ...res }));
      handleClose();
    } else {
      toast.error('Please fix the form errors.');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('PopUp Added Successfully');
    }
  }, [isSuccess]);

  return (
    <div>
      <Dialog fullWidth="lg" open={open} onClose={handleClose}>
        <DialogTitle>Add PopUps</DialogTitle>
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
              id="details"
              name="details"
              label="Details"
              variant="standard"
              value={formValues.details}
              onChange={handleChange}
              error={errors.details}
              helperText={errors.details ? 'Details is required' : ''}
            />
         
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            onClick={onSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreatePopUp;
