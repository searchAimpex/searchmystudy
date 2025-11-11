import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  FormHelperText
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useCreateFileMutation } from '../../../slices/adminApiSlice';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase';
import { useCountryGetMutation } from '../../../slices/usersApiSlice';
import { FetchSecondCountry } from '../../../slices/secondCountrySlice';

const storage = getStorage(app);

function CreatePromotionalItemsPop({ open, handleClose }) {
  const [formValues, setFormValues] = useState({
    SecondCountry: '',
    name: '',
    templateFile: null,
    broucherFile: null,
    type: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [CreateFile] = useCreateFileMutation();
  const [CountryGet] = useCountryGetMutation();
  const { SecondCountries } = useSelector((state) => state.secondCountry);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await CountryGet().unwrap();
        dispatch(FetchSecondCountry(result));
      } catch (error) {
        console.error('Failed to fetch countries:', error);
      }
    };
    fetchData();
  }, [CountryGet, dispatch]);

  const validateForm = (values) => {
    const newErrors = {};
    if (!values.SecondCountry) newErrors.SecondCountry = 'Please select a country.';
    if (!values.name) newErrors.name = 'Please enter a name.';
    if (!values.type) newErrors.type = 'Please select a type.';
    if (values.type === 'TEMPLATE' && !values.templateFile) newErrors.templateFile = 'Template file is required';
    if (values.type === 'BROUCHER' && !values.broucherFile) newErrors.broucherFile = 'Brochure file is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    const newFormValues = { ...formValues };

    if (type === 'file') {
      newFormValues[name] = files[0];
    } else {
      newFormValues[name] = value;
    }

    setFormValues(newFormValues);
    setIsSubmitEnabled(validateForm(newFormValues));
  };

  const uploadFile = async (file, folder) => {
    const storageRef = ref(storage, `${folder}/${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const onSubmit = async () => {
    if (!isSubmitEnabled) return;

    try {
      let templateURL = '';
      let broucherURL = '';

      if (formValues.templateFile) {
        templateURL = await uploadFile(formValues.templateFile, 'templates');
      }
      if (formValues.broucherFile) {
        broucherURL = await uploadFile(formValues.broucherFile, 'brouchers');
      }

      const fileData = {
        SecondCountry: formValues.SecondCountry,
        name: formValues.name,
        template: templateURL,
        broucher: broucherURL,
        type: formValues.type,
      };

      await CreateFile(fileData).unwrap();
      handleClose();
      toast.success('File added successfully');
    } catch (error) {
      console.error('Error adding file:', error);
      toast.error('Failed to add file');
    }
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
        Add Promotional Item
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText sx={{ mb: 2, textAlign: 'center', color: 'text.secondary' }}>
          Fill out the form to add a promotional item.
        </DialogContentText>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            mt: 1,
            alignItems: 'center',
          }}
        >
          <FormControl fullWidth error={!!errors.SecondCountry}>
            <InputLabel>Country</InputLabel>
            <Select
              id="SecondCountry"
              name="SecondCountry"
              value={formValues.SecondCountry}
              onChange={handleChange}
            >
              {SecondCountries.map((country) => (
                <MenuItem key={country._id} value={country._id}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
            {errors.SecondCountry && <FormHelperText>{errors.SecondCountry}</FormHelperText>}
          </FormControl>

          <TextField
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            value={formValues.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />

          <FormControl fullWidth error={!!errors.type}>
            <InputLabel>Type</InputLabel>
            <Select
              id="type"
              name="type"
              value={formValues.type}
              onChange={handleChange}
            >
              <MenuItem value="TEMPLATE">Template</MenuItem>
              <MenuItem value="BROUCHER">Brochure</MenuItem>
            </Select>
            {errors.type && <FormHelperText>{errors.type}</FormHelperText>}
          </FormControl>

          {formValues.type === 'TEMPLATE' && (
            <TextField
              id="templateFile"
              name="templateFile"
              type="file"
              label="Upload Template File"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={!!errors.templateFile}
              helperText={errors.templateFile}
            />
          )}

          {formValues.type === 'BROUCHER' && (
            <TextField
              id="broucherFile"
              name="broucherFile"
              type="file"
              label="Upload Brochure File"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={!!errors.broucherFile}
              helperText={errors.broucherFile}
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', p: 2 }}>
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
        <Button variant="contained" onClick={onSubmit} disabled={!isSubmitEnabled} sx={{ ml: 1 }}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreatePromotionalItemsPop;
