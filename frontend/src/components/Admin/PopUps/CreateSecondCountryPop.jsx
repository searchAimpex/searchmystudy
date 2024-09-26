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
import { AddSecondCountry } from '../../../slices/secondCountrySlice'; // Assuming you have this slice
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

  const [CountryCreate, { isSuccess }] = useCountryCreateMutation();
  const dispatch = useDispatch();

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

  const uploadFile = async (file, fieldName) => {
    const storageRef = ref(storage, `second-countries/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const onSubmit = async () => {
    const res = await CountryCreate(formValues).unwrap();
    dispatch(AddSecondCountry({ ...res }));
    handleClose();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Second Country Added Successfully');
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
        <Button onClick={onSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateSecondCountryPop;
