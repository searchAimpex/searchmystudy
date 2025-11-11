import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useCreateBannerMutation, useCreateNavMutation, useCreatePromotionalMutation } from '../../../slices/adminApiSlice';
import { AddBanner } from '../../../slices/bannerSlice';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch } from 'react-redux';
import { app } from '../../../firebase'; // Adjust the import path accordingly
import { toast } from 'react-toastify';
import { AddPromotional } from '../../../slices/promotionalSlice';
import { CreateNavs } from '../../../slices/navSlice';

const storage = getStorage(app);

function CreateExtraPop({ open, handleClose }) {
  const [formValues, setFormValues] = useState({
    name: '',
    url: '',
  });
  const [CreateNav, { isSuccess }] = useCreateNavMutation();
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
    const res = await CreateNav(formValues).unwrap();
    console.log("response", res);
    dispatch(CreateNavs({ ...res }));
    handleClose(); // Close the dialog after submission
  };
  useEffect(()=>{
    if(isSuccess){
      toast.success('LINK Added Successfully');
    }
  },[isSuccess])

  return (
    <div>
      <Dialog fullWidth="lg" open={open} onClose={handleClose}>
        <DialogTitle>Add NAV</DialogTitle>
        <DialogContent>
          <DialogContentText>You can add a NAV  LINK.</DialogContentText>
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
              id="name"
              name="name"
              label="Name"
              variant="standard"
              value={formValues.name}
              onChange={handleChange}
            />
            <TextField
              id="url"
              name="url"
              label="LINK URL"
              variant="standard"
              value={formValues.url}
              onChange={handleChange}
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

export default CreateExtraPop;
