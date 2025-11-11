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
import { app } from '../../../firebase';
import { useCountryStatusUpdateMutation } from '../../../slices/adminApiSlice';
import { toast } from 'react-toastify';
import TextEditor from '../TextEditor';

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
  const dispatch = useDispatch();
  // console.log("my form values",formValues)


  useEffect(() => {
    if (countryData) {
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
        sectionImages: countryData.sections?.map(sec => sec.url) || [],
      });
    }
  }, [countryData]);

  
  // console.log("fix.===>",countryData)
  const validateImage = async (file, requiredWidth, requiredHeight) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        resolve(img.width >= requiredWidth && img.height >= requiredHeight);
      };
    });
  };

  const uploadImage = async (file) => {
    const storageRef = ref(storage, `countries/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const handleChange = async (event) => {
    const { name, value, type, files } = event.target;

    if (type === 'file') {
      const file = files[0];
      if (file) {
        if (name.includes('sections') && name.includes('url')) {
          const [section, index] = name.split('.');
          const isValid = await validateImage(file, 300, 300);
          
          if (!isValid) {
            setFormErrors(prev => ({
              ...prev,
              [name]: 'Image must be at least 300x300px'
            }));
            return;
          }

          const imageURL = await uploadImage(file);
          const updatedSections = [...formValues.sections];
          updatedSections[index] = { ...updatedSections[index], url: imageURL };

          const updatedPreviews = [...previewImages.sectionImages];
          updatedPreviews[index] = URL.createObjectURL(file);

          setFormValues(prev => ({
            ...prev,
            sections: updatedSections
          }));
          setPreviewImages(prev => ({
            ...prev,
            sectionImages: updatedPreviews
          }));
        } else {
          const isValid = name === 'bannerURL' 
            ? await validateImage(file, 1500, 500)
            : await validateImage(file, 200, 200);

          if (!isValid) {
            setFormErrors(prev => ({
              ...prev,
              [name]: `Image must be at least ${name === 'bannerURL' ? '1500x500px' : '200x200px'}`
            }));
            return;
          }

          const imageURL = await uploadImage(file);
          setFormValues(prev => ({
            ...prev,
            [name]: imageURL
          }));
          setPreviewImages(prev => ({
            ...prev,
            [name === 'bannerURL' ? 'banner' : 'flag']: URL.createObjectURL(file)
          }));
        }
      }
    } else if (name.includes('sections')) {
      const [section, index, field] = name.split('.');
      const updatedSections = [...formValues.sections];
      updatedSections[index] = { ...updatedSections[index], [field]: value };
      setFormValues(prev => ({
        ...prev,
        sections: updatedSections
      }));
    } else if (name.includes('faq')) {
      const [type, index, field] = name.split('.');
      const updatedFaq = [...formValues.faq];
      updatedFaq[index] = { ...updatedFaq[index], [field]: value };
      setFormValues(prev => ({
        ...prev,
        faq: updatedFaq
      }));
    } else if (name.includes('eligiblity')) {
      const [type, index] = name.split('.');
      const updatedEligiblity = [...formValues.eligiblity];
      updatedEligiblity[index] = value;
      setFormValues(prev => ({
        ...prev,
        eligiblity: updatedEligiblity
      }));
    } else {
      setFormValues(prev => ({
        ...prev,
        [name]: value
      }));
    }
    checkFormValidity();
  };

  const checkFormValidity = () => {
    const isValid =
      formValues.name &&
      formValues.description &&
      !formErrors.bannerURL &&
      !formErrors.flagURL;
    setIsSubmitEnabled(isValid);
  };

  const onSubmit = async () => {
    const data = { id:countryData._id,raw:formValues} 
    const res = await updateCountry(data).unwrap();
    // console.log(res)
    handleClose();
  };

  const addSection = () => {
    setFormValues(prev => ({
      ...prev,
      sections: [...prev.sections, { title: '', description: '', url: '' }],
    }));
    setPreviewImages(prev => ({
      ...prev,
      sectionImages: [...prev.sectionImages, ''],
    }));
  };

  const removeSection = (index) => {
    setFormValues(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }));
    setPreviewImages(prev => ({
      ...prev,
      sectionImages: prev.sectionImages.filter((_, i) => i !== index)
    }));
  };

  const addFAQ = () => {
    setFormValues(prev => ({
      ...prev,
      faq: [...prev.faq, { question: '', answer: '' }]
    }));
  };

  const removeFAQ = (index) => {
    setFormValues(prev => ({
      ...prev,
      faq: prev.faq.filter((_, i) => i !== index)
    }));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Country Updated Successfully');
      handleClose();
    }
  }, [isSuccess]);

  return (
    <Dialog fullWidth={true} open={open} onClose={handleClose}>
      <DialogTitle className="text-white bg-custom-primary font-bold">Update Country</DialogTitle>
      <DialogContent>
        <div className="py-2">
          <DialogContentText>You can update the country details.</DialogContentText>
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
          <span className="text-red-300 text-sm font-bold">Image size should be 1500px x 500px</span>
          {previewImages.banner && (
            <img src={previewImages.banner} alt="Banner Preview" className="mt-2 w-full h-40 object-cover rounded" />
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
            error={Boolean(formErrors.flagURL)}
            helperText={formErrors.flagURL || ''}
          />
          <span className="text-red-300 text-sm font-bold">Image size should be 200px x 200px</span>
          {previewImages.flag && (
            <img src={previewImages.flag} alt="Flag Preview" className="mt-2 w-32 h-32 object-cover rounded-full" />
          )}
          <TextField
            id="bullet"
            name="bullet"
            variant="standard"
            value={formValues.bullet}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            className="mb-2"
            label="Bullet Point"
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

          {/* Sections */}
          {formValues.sections.map((section, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Section {index + 1}</Typography>
              </AccordionSummary>
              <AccordionDetails className="flex flex-col gap-6">
                <TextField
                  name={`sections.${index}.title`}
                  label="Title"
                  value={section.title}
                  onChange={handleChange}
                  variant="standard"
                />
                <TextEditor
                  name={`sections.${index}.description`}
                  label="Description"
                  value={section.description}
                  onChange={handleChange}
                  variant="standard"
                  multiline
                />
                <TextField
                  name={`sections.${index}.url`}
                  type="file"
                  onChange={handleChange}
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                />
                {previewImages.sectionImages[index] && (
                  <img
                    src={previewImages.sectionImages[index]}
                    alt={`Section ${index + 1}`}
                    className="mt-2 w-full h-40 object-cover rounded"
                  />
                )}
                <p className='text-red-300 font-bold'>Image size should be 300px x 300px</p>
                <Button
                  onClick={() => removeSection(index)}
                  color="error"
                  variant="outlined"
                >
                  Remove Section
                </Button>
              </AccordionDetails>
            </Accordion>
          ))}
          <Button
            onClick={addSection}
            className="mt-2"
            color="primary"
            variant="outlined"
          >
            Add Section
          </Button>

          {/* FAQs */}
          {formValues.faq.map((faq, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>FAQ {index + 1}</Typography>
              </AccordionSummary>
              <AccordionDetails className="flex flex-col gap-6">
                <TextField
                  name={`faq.${index}.question`}
                  label="Question"
                  value={faq.question}
                  onChange={handleChange}
                  variant="standard"
                />
                <TextField
                  name={`faq.${index}.answer`}
                  label="Answer"
                  value={faq.answer}
                  onChange={handleChange}
                  variant="standard"
                />
                <Button
                  onClick={() => removeFAQ(index)}
                  color="error"
                  variant="outlined"
                >
                  Remove FAQ
                </Button>
              </AccordionDetails>
            </Accordion>
          ))}
          <Button
            onClick={addFAQ}
            className="mt-2"
            color="primary"
            variant="outlined"
          >
            Add FAQ
          </Button>

          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button
              onClick={onSubmit}
              color="primary"
              variant="contained"
              disabled={!isSubmitEnabled}
            >
              Submit
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateCountryPop;