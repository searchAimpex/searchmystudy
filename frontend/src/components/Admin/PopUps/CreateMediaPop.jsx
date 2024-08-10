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
  const [CreateMedia, { isSuccess }] = useCreateMediaMutation();
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
    const storageRef = ref(storage, `media/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const onSubmit = async () => {
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
            />
            <TextField
              id="articalURL"
              name="articalURL"
              label="Article URL"
              variant="standard"
              value={formValues.articalURL}
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

export default CreateMediaPop;
