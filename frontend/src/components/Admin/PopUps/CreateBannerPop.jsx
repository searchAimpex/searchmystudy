import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useCreateBannerMutation } from '../../../slices/adminApiSlice';
import { AddBanner } from '../../../slices/bannerSlice';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch } from 'react-redux';
import { app } from '../../../firebase'; // Adjust the import path accordingly
import { toast } from 'react-toastify';

const storage = getStorage(app);

function CreateBannerPop({ open, handleClose }) {
  const [formValues, setFormValues] = useState({
    title: '',
    altName: '',
    imageURL: '',
  });
  const [CreateBanner, { isSuccess }] = useCreateBannerMutation();
  const dispatch = useDispatch();

  const handleChange = async (event) => {
    const { name, value, type, files } = event.target;

    if (type === 'file') {
      const file = files[0];
      if (file) {
        const imageURL = await uploadImage(file);
        setFormValues((prevValues) => ({
          ...prevValues,
          imageURL,
        }));
      }
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const uploadImage = async (file) => {
    const storageRef = ref(storage, `banners/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const onSubmit = async () => {
    const res = await CreateBanner(formValues).unwrap();
    console.log("response", res);
    dispatch(AddBanner({ ...res }));
    handleClose(); // Close the dialog after submission
  };
  useEffect(()=>{
    if(isSuccess){
      toast.success('Banner Added Successfully');
    }
  },[isSuccess])

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
            />
            <TextField
              id="altName"
              name="altName"
              label="Alternate Name"
              variant="standard"
              value={formValues.altName}
              onChange={handleChange}
            />
            <TextField
              id="imageURL"
              name="imageFile"
              type="file"
              label="Banner"
              variant="standard"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={onSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateBannerPop;
