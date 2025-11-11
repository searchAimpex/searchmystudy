import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useCreateMyCommissionMutation, useCreateMyUploadMutation } from '../../../slices/adminApiSlice';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useDispatch } from 'react-redux';
import { app } from '../../../firebase'; // Adjust the import path accordingly
import { toast } from 'react-toastify';
import { DialogActions } from '@mui/material';
import { AddUpload } from '../../../slices/uploadSlice';
import { useCountryGetMutation } from '../../../slices/usersApiSlice';
import { AddCommission } from '../../../slices/commissionSlice';

const storage = getStorage(app);

function CreateCommissionPop({ open, handleClose }) {
  const [CountryGet] = useCountryGetMutation(); // Assuming this is to get second countries
  const [CreateMyCommission] = useCreateMyCommissionMutation();
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    SecondCountry: '', // Holds the selected country ID
    fileURL: '', // For the file URL
    target: 'partner', // Default target
  });

  const [countries, setCountries] = useState([]); // To hold fetched countries
  const [errors, setErrors] = useState({
    SecondCountry: false,
    file: false,
  });

  useEffect(() => {
    // Fetch second countries when the component mounts
    const fetchCountries = async () => {
      try {
        const response = await CountryGet().unwrap(); // Fetch countries
        setCountries(response); // Assuming response is an array of country objects
      } catch (error) {
        console.error('Error fetching second countries', error);
      }
    };

    fetchCountries();
  }, [CountryGet]);

  const handleChange = async (event) => {
    const { name, value, type, files } = event.target;

    if (type === 'text' || name === 'target' || name === 'SecondCountry') {
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
        const fileURL = await uploadImage(file);
        setFormValues((prevValues) => ({
          ...prevValues,
          fileURL,
        }));
      }
    }
  };

  const uploadImage = async (file) => {
    const storageRef = ref(storage, `popups/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const onSubmit = async () => {
    if (!errors.SecondCountry && formValues.fileURL) {
      const res = await CreateMyCommission(formValues).unwrap();
      dispatch(AddCommission({ ...res }));
      handleClose();
      toast.success('Commission Added Successfully');
    } else {
      toast.error('Please fix the form errors.');
    }
  };

  return (
    <div>
      <Dialog fullWidth="lg" open={open} onClose={handleClose}>
        <DialogTitle>Add Commission Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can add a commission file and select a second country.
          </DialogContentText>
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
              error={errors.title}
              helperText={errors.title ? 'Title is required' : ''}
            />
            <TextField
              id="SecondCountry"
              name="SecondCountry"
              label="Second Country"
              select
              value={formValues.SecondCountry}
              onChange={handleChange}
              error={errors.SecondCountry}
              helperText={errors.SecondCountry ? 'Second country is required' : ''}
              variant="standard"
            >
              {countries?.map((country) => (
                <MenuItem key={country._id} value={country._id}>
                  {country.name} {/* Assuming country object has a name field */}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="target"
              name="target"
              label="Target"
              select
              value={formValues.target}
              onChange={handleChange}
              variant="standard"
            >
              <MenuItem value="partner">Partner</MenuItem>
              <MenuItem value="franchise">Franchise</MenuItem>
            </TextField>

            <TextField
              id="fileFile"
              name="fileFile"
              type="file"
              label="Commission File (Any type)"
              variant="standard"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              helperText="Any file type is accepted."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            onClick={onSubmit}
            disabled={errors.SecondCountry || !formValues.fileURL}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateCommissionPop;
