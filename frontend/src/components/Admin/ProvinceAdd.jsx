import React, { useEffect, useState } from 'react';
import { Button, TextField, Grid, Typography, FormControl, InputLabel, Select, MenuItem,Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { AddProvince } from '../../slices/provinceSlice';
import { useCreateProvinceMutation } from '../../slices/adminApiSlice';
import { ExpandMoreSharp } from '@mui/icons-material';
import TextEditor from './TextEditor';

const storage = getStorage(app);

export default function ProvinceAdd({ open, handleClose }) {
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
  const [createProvince,{isSuccess}] = useCreateProvinceMutation();

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
      if (file) {
        try {
          if (name === 'bannerURL') {
            await validateImageDimensions(file, { width: 1500, height: 500 });
            const previewURL = URL.createObjectURL(file);
            setBannerPreview(previewURL);
            const imageURL = await uploadImage(file);
            setFormValues(prev => ({ ...prev, bannerURL: imageURL }));
          } 
          else if (name === 'heroURL') {
            await validateImageDimensions(file, { width: 350, height: 400 });
            const previewURL = URL.createObjectURL(file);
            setHeroPreview(previewURL);
            const imageURL = await uploadImage(file);
            setFormValues(prev => ({ ...prev, heroURL: imageURL }));
          }
          else if (name.startsWith('sectionImage')) {
            const sectionIndex = parseInt(name.split('-')[1]);
            const previewURL = URL.createObjectURL(file);
            setSectionPreviews(prev => {
              const newPreviews = [...prev];
              newPreviews[sectionIndex] = previewURL;
              return newPreviews;
            });
            const imageURL = await uploadImage(file);
            setFormValues(prev => {
              const newSections = [...prev.sections];
              newSections[sectionIndex] = {
                ...newSections[sectionIndex],
                url: imageURL
              };
              return { ...prev, sections: newSections };
            });
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    } else if (name.startsWith('section-')) {
      const [, index, field] = name.split('-');
      setFormValues(prev => {
        const newSections = [...prev.sections];
        newSections[parseInt(index)] = {
          ...newSections[parseInt(index)],
          [field]: value
        };
        return { ...prev, sections: newSections };
      });
    } else {
      setFormValues(prev => ({ ...prev, [name]: value }));
    }
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
     
    } catch (error) {
      console.error('Error adding province:', error);
      toast.error(error.message || 'Failed to add province');
    }
  };
  useEffect(()=>{
    if(isSuccess){
        handleClose();
        toast.success('Province Added Successfully')
        navigate('/admin/course')
    }
  })

  return (
    <div className='flex flex-col items-center m-auto w-full max-w-3xl px-10'>
      <div>
        <div>You can add a province.</div>
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
                    name={`section-${index}-description`}
                    label="Description"
                    variant="standard"
                    value={section.description}
                    onChange={handleChange}
                    fullWidth
                  />
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
      </div>
      <div className='flex justify-between w-full my-5'>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onSubmit} disabled={!formValues.name || !formValues.Country || !formValues.bannerURL || !formValues.heroURL}>Submit</Button>
      </div>
    </div>
  );
}