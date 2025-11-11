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
import { useCreateCounsellorMutation } from '../../../slices/adminApiSlice'; // Update this import path
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase'; // Adjust the import path accordingly

const storage = getStorage(app);

function CreateCounsellorPop({ open, handleClose }) {
  const [formValues, setFormValues] = useState({
    name: '',
    imageFile: null,
    experience: '',
    course: '',
  });
  
  const [errors, setErrors] = useState({
    name: false,
    experience: false,
    course: false,
    imageFile: false,
  });
  
  const [imageValid, setImageValid] = useState(false); // Image validation state
  const [counsellorCreate, { isSuccess }] = useCreateCounsellorMutation();
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
      if (formValues.imageFile && imageValid) {
        const imageURL = await uploadImage(formValues.imageFile);
        const counsellorData = {
          name: formValues.name,
          experience: formValues.experience,
          course: formValues.course,
          imageURL,
        };
        const res = await counsellorCreate(counsellorData).unwrap();
        dispatch(addCounsellor({ ...res }));
        handleClose(); // Close dialog after submission
        toast.success('Counsellor Added Successfully');
      } else {
        toast.error('Please upload a valid image');
      }
    } catch (error) {
      console.error('Error adding counsellor:', error);
      toast.error(error.message || 'Failed to add counsellor');
    }
  };

  // Check if the form is valid (all fields filled and image is valid)
  const isFormValid = () => {
    return (
      formValues.name.trim() &&
      formValues.experience.trim() &&
      formValues.course.trim() &&
      imageValid
    );
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Counsellor Added Successfully');
    }
  }, [isSuccess]);

  return (
    <div>
      <Dialog fullWidth={true} open={open} onClose={handleClose}>
        <DialogTitle>Add Counsellor</DialogTitle>
        <DialogContent>
          <DialogContentText>You can add a counsellor.</DialogContentText>
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
              id="experience"
              name="experience"
              label="Experience"
              variant="standard"
              value={formValues.experience}
              onChange={handleChange}
              error={errors.experience}
              helperText={errors.experience ? 'Experience is required' : ''}
            />
            <TextField
              id="course"
              name="course"
              label="Course"
              variant="standard"
              value={formValues.course}
              onChange={handleChange}
              error={errors.course}
              helperText={errors.course ? 'Course is required' : ''}
            />
            <TextField
              id="imageFile"
              name="imageFile"
              type="file"
              label="Image"
              variant="standard"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={errors.imageFile}
              helperText={
                errors.imageFile ? 'Image must be 300x250 pixels' : 'Make sure your image size is 300x250 px'
              }
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

export default CreateCounsellorPop;
