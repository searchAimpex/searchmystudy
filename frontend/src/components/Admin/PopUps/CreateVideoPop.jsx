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
import { useCreateVideoMutation } from '../../../slices/adminApiSlice'; // Update this import path
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase'; // Adjust the import path accordingly
import { addVideo } from '../../../slices/videoSlice';

const storage = getStorage(app);

function CreateVideoPop({ open, handleClose }) {
  const [formValues, setFormValues] = useState({
    name: '',
    videoURL: '',
    thumbnailFile: null,
    thumbnailURL: '',
  });
  
  const [errors, setErrors] = useState({
    name: false,
    videoURL: false,
    thumbnailFile: false,
  });
  
  const [imageValid, setImageValid] = useState(false);
  const [createVideo, { isSuccess }] = useCreateVideoMutation();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;

    if (type === 'text') {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: !value.trim(),
      }));
    }

    if (type === 'file') {
      const file = files[0];
      if (file) {
        validateImage(file);
        setFormValues((prevValues) => ({
          ...prevValues,
          thumbnailFile: file,
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          thumbnailFile: true,
        }));
      }
    }
  };

  const validateImage = (file) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    img.onload = () => {
      if (img.width >= 200 && img.height >= 400) {
        setImageValid(true);
        setErrors((prevErrors) => ({
          ...prevErrors,
          thumbnailFile: false,
        }));
        toast.success('Valid thumbnail uploaded!');
      } else {
        setImageValid(false);
        setErrors((prevErrors) => ({
          ...prevErrors,
          thumbnailFile: true,
        }));
        toast.error('Thumbnail must be at least 200px wide and 400px high.');
      }
    };

    img.onerror = () => {
      setImageValid(false);
      setErrors((prevErrors) => ({
        ...prevErrors,
        thumbnailFile: true,
      }));
      toast.error('Invalid image file.');
    };

    reader.readAsDataURL(file);
  };

  const uploadImage = async (file) => {
    const storageRef = ref(storage, `thumbnails/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const onSubmit = async () => {
    try {
      let thumbnailURL = '';
      if (formValues.thumbnailFile && imageValid) {
        thumbnailURL = await uploadImage(formValues.thumbnailFile);
      }

      const videoData = {
        name: formValues.name,
        videoURL: formValues.videoURL,
        thumbnailURL: thumbnailURL,
      };

      const res = await createVideo(videoData).unwrap();
      dispatch(addVideo({ ...res }));
      handleClose();
      toast.success('Video Added Successfully');
    } catch (error) {
      console.error('Error adding video:', error);
      toast.error(error.message || 'Failed to add video');
    }
  };

  const isFormValid = () => {
    return (
      formValues.name.trim() &&
      formValues.videoURL.trim() &&
      imageValid
    );
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Video Added Successfully');
    }
  }, [isSuccess]);

  return (
    <Dialog fullWidth={true} open={open} onClose={handleClose}>
      <DialogTitle>Add Video</DialogTitle>
      <DialogContent>
        <DialogContentText>Add a video with a thumbnail.</DialogContentText>
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
          <input
            type="file"
            name="thumbnailFile"
            accept="image/*"
            onChange={handleChange}
          />
          {errors.thumbnailFile && (
            <span style={{ color: 'red' }}>Valid thumbnail is required</span>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={onSubmit} disabled={!isFormValid()}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateVideoPop;
