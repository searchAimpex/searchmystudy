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
import { useCreateCounsellorMutation, useCreateVideoMutation } from '../../../slices/adminApiSlice'; // Update this import path
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase'; // Adjust the import path accordingly
import { addVideo } from '../../../slices/videoSlice';

const storage = getStorage(app);

function CreateVideoPop({ open, handleClose }) {
  const [formValues, setFormValues] = useState({
    name: '',
    videoURL: '',
 
  });
  
  const [errors, setErrors] = useState({
    name: false,
    videoURL: false,
 
  });
  
  const [imageValid, setImageValid] = useState(false); // Image validation state
  const [counsellorCreate, { isSuccess }] = useCreateVideoMutation();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;

    // Validate text inputs
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

    // Handle file input and image validation
    if (type === 'file') {
      const file = files[0];
      if (file) {
        validateImage(file); // Validate image on upload
        setFormValues((prevValues) => ({
          ...prevValues,
          imageFile: file,
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          imageFile: true,
        }));
      }
    }
  };

  const uploadImage = async (file) => {
    const storageRef = ref(storage, `counsellors/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  // Validate image dimensions (300x250)
  const validateImage = (file) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    img.onload = () => {
      if (img.width >= 300 && img.height >= 250) {
        setImageValid(true); // Image is valid
        setErrors((prevErrors) => ({
          ...prevErrors,
          imageFile: false,
        }));
        toast.success('Valid image uploaded!');
      } else {
        setImageValid(false); // Invalid image dimensions
        setErrors((prevErrors) => ({
          ...prevErrors,
          imageFile: true,
        }));
        toast.error('Image dimensions must be 300x250 pixels.');
      }
    };

    img.onerror = () => {
      setImageValid(false);
      setErrors((prevErrors) => ({
        ...prevErrors,
        imageFile: true,
      }));
      toast.error('Invalid image file.');
    };

    reader.readAsDataURL(file);
  };

  const onSubmit = async () => {
    try {
        const counsellorData = {
          name: formValues.name,
          videoURL: formValues.videoURL,
        }
        const res = await counsellorCreate(counsellorData).unwrap();
        dispatch(addVideo({ ...res }));
        handleClose(); // Close dialog after submission
        toast.success('Video Added Successfully');
    } catch (error) {
      console.error('Error adding video:', error);
      toast.error(error.message || 'Failed to add video');
    }
  };

  // Check if the form is valid (all fields filled and image is valid)
  const isFormValid = () => {
    return (
      formValues.name.trim() 
    )
   
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Counsellor Added Successfully');
    }
  }, [isSuccess]);

  return (
    <div>
      <Dialog fullWidth={true} open={open} onClose={handleClose}>
        <DialogTitle>Add Video</DialogTitle>
        <DialogContent>
          <DialogContentText>You can add a Video.</DialogContentText>
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
              error={errors.name}
              helperText={errors.name ? 'Name is required' : ''}
            />
            <TextField
              id="videoURL"
              name="videoURL"
              label="Video URL"
              variant="standard"
              value={formValues.videoURL}
              onChange={handleChange}
              error={errors.videoURL}
              helperText={errors.videoURL ? 'Video URL is required' : ''}
            />
    
        
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={onSubmit} disabled={!isFormValid()}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default CreateVideoPop;