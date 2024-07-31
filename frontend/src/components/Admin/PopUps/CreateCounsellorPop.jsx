import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addCounsellor } from '../../../slices/counsellorSlice'; // Update this import path
import {  useCreateCounsellorMutation } from '../../../slices/adminApiSlice'; // Update this import path
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from '../../../firebase'; // Adjust the import path accordingly

const storage = getStorage(app);

function CreateCounsellorPop({ open, handleClose }) {
  const [formValues, setFormValues] = useState({
    name: '',
    imageFile: null,
    experience: '',
    course: '',
  });
  const [counsellorCreate, { isSuccess }] = useCreateCounsellorMutation();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;

    if (type === 'file') {
      const file = files[0];
      setFormValues((prevValues) => ({
        ...prevValues,
        imageFile: file,
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const uploadImage = async (file) => {
    const storageRef = ref(storage, `counsellors/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const onSubmit = async () => {
    try {
      if (formValues.imageFile) {
        const imageURL = await uploadImage(formValues.imageFile);
        const counsellorData = {
          name: formValues.name,
          experience: formValues.experience,
          course: formValues.course,
          imageURL,
        };
        console.log("data",counsellorData)
        const res = await counsellorCreate(counsellorData).unwrap();
        dispatch(addCounsellor({ ...res }));
        handleClose(); // Close the dialog after submission
        toast.success('Counsellor Added Successfully');
      } else {
        toast.error('Please upload an image');
      }
    } catch (error) {
      console.error('Error adding counsellor:', error);
      toast.error('Failed to add counsellor');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Counsellor Added Successfully');
    }
  }, [isSuccess]);

  return (
    <div>
      <Dialog fullWidth={true} open={open} onClose={handleClose}>
        <DialogTitle>Add Testimonial</DialogTitle>
        <DialogContent>
          <DialogContentText>You can add a Testimonial.</DialogContentText>
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
              id="experience"
              name="experience"
              label="Experience"
              variant="standard"
              value={formValues.experience}
              onChange={handleChange}
            />
            <TextField
              id="course"
              name="course"
              label="Course"
              variant="standard"
              value={formValues.course}
              onChange={handleChange}
            />
            <TextField
              id="imageFile"
              name="imageFile"
              type="file"
              label="Image"
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

export default CreateCounsellorPop;
