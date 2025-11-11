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
import { useCreateMediaMutation } from '../../../slices/adminApiSlice'; // Update the import path accordingly
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase'; // Adjust the import path accordingly
import { CreateMedias } from '../../../slices/mediaSlice';

const storage = getStorage(app);

function CreateMediaPop({ open, handleClose }) {
  const [formValues, setFormValues] = useState({
    title: '',
    imageFile: null,
    articalURL: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [CreateMedia, { isSuccess }] = useCreateMediaMutation();
  const dispatch = useDispatch();

  const validateForm = (values) => {
    const newErrors = {};

    if (!values.title) newErrors.title = 'Title is required';
    if (!values.articalURL || !/^https?:\/\/\S+$/.test(values.articalURL)) {
      newErrors.articalURL = 'Valid article URL is required';
    }
    if (!values.description) newErrors.description = 'Description is required';
    if (!values.imageFile) newErrors.imageFile = 'Image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    const newFormValues = { ...formValues };

    if (type === 'file') {
      const file = files[0];
      newFormValues.imageFile = file;
    } else {
      newFormValues[name] = value;
    }

    setFormValues(newFormValues);

    // Validate the form whenever a field changes
    const isValid = validateForm(newFormValues);
    setIsSubmitEnabled(isValid);
  };

  const uploadImage = async (file) => {
    const storageRef = ref(storage, `media/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const onSubmit = async () => {
    if (!isSubmitEnabled) return;

    try {
      if (formValues.imageFile) {
        const imageURL = await uploadImage(formValues.imageFile);
        const mediaData = {
          title: formValues.title,
          imageURL,
          articalURL: formValues.articalURL,
          description: formValues.description,
        };

        const res = await CreateMedia(mediaData).unwrap();
        dispatch(CreateMedias({ ...res })); // Add action creator for adding the media to Redux store
        handleClose(); // Close the dialog after submission
        toast.success('Media Added Successfully');
      } else {
        toast.error('Please upload an image');
      }
    } catch (error) {
      console.error('Error adding media:', error);
      toast.error('Failed to add media');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Media Added Successfully');
    }
  }, [isSuccess]);

  return (
    <div>
      <Dialog fullWidth={true} open={open} onClose={handleClose}>
        <DialogTitle>Add Media</DialogTitle>
        <DialogContent>
          <DialogContentText>You can add a media item.</DialogContentText>
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
              error={!!errors.title}
              helperText={errors.title}
            />
            <TextField
              id="articalURL"
              name="articalURL"
              label="Article URL"
              variant="standard"
              value={formValues.articalURL}
              onChange={handleChange}
              error={!!errors.articalURL}
              helperText={errors.articalURL}
            />
            <TextField
              id="description"
              name="description"
              label="Description"
              variant="standard"
              value={formValues.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
            />
            <TextField
              id="imageFile"
              name="imageFile"
              type="file"
              label="Image"
              variant="standard"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={!!errors.imageFile}
              helperText={errors.imageFile}
            />
            <p className="text-red-300">Image should be 320*250px</p>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={onSubmit} disabled={!isSubmitEnabled}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateMediaPop;
