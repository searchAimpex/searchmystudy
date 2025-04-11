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
import TextEditor from '../TextEditor';

const storage = getStorage(app);

function CreateCountryPop({ open, onClose }) {
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
  const [sectionPreviews, setSectionPreviews] = useState([]);

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
      if (!file) return;
  
      // Sections Image Upload (e.g., sections.0.url)
      if (name.includes('sections') && name.includes('url')) {
        const isValid = await validateImage(file, 900, 500); // Minimum size for section image
        if (!isValid) {
          setFormErrors((prev) => ({
            ...prev,
            [name]: `Image must be at least 900px x 500px`,
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
    const storageRef = ref(storage, `countries/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
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
    const res = await createCountry(formValues).unwrap();
    dispatch(AddCountry({ ...res }));
    onClose();
  };

  const handleCancelled = (e) => {
    e.stopPropagation();
    onClose();
  };

  const addSection = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      sections: [...prevValues.sections, { title: '', description: '', url: '' }],
    }));
    setSectionPreviews([...sectionPreviews, '']);
  };

  const removeSection = (index) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      sections: prevValues.sections.filter((_, i) => i !== index),
    }));
    setSectionPreviews(sectionPreviews.filter((_, i) => i !== index));
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
    <Dialog fullWidth={true} open={open} onClose={onClose}>
      <DialogTitle className="text-white bg-custom-primary font-bold">Add Country</DialogTitle>
      <DialogContent>
        <div className="py-2">
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
          <span className="text-red-300 text-sm font-bold">Image size should be 1500px x 500px</span>
          {bannerPreview && (
            <img src={bannerPreview} alt="Banner Preview" className="mt-2 w-full h-40 object-cover rounded" />
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
          {flagPreview && (
            <img src={flagPreview} alt="Flag Preview" className="mt-2 w-32 h-32 object-cover rounded-full" />
          )}
          <TextField
            id="bullet"
            name="bullet"
            variant="standard"
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
           <p className="text-sm text-gray-500 text-right">
             {formValues.description.trim().split(/\s+/).filter(Boolean).length} / 400 words
           </p>
         

          {/* Sections */}
          {formValues.sections.map((section, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Section {index + 1}</Typography>
              </AccordionSummary>
              <AccordionDetails className="flex flex-col gap-6">
  <TextField
    id={`sectionTitle${index}`}
    name={`sections.${index}.title`}
    label="Title"
    variant="standard"
    value={section.title}
    onChange={handleChange}
    className="mb-2"
  />

  <TextEditor
    id={`sectionDescription${index}`}
    name={`sections.${index}.description`}
    label="Description"
    value={section.description}
    onChange={(val) =>
      handleChange({
        target: {
          name: `sections.${index}.description`,
          value: val,
        },
      })
    }
    className="mb-2"
  />

  <TextField
    id={`sectionURL${index}`}
    name={`sections.${index}.url`}
    type="file"
    variant="standard"
    onChange={(e) => handleChange(e, index, "sectionImage")}
    label="Section Image URL"
    className="mb-2"
    InputLabelProps={{ shrink: true }}
  />

  {sectionPreviews[index] && (
    <>
      <img
        src={sectionPreviews[index]}
        onLoad={(e) =>
          console.log(
            `Section ${index + 1} image size: ${e.target.naturalWidth}x${e.target.naturalHeight}`
          )
        }
        style={{ width: "900px", height: "500px", objectFit: "cover" }}
        alt={`Section ${index + 1} Image Preview`}
        className="mt-2 rounded"
      />
      <p style={{ color: "red" }}>Image size must be 900px x 500px</p>
    </>
  )}

  <Button
    onClick={() => removeSection(index)}
    color="error"
    className="mt-2"
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
                  id={`faqQuestion${index}`}
                  name={`faq.${index}.question`}
                  label="Question"
                  variant="standard"
                  value={faq.question}
                  onChange={handleChange}
                  className="mb-2"
                />
                <TextField
                  id={`faqAnswer${index}`}
                  name={`faq.${index}.answer`}
                  label="Answer"
                  variant="standard"
                  value={faq.answer}
                  onChange={handleChange}
                  className="mb-2"
                />
                <Button
                  onClick={() => removeFaq(index)}
                  color="error"
                  className="mt-2"
                  variant="outlined"
                >
                  Remove FAQ
                </Button>
              </AccordionDetails>
            </Accordion>
          ))}
          <Button
            onClick={addFaq}
            className="mt-2"
            color="primary"
            variant="outlined"
          >
            Add FAQ
          </Button>

          <DialogActions>
            <Button onClick={handleCancelled} color="primary">Cancel</Button>
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

export default CreateCountryPop;
