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
  const [TestimonialCreate, { isSuccess }] = useTestimonialCreateMutation();
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
    const storageRef = ref(storage, `testimonials/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
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
            />
            <TextField
              id="description"
              name="description"
              label="Description"
              variant="standard"
              value={formValues.description}
              onChange={handleChange}
            />
            <TextField
              id="rating"
              name="rating"
              label="Rating"
              variant="standard"
              value={formValues.rating}
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

export default CreateTestimonialPop;
