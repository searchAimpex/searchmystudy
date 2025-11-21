import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase'; // Adjust the import path accordingly
import { AddSecondCountry } from '../../../slices/secondCountrySlice';
import { toast } from 'react-toastify';
import { useCountryCreateMutation } from '../../../slices/usersApiSlice';

const storage = getStorage(app);

function CreateSecondCountryPop({ open, handleClose }) {
  const [formValues, setFormValues] = useState({
    name: '',
    flagURL: '',
    currency: '',
    code: '',
    vfs: '',
    step: '',
    whyThisCountry: '',
    faq: '',
  });

  const [errors, setErrors] = useState({}); // State for form validation errors
  const [CountryCreate, { isSuccess }] = useCountryCreateMutation();
  const dispatch = useDispatch();

  // Handle form value change
  const handleChange = async (event) => {
    const { name, type, files, value } = event.target;
    
    if (type === 'file') {
      const file = files[0];
      if (file) {
        const fileURL = await uploadFile(file, name);
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: fileURL,
        }));
      }
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  // File upload logic
  const uploadFile = async (file, fieldName) => {
    const storageRef = ref(storage, `second-countries/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  // Form validation logic
  const validateForm = () => {
    const newErrors = {};
    if (!formValues.name.trim()) newErrors.name = 'Country name is required';
    if (!formValues.flagURL.trim()) newErrors.flagURL = 'Flag image is required';
    if (!formValues.currency.trim()) newErrors.currency = 'Currency is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const onSubmit = async () => {
    if (!validateForm()) {
      toast.error('Please fill all required fields.');
      return;
    }

    try {
      const res = await CountryCreate(formValues).unwrap();
      dispatch(AddSecondCountry({ ...res }));
      toast.success('Second Country Added Successfully');
      resetForm();
      handleClose();
    } catch (error) {
      toast.error('Error submitting form. Please try again.');
    }
  };

  // Reset form values
  const resetForm = () => {
    setFormValues({
      name: '',
      flagURL: '',
      currency: '',
      code: '',
      vfs: '',
      step: '',
      whyThisCountry: '',
      faq: '',
    });
    setErrors({});
  };

  // Success effect
  useEffect(() => {
    if (isSuccess) {
      toast.success('Second Country Added Successfully');
      resetForm();
    }
  }, [isSuccess]);

  return (
    <Dialog fullWidth='xl' open={open} onClose={handleClose}>
      <DialogTitle className='text-white bg-custom-primary font-bold'>Add Second Country</DialogTitle>
      <DialogContent>
        <DialogContentText>You can add a second country.</DialogContentText>
        <Box
          noValidate
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', m: 'auto', width: 'fit-content' }}
          className="space-y-6 my-2"
        >
          {/* Name */}
          <TextField
            id="name"
            name="name"
            label="Country Name"
            variant="standard"
            value={formValues.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            className="mb-2"
          />

          {/* Flag Image */}
          <TextField
            id="flagURL"
            name="flagURL"
            type="file"
            variant="standard"
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            error={!!errors.flagURL}
            helperText={errors.flagURL}
            className="mb-2"
            label="Flag Image"
          />

          {/* Currency */}
          <TextField
            id="currency"
            name="currency"
            label="Currency"
            variant="standard"
            value={formValues.currency}
            onChange={handleChange}
            error={!!errors.currency}
            helperText={errors.currency}
            className="mb-2"
          />

          {/* Country Code */}
          <TextField
            id="code"
            name="code"
            label="Country Code"
            variant="standard"
            value={formValues.code}
            onChange={handleChange}
            className="mb-2"
          />

          {/* VFS File (PDF) */}
          <TextField
            id="vfs"
            name="vfs"
            type="file"
            variant="standard"
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            className="mb-2"
            label="VFS (PDF)"
            inputProps={{ accept: "application/pdf" }}
          />

          {/* Step File (PDF) */}
          <TextField
            id="step"
            name="step"
            type="file"
            variant="standard"
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            className="mb-2"
            label="Step (PDF)"
            inputProps={{ accept: "application/pdf" }}
          />

          {/* Why This Country File (PDF) */}
          <TextField
            id="whyThisCountry"
            name="whyThisCountry"
            type="file"
            variant="standard"
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            className="mb-2"
            label="Why This Country (PDF)"
            inputProps={{ accept: "application/pdf" }}
          />

          {/* FAQ File (PDF) */}
          <TextField
            id="faq"
            name="faq"
            type="file"
            variant="standard"
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            className="mb-2"
            label="FAQ (PDF)"
            inputProps={{ accept: "application/pdf" }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={onSubmit} variant="contained" color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateSecondCountryPop;
