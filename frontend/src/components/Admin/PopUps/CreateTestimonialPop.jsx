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
import { AddTestimonial } from '../../../slices/testimonialSlice';
import { useTestimonialCreateMutation } from '../../../slices/adminApiSlice';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from '../../../firebase'; // Adjust the import path accordingly

const storage = getStorage(app);

function CreateTestimonialPop({ open, handleClose }) {
  const [formValues, setFormValues] = useState({
    title: '',
    imageFile: null,
    description: '',
    rating: '',
  });
  const [isValid, setIsValid] = useState(false);
  const [imageValid, setImageValid] = useState(false);
  const [TestimonialCreate, { isSuccess }] = useTestimonialCreateMutation();
  const dispatch = useDispatch();

  // Validate the form whenever form values or image validation changes
  useEffect(() => {
    const { title, description, rating, imageFile } = formValues;
    if (title && description && rating && imageFile && imageValid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [formValues, imageValid]); // Dependencies include form values and image validation state

  // Handle form input changes
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
  };

  const uploadImage = async (file) => {
    const storageRef = ref(storage, `testimonials/${file.name}`);
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
      if (img.height >= 300 && img.width >= 250) {
        setImageValid(true); // Enable submit button if image is valid
        toast.success('Valid image uploaded!');
      } else {
        setImageValid(false); // Disable submit button if image is invalid
        toast.error('Image dimensions must be exactly 300x250 pixels.');
      }
    };

    img.onerror = () => {
      setImageValid(false);
      toast.error('Invalid image file.');
    };

    reader.readAsDataURL(file);
  };

  const onSubmit = async () => {
    try {
      if (formValues.imageFile) {
        const imageURL = await uploadImage(formValues.imageFile);
        const testimonialData = {
          title: formValues.title,
          description: formValues.description,
          rating: formValues.rating,
          imageURL,
        };

        const res = await TestimonialCreate(testimonialData).unwrap();
        dispatch(AddTestimonial({ ...res }));
        handleClose(); // Close the dialog after submission
        toast.success('Testimonial Added Successfully');
      } else {
        toast.error('Please upload an image');
      }
    } catch (error) {
      console.error('Error adding testimonial:', error);
      toast.error('Failed to add testimonial');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Testimonial Added Successfully');
    }
  }, [isSuccess]);

  return (
    <div>
      <Dialog fullWidth={true} open={open} onClose={handleClose}>
        <DialogTitle>Add Testimonial</DialogTitle>
        <DialogContent>
          <DialogContentText>You can add a testimonial.</DialogContentText>
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
              id="description"
              name="description"
              label="Description"
              variant="standard"
              value={formValues.description}
              onChange={handleChange}
              error={!formValues.description}
              helperText={!formValues.description && 'Description is required'}
            />
            <TextField
              id="rating"
              name="rating"
              label="Rating"
              variant="standard"
              value={formValues.rating}
              onChange={handleChange}
              error={!formValues.rating}
              helperText={!formValues.rating && 'Rating is required'}
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
              helperText={(!formValues.imageFile || !imageValid) && 'Valid image (300x250 px) is required'}
            />
            <p className='text-red-300 text-sm'>Make sure image is exactly 300x250 px</p>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={onSubmit} disabled={!isValid}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateTestimonialPop;
