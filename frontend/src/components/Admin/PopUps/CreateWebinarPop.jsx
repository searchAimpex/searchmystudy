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
import { useCreateWebinarMutation } from '../../../slices/adminApiSlice';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase'; // Adjust the import path accordingly

const storage = getStorage(app);

function CreateWebinarPop({ open, handleClose }) {
  const [formValues, setFormValues] = useState({
    title: '',
    imageFile: null,
    date: '',
    day: '',
    time: '',
  });
  const [CreateWebinar, { isSuccess }] = useCreateWebinarMutation();
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
    const storageRef = ref(storage, `webinars/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const onSubmit = async () => {
    try {
      if (formValues.imageFile) {
        const imageURL = await uploadImage(formValues.imageFile);
        const webinarData = {
          title: formValues.title,
          date: formValues.date,
          day: formValues.day,
          time: formValues.time,
          imageURL,
        };

        const res = await CreateWebinar(webinarData).unwrap();
        dispatch(CreateWebinar({ ...res })); // Add action creator for adding the webinar to Redux store
        handleClose(); // Close the dialog after submission
        toast.success('Webinar Added Successfully');
      } else {
        toast.error('Please upload an image');
      }
    } catch (error) {
      console.error('Error adding webinar:', error);
      toast.error('Failed to add webinar');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Webinar Added Successfully');
    }
  }, [isSuccess]);

  return (
    <div>
      <Dialog fullWidth={true} open={open} onClose={handleClose}>
        <DialogTitle>Add Webinar</DialogTitle>
        <DialogContent>
          <DialogContentText>You can add a webinar.</DialogContentText>
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
              id="date"
              name="date"
              label="Date"
              variant="standard"
              value={formValues.date}
              onChange={handleChange}
            />
            <TextField
              id="day"
              name="day"
              label="Day"
              variant="standard"
              value={formValues.day}
              onChange={handleChange}
            />
            <TextField
              id="time"
              name="time"
              label="Time"
              variant="standard"
              value={formValues.time}
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

export default CreateWebinarPop;
