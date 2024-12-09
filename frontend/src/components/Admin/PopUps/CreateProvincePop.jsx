import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { AddProvince } from '../../../slices/provinceSlice';
import { useCreateProvinceMutation } from '../../../slices/adminApiSlice';
import {  ExpandMoreSharp } from '@mui/icons-material';

const storage = getStorage(app);

export default function CreateProvincePop({ open, handleClose }) {
  const [formValues, setFormValues] = useState({
    name: '',
    bannerURL: '',
    heroURL: '',
    description: '',
    sections: [{ title: '', description: '', url: '' }],
    Country: '',
  });
  const [bannerPreview, setBannerPreview] = useState(null);
  const [heroPreview, setHeroPreview] = useState(null);
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.country);

  const [createProvince, { isSuccess }] = useCreateProvinceMutation();

  // Function to validate image dimensions
  const validateImageDimensions = (file, { width, height }) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
      };

      img.onload = () => {
        if (img.width >= width && img.height >= height) {
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

  // Handle input change and file upload
  const handleChange = async (event) => {
    const { name, value, type, files } = event.target;
  
    if (type === 'file') {
      const file = files[0];
      if (file) {
        const dimensions = name === 'bannerURL' ? { width: 1500, height: 500 } : { width: 350, height: 400 };
  
        // Show preview before upload
        const previewURL = URL.createObjectURL(file);
        if (name === 'bannerURL') {
          setBannerPreview(previewURL);
        } else if (name === 'heroURL') {
          setHeroPreview(previewURL);
        }
  
        try {
          await validateImageDimensions(file, dimensions);
          const imageURL = await uploadImage(file);
          setFormValues((prevValues) => ({ ...prevValues, [name]: imageURL }));
        } catch (error) {
          toast.error(error.message);
        }
      }
    } else if (name.includes('sections')) {
      const sectionIndex = name.split('.')[1]; // Get section index from the name
      const fieldName = name.split('.')[2]; // Get the field name (title, description, etc.)
  
      // Update the specific section field dynamically
      setFormValues((prevValues) => {
        const updatedSections = [...prevValues.sections];
        updatedSections[sectionIndex] = {
          ...updatedSections[sectionIndex],
          [fieldName]: value,
        };
        return {
          ...prevValues,
          sections: updatedSections,
        };
      });
    } else {
      setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    }
  };
  
  // Upload image to Firebase
  const uploadImage = async (file) => {
    const storageRef = ref(storage, `provinces/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  // Add section
  const addSection = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      sections: [...prevValues.sections, { title: '', description: '', url: '' }],
    }));
  };

  // Remove section
  const removeSection = (index) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      sections: prevValues.sections.filter((_, i) => i !== index),
    }));
  };

  // Submit form
  const onSubmit = async () => {
    try {
      const res = await createProvince(formValues).unwrap();
      dispatch(AddProvince(res));
      handleClose();
      toast.success('Province Added Successfully');
    } catch (error) {
      console.error('Error adding province:', error);
      toast.error(error.message || 'Failed to add province');
    }
  };
  const handlecancell = (e)=>{
    e.stopPropagation();
    handleClose();
  }

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle className='text-white bg-custom-primary font-bold'>Add Province</DialogTitle>
      <DialogContent>
        <DialogContentText>You can add a province.</DialogContentText>
        <Grid container spacing={2}>
          {/* Name */}
          <Grid item xs={12}>
            <TextField
              id="name"
              name="name"
              label="Name"
              variant="standard"
              value={formValues.name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Banner Image */}
          <Grid item xs={12}>
            <TextField
              id="bannerURL"
              name="bannerURL"
              type="file"
              variant="standard"
              onChange={handleChange}
              fullWidth
              label="Banner Image"
            />
            {bannerPreview && (
              <img src={bannerPreview} alt="Banner Preview" width="200" height="auto" />
            )}
            <span className="text-red-300 font-bold">Banner Image should be 1500px x 500px</span>
          </Grid>

          {/* Hero Image */}
          <Grid item xs={12}>
            <TextField
              id="heroURL"
              name="heroURL"
              type="file"
              variant="standard"
              onChange={handleChange}
              fullWidth
              label="Hero Image"
            />
            {heroPreview && (
              <img src={heroPreview} alt="Hero Preview" width="200" height="auto" />
            )}
            <span className="text-red-300 font-bold">Hero Image should be 350px x 400px</span>
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              id="description"
              name="description"
              label="Description"
              variant="standard"
              value={formValues.description}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {formValues.sections.map((section, index) => (
          <Grid item xs={12} key={index}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreSharp />}>
                <Typography>Section {index + 1}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextField
                  id={`sectionTitle${index}`}
                  name={`sections.${index}.title`}  // Corrected name
                  label="Title"
                  variant="standard"
                  value={section.title}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  id={`sectionDescription${index}`}
                  name={`sections.${index}.description`}  // Corrected name
                  label="Description"
                  variant="standard"
                  value={section.description}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  id={`sectionURL${index}`}
                  name={`sections.${index}.url`}  // Corrected name
                  label="Image URL"
                  variant="standard"
                  type="file"
                  onChange={handleChange}
                  fullWidth
                />
                <Button onClick={() => removeSection(index)} color="error">Remove Section</Button>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}

          <Grid item xs={12}>
            <Button onClick={addSection} variant="contained">Add Section</Button>
          </Grid>

          {/* Country Select */}
          <Grid item xs={12}>
            <FormControl fullWidth variant="standard">
              <InputLabel>Country</InputLabel>
              <Select name="Country" value={formValues.Country} onChange={handleChange} fullWidth>
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handlecancell}>Cancel</Button>
        <Button onClick={onSubmit} disabled={!formValues.name || !formValues.Country || !formValues.bannerURL || !formValues.heroURL}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
