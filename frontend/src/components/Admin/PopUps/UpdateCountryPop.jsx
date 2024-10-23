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
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase'; // Adjust the import path accordingly
import { updateSecondCountry } from '../../../slices/secondCountrySlice'; // Assuming you have this action
import { toast } from 'react-toastify';
import { useCountryStatusUpdateMutation } from '../../../slices/adminApiSlice';

const storage = getStorage(app);

function UpdateCountryPop({ open, handleClose, countryData }) {
  const [formValues, setFormValues] = useState({
    name: '',
    bannerURL: '',
    bullet: '',
    flagURL: '',
    description: '',
    sections: [{ title: '', description: '', url: '' }],
    eligiblity: ['', '', '', '', '', '', ''],
    faq: [{ question: '', answer: '' }],
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const [updateCountry, { isSuccess }] = useCountryStatusUpdateMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (countryData) {
      // Pre-fill form with existing data
      setFormValues({
        name: countryData.name || '',
        bannerURL: countryData.bannerURL || '',
        bullet: countryData.bullet || '',
        flagURL: countryData.flagURL || '',
        description: countryData.description || '',
        sections: countryData.sections || [{ title: '', description: '', url: '' }],
        eligiblity: countryData.eligiblity || ['', '', '', '', '', '', ''],
        faq: countryData.faq || [{ question: '', answer: '' }],
      });
    }
  }, [countryData]);

  const handleChange = async (event) => {
    const { name, value, type, files } = event.target;
    const [section, index, field] = name.split('.');

    if (type === 'file') {
      const file = files[0];
      if (file) {
        const fileType = name === 'bannerURL' ? { width: 1500, height: 500 } : { width: 200, height: 200 };
        const isValid = await validateImage(file, fileType.width, fileType.height);
        if (!isValid) {
          setFormErrors((prev) => ({
            ...prev,
            [name]: `Image must be ${fileType.width}x${fileType.height} pixels`,
          }));
        } else {
          setFormErrors((prev) => ({ ...prev, [name]: '' }));
          const imageURL = await uploadImage(file);
          if (field) {
            setFormValues((prevValues) => ({
              ...prevValues,
              [section]: [
                ...prevValues[section].slice(0, index),
                { ...prevValues[section][index], [field]: imageURL },
                ...prevValues[section].slice(Number(index) + 1),
              ],
            }));
          } else {
            setFormValues((prevValues) => ({
              ...prevValues,
              [name]: imageURL,
            }));
          }
        }
      }
    } else {
      if (field) {
        setFormValues((prevValues) => ({
          ...prevValues,
          [section]: [
            ...prevValues[section].slice(0, index),
            { ...prevValues[section][index], [field]: value },
            ...prevValues[section].slice(Number(index) + 1),
          ],
        }));
      } else {
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      }
    }
    checkFormValidity();
  };

  const uploadImage = async (file) => {
    const storageRef = ref(storage, `countries/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const checkFormValidity = () => {
    const isValid = formValues.name && formValues.description && !formErrors.bannerURL && !formErrors.flagURL;
    setIsSubmitEnabled(isValid);
  };

  const onSubmit = async () => {
    const res = await updateCountry({ id: countryData._id, ...formValues }).unwrap();
    handleClose();
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

  const addFaq = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      faq: [...prevValues.faq, { question: '', answer: '' }],
    }));
  };

  const removeFaq = (index) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      faq: prevValues.faq.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Country Updated Successfully');
    }
  }, [isSuccess]);

  return (
    <Dialog fullWidth='xl' open={open} onClose={handleClose}>
      <DialogTitle className='text-white bg-custom-primary font-bold'>Update Country</DialogTitle>
      <DialogContent>
        <div className='py-2'>
          <DialogContentText>Update the country details below.</DialogContentText>
        </div>
        <Box
          noValidate
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 'auto',
            width: 'fit-content',
          }}
          className="space-y-6 my-2"
        >
          {/* Existing Fields */}
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="standard"
            value={formValues.name}
            onChange={handleChange}
            className="mb-2"
            error={Boolean(formErrors.name)}
            helperText={formErrors.name || ''}
          />
          <TextField
            id="bannerURL"
            name="bannerURL"
            type="file"
            variant="standard"
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            className="mb-2"
            label="Banner Image"
            error={Boolean(formErrors.bannerURL)}
            helperText={formErrors.bannerURL || ''}
          />
          <TextField
            id="flagURL"
            name="flagURL"
            type="file"
            variant="standard"
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            className="mb-2"
            label="Flag Image"
            error={Boolean(formErrors.flagURL)}
            helperText={formErrors.flagURL || ''}
          />
          <TextField
            id="bullet"
            name="bullet"
            variant="standard"
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            className="mb-2"
            label="Bullet Point"
          />
          <TextField
            id="description"
            name="description"
            label="Description"
            variant="standard"
            value={formValues.description}
            onChange={handleChange}
            className="mb-2"
            error={Boolean(formErrors.description)}
            helperText={formErrors.description || ''}
          />

          {/* Sections */}
          {formValues.sections.map((section, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Section {index + 1}</Typography>
              </AccordionSummary>
              <AccordionDetails className='flex flex-col gap-6'>
                <TextField
                  id={`sectionTitle${index}`}
                  name={`sections.${index}.title`}
                  label="Title"
                  variant="standard"
                  value={section.title}
                  onChange={handleChange}
                  className="mb-2"
                />
                <TextField
                  id={`sectionDescription${index}`}
                  name={`sections.${index}.description`}
                  label="Description"
                  variant="standard"
                  value={section.description}
                  onChange={handleChange}
                  className="mb-2"
                />
                <TextField
                  id={`sectionUrl${index}`}
                  name={`sections.${index}.url`}
                  type="file"
                  variant="standard"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  className="mb-2"
                  label="Image"
                />
                <Button variant="contained" color="secondary" onClick={() => removeSection(index)}>
                  Remove Section
                </Button>
              </AccordionDetails>
            </Accordion>
          ))}
          <Button variant="contained" color="primary" onClick={addSection}>
            Add Section
          </Button>

          {/* Submit Button */}
          <DialogActions>
            <Button variant="contained" color="primary" disabled={!isSubmitEnabled} onClick={onSubmit}>
              Update Country
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateCountryPop;
