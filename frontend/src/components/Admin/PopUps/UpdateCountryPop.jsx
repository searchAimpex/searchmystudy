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
  const [previewImages, setPreviewImages] = useState({
    banner: '',
    flag: '',
    sectionImages: [],
  });

  const [updateCountry, { isSuccess }] = useCountryStatusUpdateMutation();

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
      setPreviewImages({
        banner: countryData.bannerURL || '',
        flag: countryData.flagURL || '',
        sectionImages: countryData.sections.map((sec) => sec.url),
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
            setPreviewImages((prevImages) => ({
              ...prevImages,
              [name]: URL.createObjectURL(file),
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
    const isValid =
      formValues.name && formValues.description && !formErrors.bannerURL && !formErrors.flagURL;
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
    setPreviewImages((prev) => ({
      ...prev,
      sectionImages: prev.sectionImages.filter((_, i) => i !== index),
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
          />
          <span className='text-red-300 font-bold text-sm'>Image width should be w-1500px h-500px</span>
          {previewImages.banner && (
            <img src={previewImages.banner} alt="Banner Preview" className="w-full h-auto mt-2" />
          )}
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
                    <span className='text-red-300 font-bold text-sm'>Image width should be w-200px h-200px</span>

          {previewImages.flag && (
            <img src={previewImages.flag} alt="Flag Preview" className="w-32 h-32 mt-2" />
          )}

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
                {previewImages.sectionImages[index] && (
                  <img
                    src={previewImages.sectionImages[index]}
                    alt={`Section ${index + 1} Preview`}
                    className="w-32 h-32 mt-2"
                  />
                )}
                <Button variant="contained" color="error" onClick={() => removeSection(index)}>
                  Remove Section
                </Button>
              </AccordionDetails>
            </Accordion>
          ))}
          <Button variant="outlined" onClick={addSection} className="mt-2">
            Add Section
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          color="primary"
          disabled={!isSubmitEnabled}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateCountryPop;
