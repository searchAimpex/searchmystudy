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
  const [isValid, setIsValid] = useState(false);
  const [imageValid, setImageValid] = useState(false); // For image validation
  const [CreateWebinar, { isSuccess }] = useCreateWebinarMutation();
  const dispatch = useDispatch();

  const validateForm = () => {
    const { title, date, day, time, imageFile } = formValues;
    // All fields must be filled and the image must be valid
    if (title && date && day && time && imageFile && imageValid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;

    if (type === 'file') {
      const file = files[0];
      validateImage(file); // Validate image instantly when uploaded
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
    validateForm(); // Validate the form after every change
  };

  const uploadImage = async (file) => {
    const storageRef = ref(storage, `webinars/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  // Function to validate image dimensions
  const validateImage = (file) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    img.onload = () => {
      if (img.height >= 250 && img.width >= 310) {
        setImageValid(true); // Enable submit button if image is valid
        toast.success('Valid image uploaded!');
      } else {
        setImageValid(false); // Disable submit button if image is invalid
        toast.error('Image dimensions must be 310x250 pixels.');
      }
      validateForm(); // Call validation to check the entire form
    };

    img.onerror = () => {
      setImageValid(false);
      toast.error('Invalid image file.');
      validateForm();
    };

    reader.readAsDataURL(file);
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
              error={!formValues.title}
              helperText={!formValues.title && 'Title is required'}
            />
            <TextField
              id="date"
              name="date"
              label="Date"
              variant="standard"
              value={formValues.date}
              onChange={handleChange}
              error={!formValues.date}
              helperText={!formValues.date && 'Date is required'}
            />
            <TextField
              id="day"
              name="day"
              label="Day"
              variant="standard"
              value={formValues.day}
              onChange={handleChange}
              error={!formValues.day}
              helperText={!formValues.day && 'Day is required'}
            />
            <TextField
              id="time"
              name="time"
              label="Time"
              variant="standard"
              value={formValues.time}
              onChange={handleChange}
              error={!formValues.time}
              helperText={!formValues.time && 'Time is required'}
            />
            <TextField
              id="imageFile"
              name="imageFile"
              type="file"
              label="Image"
              variant="standard"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={!formValues.imageFile || !imageValid}
              helperText={(!formValues.imageFile || !imageValid) && 'Valid image (310x250 px) is required'}
            />
            <p className='text-red-300 text-sm'>Image should be 310*250 px</p>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {/* Disable submit button until form is valid */}
          <Button onClick={onSubmit} disabled={!isValid}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateWebinarPop;
