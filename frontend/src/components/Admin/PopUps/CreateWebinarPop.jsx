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
import { useAllWebinarMutation, useCreateWebinarMutation } from '../../../slices/adminApiSlice';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase'; // Adjust the import path accordingly
import { FetchWebinar } from '../../../slices/webinarSlice';

const storage = getStorage(app);

function CreateWebinarPop({ open, handleClose }) {
  const [formValues, setFormValues] = useState({
    trainer_name: '',
    trainer_profession: '',
    title: '',
    weekday: '',
    date: '',
    timeStart: '',
    timeEnd: '',
    imageFile: null,
  });
  const [isValid, setIsValid] = useState(false);
  const [imageValid, setImageValid] = useState(false);
  const [CreateWebinar, { isSuccess }] = useCreateWebinarMutation();
      const [AllWebinar, { isSuccessses }] = useAllWebinarMutation();
  
  const dispatch = useDispatch();

  const validateForm = () => {
    const { trainer_name, trainer_profession, title, weekday, date, timeStart, timeEnd, imageFile } = formValues;
    if (trainer_name && trainer_profession && title && weekday && date && timeStart && timeEnd && imageValid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  // Handle input changes
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

  // Image upload function
  const uploadImage = async (file) => {
    const storageRef = ref(storage, `webinars/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  // Validate image dimensions (310x250)
  const validateImage = (file) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    img.onload = () => {
      if (img.width === 310 && img.height === 250) {
        setImageValid(true); // Image is valid
        toast.success('Valid image uploaded!');
      } else {
        setImageValid(false); // Image is invalid
        toast.error('Image dimensions must be 310x250 pixels.');
      }
      validateForm(); // Revalidate the form
    };

    img.onerror = () => {
      setImageValid(false);
      toast.error('Invalid image file.');
      validateForm(); // Revalidate the form
    };

    reader.readAsDataURL(file);
  };



   const fetchData = async () => {
              try {
                  const result = await AllWebinar().unwrap();
                  dispatch(FetchWebinar(result));
              } catch (error) {
                  console.error('Failed to fetch testimonials:', error);
              }
          };




  const onSubmit = async () => {
    try {
      if (formValues.imageFile) {
        const imageURL1 = await uploadImage(formValues.imageFile);
  
        const webinarData = {
          trainer_name: formValues.trainer_name,
          trainer_profession: formValues.trainer_profession,
          title: formValues.title,
          weekday: formValues.weekday,
          date: formValues.date,
          timeStart: formValues.timeStart,
          timeEnd: formValues.timeEnd,
          imageURL:imageURL1,
        };
      //  console.log(webinarData,"--------------------------+++")
        await CreateWebinar(webinarData).unwrap();  
        handleClose(); // Close the dialog after submission
        fetchData()
        toast.success('Webinar Added Successfully');
      } else {
        toast.error('Please upload an image');
      }
    } catch (error) {
      console.error('Error adding webinar:', error);
      toast.error('All fields are required!');
    }
  };
  

  useEffect(() => {
    if (isSuccess) {
      toast.success('Webinar Added Successfully');
    }
  }, [isSuccess]);

  return (
    <Dialog fullWidth={true} open={open} onClose={handleClose}>
      <DialogTitle>Add Webinar</DialogTitle>
      <DialogContent>
        <DialogContentText>You can add a webinar.</DialogContentText>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 'auto',
            width: 'fit-content',
          }}
        >
          {/* Title */}
          <TextField
            id="trainer_name"
            name="trainer_name"
            label="Trainer Name"
            variant="standard"
            value={formValues.trainer_name}
            onChange={handleChange}
            error={!formValues.trainer_name}
            helperText={!formValues.trainer_name && 'Trainer Name is required'}
            fullWidth
            margin="normal"
          />

          <TextField
            id="trainer_profession"
            name="trainer_profession"
            label="Trainer Profession"
            variant="standard"
            value={formValues.trainer_profession}
            onChange={handleChange}
            error={!formValues.trainer_profession}
            // helperText={!formValues.trainer_profession && 'Trainer Profession is required'}
            fullWidth
            margin="normal"
          />


          <TextField
            id="title"
            name="title"
            label="Title"
            variant="standard"
            value={formValues.title}
            onChange={handleChange}
            error={!formValues.title}
            helperText={!formValues.title && 'Title is required'}
            fullWidth
            margin="normal"
          />

          {/* Weekday */}
          <TextField
            id="weekday"
            name="weekday"
            label="Weekday"
            variant="standard"
            value={formValues.weekday}
            onChange={handleChange}
            error={!formValues.weekday}
            helperText={!formValues.weekday && 'Weekday is required'}
            fullWidth
            margin="normal"
          />

          {/* Date */}
          <TextField
            id="date"
            name="date"
            label="Select Date"
            type="date"
            variant="standard"
            value={formValues.date}
            onChange={handleChange}
            error={!formValues.date}
            className="w-full"
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />

          {/* Time Start and End */}
          <div className="w-full flex flex-col sm:flex-row mt-4 gap-4">
            <TextField
              id="timeStart"
              name="timeStart"
              label="Start Time"
              type="time"
              variant="standard"
              value={formValues.timeStart}
              onChange={handleChange}
              error={!formValues.timeStart}
              className="w-full"
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />

            <TextField
              id="timeEnd"
              name="timeEnd"
              label="End Time"
              type="time"
              variant="standard"
              value={formValues.timeEnd}
              onChange={handleChange}
              error={!formValues.timeEnd}
              className="w-full"
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />
          </div>

          {/* Image File */}
          <div className="mt-4">
            <TextField
              id="imageFile"
              name="imageFile"
              type="file"
              label="Image"
              variant="standard"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={!formValues.imageFile || !imageValid}
              fullWidth
              margin="normal"
            />
            <p className="text-red-300 text-sm">Image should be 310x250 px</p>
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={onSubmit} >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateWebinarPop;
