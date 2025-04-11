import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { AddProvince } from '../../../slices/provinceSlice';
import { useCreateProvinceMutation } from '../../../slices/adminApiSlice';
import { ExpandMoreSharp } from '@mui/icons-material';
import TextEditor from '../TextEditor';

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
  const [sectionPreviews, setSectionPreviews] = useState([null]);
  
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.country);
  const [createProvince] = useCreateProvinceMutation();

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

  const handleChange = async (event) => {
    const { name, value, type, files } = event.target;
  
    if (type === 'file') {
      const file = files[0];
      if (!file) return;
  
      // Sections Image Upload (e.g., sections.0.url)
      if (name.includes('sections') && name.includes('url')) {
        const isValid = await validateImage(file, 300, 300); // Minimum size for section image
        if (!isValid) {
          setFormErrors((prev) => ({
            ...prev,
            [name]: `Image must be at least 300px x 300px`,
          }));
          return;
        }
  
        setFormErrors((prev) => ({ ...prev, [name]: '' }));
  
        const imageURL = await uploadImage(file);
        const index = parseInt(name.split('.')[1]);
        const updatedSections = [...formValues.sections];
        updatedSections[index].url = imageURL;
  
        setFormValues((prevValues) => ({
          ...prevValues,
          sections: updatedSections,
        }));
  
        const updatedPreviews = [...sectionPreviews];
        updatedPreviews[index] = URL.createObjectURL(file);
        setSectionPreviews(updatedPreviews);
  
      } else {
        // Handle Banner & Flag Uploads
        const imageURL = await uploadImage(file);
  
        if (name === 'bannerURL') {
          const isValid = await validateImage(file, 1500, 500);
          if (!isValid) {
            setFormErrors((prev) => ({
              ...prev,
              [name]: `Banner must be at least 1500px x 500px`,
            }));
            return;
          }
          setBannerPreview(URL.createObjectURL(file));
        }
  
        if (name === 'flagURL') {
          const isValid = await validateImage(file, 200, 200);
          if (!isValid) {
            setFormErrors((prev) => ({
              ...prev,
              [name]: `Flag must be at least 200px x 200px`,
            }));
            return;
          }
          setFlagPreview(URL.createObjectURL(file));
        }
  
        setFormErrors((prev) => ({ ...prev, [name]: '' }));
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: imageURL,
        }));
      }
  
    } else if (name.includes('sections') || name.includes('faq')) {
      const [arrayName, index, field] = name.split('.');
      const updatedArray = [...formValues[arrayName]];
      updatedArray[index][field] = value;
  
      // Limit section description to 400 words
      if (arrayName === 'sections' && field === 'description') {
        const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
        if (wordCount > 400) return;
      }
  
      setFormValues((prevValues) => ({
        ...prevValues,
        [arrayName]: updatedArray,
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  
    checkFormValidity();
  };
  

  const uploadImage = async (file) => {
    const storageRef = ref(storage, `provinces/${Date.now()}-${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const addSection = () => {
    setFormValues(prev => ({
      ...prev,
      sections: [...prev.sections, { title: '', description: '', url: '' }]
    }));
    setSectionPreviews(prev => [...prev, null]);
  };

  const removeSection = (index) => {
    setFormValues(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }));
    setSectionPreviews(prev => prev.filter((_, i) => i !== index));
  };

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

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle className='text-white bg-custom-primary font-bold'>Add Province</DialogTitle>
      <DialogContent>
        <DialogContentText>You can add a province.</DialogContentText>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Name"
              variant="standard"
              value={formValues.name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="bannerURL"
              type="file"
              variant="standard"
              onChange={handleChange}
              fullWidth
              label="Banner Image"
            />
            {bannerPreview && <img src={bannerPreview} alt="Banner Preview" width="200" height="auto" />}
            <span className="text-red-300 font-bold">Banner Image should be 1500px x 500px</span>
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="heroURL"
              type="file"
              variant="standard"
              onChange={handleChange}
              fullWidth
              label="Hero Image"
            />
            {heroPreview && <img src={heroPreview} alt="Hero Preview" width="200" height="auto" />}
            <span className="text-red-300 font-bold">Hero Image should be 350px x 400px</span>
          </Grid>

          <Grid item xs={12}>
            <TextEditor
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
                    name={`section-${index}-title`}
                    label="Title"
                    variant="standard"
                    value={section.title}
                    onChange={handleChange}
                    fullWidth
                  />
                                <TextEditor
    id="description"
    name="description"
    label="Description"
    variant="standard"
    value={formValues.description}
    onChange={handleChange}
    className="mb-2"
  />
  <p className="text-sm text-gray-500 text-right">
    {formValues.description.trim().split(/\s+/).filter(Boolean).length} / 400 words
  </p>

                  <TextField
                    name={`sectionImage-${index}`}
                    label="Image URL"
                    variant="standard"
                    type="file"
                    onChange={handleChange}
                    fullWidth
                  />
                  {sectionPreviews[index] && (
                    <img src={sectionPreviews[index]} alt={`Section ${index + 1}`} width="200" height="auto" />
                  )}
                  <Button onClick={() => removeSection(index)} color="error">Remove Section</Button>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Button onClick={addSection} variant="contained">Add Section</Button>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="standard">
              <InputLabel>Country</InputLabel>
              <Select name="Country" value={formValues.Country} onChange={handleChange}>
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country._id}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onSubmit} disabled={!formValues.name || !formValues.Country || !formValues.bannerURL || !formValues.heroURL}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}