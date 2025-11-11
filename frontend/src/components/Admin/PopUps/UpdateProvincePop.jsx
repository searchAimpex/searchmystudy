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
import TextEditor from '../TextEditor';

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

  const [updateProvince] = useUpdateProvinceMutation();
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

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name.startsWith('sections')) {
      const [_, indexStr, field] = name.split('.');
      const index = parseInt(indexStr, 10);

      setFormValues((prevValues) => {
        const updatedSections = [...prevValues.sections]; // Shallow copy of the sections array
        updatedSections[index] = { ...updatedSections[index] }; // Create a new copy of the section object
        updatedSections[index][field] = value; // Update the copied object

        return { ...prevValues, sections: updatedSections }; // Set the updated array in state
      });
    } else {
      setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    }
  };

  const handleFileChange = async (event, index) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const storageRef = ref(storage, `sections/${file.name}`);
        await uploadBytes(storageRef, file);
        const fileURL = await getDownloadURL(storageRef);

        setFormValues((prevValues) => {
          const updatedSections = [...prevValues.sections];
          updatedSections[index].url = fileURL;
          return { ...prevValues, sections: updatedSections };
        });

        toast.success('File uploaded successfully.');
      } catch (error) {
        toast.error('Failed to upload file.');
      }
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

  const handleImageUpload = async (event, field) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const imageUrl = await uploadImage(file);
        setFormValues((prevValues) => ({
          ...prevValues,
          [field]: imageUrl,
        }));
        toast.success('Image uploaded successfully.');
      } catch (error) {
        toast.error('Failed to upload image.');
      }
    }
  };

  const onSubmit = async () => {
    try {
      const data = { id: provinceData._id, raw:formValues };
      await updateProvince(data).unwrap();
      toast.success('Province Updated Successfully');
      handleClose();
    } catch (error) {
      toast.error(error.message || 'Failed to update province');
    }
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle className="text-white bg-custom-primary font-bold">Update Province</DialogTitle>
      <DialogContent>
        <DialogContentText>You can update the province details here.</DialogContentText>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }} className="space-y-6 my-2">
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="standard"
            value={formValues.name}
            onChange={handleChange}
          />
          <TextField
            id="bannerURL"
            name="bannerURL"
            type="file"
            variant="standard"
            onChange={(e) => handleImageUpload(e, 'bannerURL')}
          />
          {formValues.bannerURL && <img src={formValues.bannerURL} alt="Banner" style={{ width: '100%', maxHeight: '200px' }} />}
          
          <TextField
            id="heroURL"
            name="heroURL"
            type="file"
            variant="standard"
            onChange={(e) => handleImageUpload(e, 'heroURL')}
          />
          {formValues.heroURL && <img src={formValues.heroURL} alt="Hero" style={{ width: '100%', maxHeight: '200px' }} />}
          
          <TextEditor
            id="description"
            name="description"
            label="Description"
            variant="standard"
            value={formValues.description}
            onChange={handleChange}
          />

          {formValues.sections.map((section, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Section {index + 1}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex flex-col">
                  <TextField
                    name={`sections.${index}.title`}
                    label="Title"
                    variant="standard"
                    value={section.title}
                    onChange={handleChange}
                  />
                  <TextEditor
                    name={`sections.${index}.description`}
                    label="Description"
                    variant="standard"
                    value={section.description}
                    onChange={handleChange}
                  />
                </div>
                <input type="file" onChange={(e) => handleFileChange(e, index)} style={{ marginTop: '1rem' }} />
                {section.url && <img src={section.url} alt={`Section ${index + 1}`} />}
                <Button onClick={() => removeSection(index)} color="error">
                  Remove Section
                </Button>
              </AccordionDetails>
            </Accordion>
          ))}
          <Button onClick={addSection} variant="contained">
            Add Section
          </Button>

      
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onSubmit}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}
