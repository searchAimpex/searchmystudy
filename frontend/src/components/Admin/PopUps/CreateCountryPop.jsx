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
import { AddCountry } from '../../../slices/countrySlice'; // Assuming you have this slice
import { useCreateCountryMutation } from '../../../slices/adminApiSlice';
import { toast } from 'react-toastify';

const storage = getStorage(app);

function CreateCountryPop({ open, handleClose }) {
  console.log("open",open)
  console.log("close",typeof handleClose)
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

  const [bannerPreview, setBannerPreview] = useState(null);
  const [flagPreview, setFlagPreview] = useState(null);

  const [createCountry, { isSuccess }] = useCreateCountryMutation();
  const dispatch = useDispatch();

  const validateImage = async (file, requiredWidth, requiredHeight) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width >= requiredWidth && img.height >= requiredHeight) {
          resolve(true);
        } else {
          resolve(false);
        }
      };
    });
  };


  const handleChange = async (event) => {
    const { name, value, type, files } = event.target;

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
          setFormValues((prevValues) => ({
            ...prevValues,
            [name]: imageURL,
          }));

          // Set image preview
          if (name === 'bannerURL') {
            setBannerPreview(URL.createObjectURL(file));
          } else if (name === 'flagURL') {
            setFlagPreview(URL.createObjectURL(file));
          }
        }
      }
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
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
    const res = await createCountry(formValues).unwrap();
    dispatch(AddCountry({ ...res }));
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
      toast.success('Country Added Successfully');
    }
  }, [isSuccess]);
  
  return (
    <Dialog fullWidth='5xl' open={open} onClose={handleClose}>
      <DialogTitle className='text-white bg-custom-primary font-bold'>Add Country</DialogTitle>
      <DialogContent>
        <div className='py-2'>
          <DialogContentText>You can add a country.</DialogContentText>
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
           {bannerPreview && <img src={bannerPreview} alt="Banner Preview" className="mt-2 w-full h-40 object-cover rounded" />}
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
             {flagPreview && <img src={flagPreview} alt="Flag Preview" className="mt-2 w-32 h-32 object-cover rounded-full" />}
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
                <Button variant="contained" color="error" onClick={() => removeSection(index)}>
                  Remove Section
                </Button>
              </AccordionDetails>
            </Accordion>
          ))}
          <Button variant="contained" color="primary" onClick={addSection}>
            Add Section
          </Button>

          {/* Eligibility */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Eligibility</Typography>
            </AccordionSummary>
            <AccordionDetails className='flex flex-col gap-6'>
              {formValues.eligiblity.map((value, index) => (
                <TextField
                  key={index}
                  id={`eligibility${index}`}
                  name={`eligiblity.${index}`}
                  variant="standard"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  className="mb-2"
                  label={`Eligibility ${index + 1}`}
                />
              ))}
            </AccordionDetails>
          </Accordion>

          {/* FAQs */}
          {formValues.faq.map((faq, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>FAQ {index + 1}</Typography>
              </AccordionSummary>
              <AccordionDetails className='flex flex-col gap-6'>
                <TextField
                  id={`question${index}`}
                  name={`faq.${index}.question`}
                  label="Question"
                  variant="standard"
                  value={faq.question}
                  onChange={handleChange}
                  className="mb-2"
                />
                <TextField
                  id={`answer${index}`}
                  name={`faq.${index}.answer`}
                  label="Answer"
                  variant="standard"
                  value={faq.answer}
                  onChange={handleChange}
                  className="mb-2"
                />
                <Button variant="contained" color="error" onClick={() => removeFaq(index)}>
                  Remove FAQ
                </Button>
              </AccordionDetails>
            </Accordion>
          ))}
          <Button variant="contained" color="primary" onClick={addFaq}>
            Add FAQ
          </Button>
        </Box>
      </DialogContent>
      <div>
        <Button variant="contained" onClick={onSubmit} disabled={!isSubmitEnabled}>
          Submit
        </Button>
        <Button onClick={()=> handleClose()}>Close</Button>
      </div>
    </Dialog>
  );
}

export default CreateCountryPop;
