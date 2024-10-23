import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase';
import { useUpdateProvinceMutation } from '../../../slices/adminApiSlice';
import { toast } from 'react-toastify';

const storage = getStorage(app);

export default function UpdateProvincePop({ open, handleClose, provinceData }) {
  const [formValues, setFormValues] = useState({
    name: '',
    bannerURL: '',
    heroURL: '',
    description: '',
    sections: [{ title: '', description: '', url: '' }],
    Country: '',
  });

  const [updateProvince, { isSuccess }] = useUpdateProvinceMutation();
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.country);

  useEffect(() => {
    if (provinceData) {
      setFormValues(provinceData);
    }
  }, [provinceData]);

  const validateImageDimensions = (file, { width, height }) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
      };

      img.onload = () => {
        if (img.width === width && img.height === height) {
          resolve(true);
        } else {
          reject(new Error(`Image dimensions must be ${width}x${height} pixels.`));
        }
      };

      img.onerror = () => {
        reject(new Error('Invalid image file.'));
      };

      reader.readAsDataURL(file);
    });
  };

  const handleChange = async (event) => {
    const { name, value, type, files } = event.target;

    if (type === 'file') {
      const file = files[0];
      if (file) {
        const dimensions = name === 'bannerURL' ? { width: 1500, height: 500 } : { width: 350, height: 400 };
        try {
          await validateImageDimensions(file, dimensions);
          const imageURL = await uploadImage(file);
          setFormValues((prevValues) => ({ ...prevValues, [name]: imageURL }));
        } catch (error) {
          toast.error(error.message);
        }
      }
    } else {
      setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    }
  };

  const uploadImage = async (file) => {
    const storageRef = ref(storage, `provinces/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const addSection = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      sections: [...prevValues.sections, { title: '', description: '', url: '' }],
    }));
  };

  const removeSection = (index) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      sections: prevValues.sections.filter((_, i) => i !== index),
    }));
  };

  const onSubmit = async () => {
    try {
        const data =  { 
            id:provinceData._id,
            raw:formValues
        }
        console.log("Send payload",data)
      const res = await updateProvince(data).unwrap();
      handleClose();
      toast.success('Province Updated Successfully');
    } catch (error) {
      console.error('Error updating province:', error);
      toast.error(error.message || 'Failed to update province');
    }
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle className='text-white bg-custom-primary font-bold'>Update Province</DialogTitle>
      <DialogContent>
        <DialogContentText>You can update the province details here.</DialogContentText>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', m: 'auto', width: 'fit-content' }} className="space-y-6 my-2">
          <TextField id="name" name="name" label="Name" variant="standard" value={formValues.name} onChange={handleChange} className="mb-2" />
          <TextField id="bannerURL" name="bannerURL" type="file" variant="standard" onChange={handleChange} className="mb-2" label="Banner Image" />
          <TextField id="heroURL" name="heroURL" type="file" variant="standard" onChange={handleChange} className="mb-2" label="Hero Image" />
          <TextField id="description" name="description" label="Description" variant="standard" value={formValues.description} onChange={handleChange} className="mb-2" />

          {/* Sections */}
          {formValues.sections.map((section, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Section {index + 1}</Typography>
              </AccordionSummary>
              <AccordionDetails className='flex flex-col gap-6'>
                <TextField id={`sectionTitle${index}`} name={`sections.${index}.title`} label="Title" variant="standard" value={section.title} onChange={handleChange} className="mb-2" />
                <TextField id={`sectionDescription${index}`} name={`sections.${index}.description`} label="Description" variant="standard" value={section.description} onChange={handleChange} className="mb-2" />
                <TextField id={`sectionURL${index}`} name={`sections.${index}.url`} label="Image URL" variant="standard" type="file" onChange={handleChange} className="mb-2" />
                <Button onClick={() => removeSection(index)} color="error">Remove Section</Button>
              </AccordionDetails>
            </Accordion>
          ))}
          <Button onClick={addSection} variant="contained">Add Section</Button>

          <FormControl fullWidth variant="standard">
            <InputLabel>Country</InputLabel>
            <Select name="Country" value={formValues.Country} onChange={handleChange}>
              {countries.map((country) => (
                <MenuItem key={country.id} value={country.name}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onSubmit}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}
