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
  const [formValues, setFormValues] = useState({
    name: '',
    bannerURL: '',
    flagURL: '',
    description: '',
    sections: [
      { title: '', description: '', url: '' }
    ],
    eligiblity: ['', '', '', '', '', '', ''],
  });

  const [createCountry, { isSuccess }] = useCreateCountryMutation();
  const dispatch = useDispatch();

  const handleChange = async (event) => {
    const { name, value, type, files } = event.target;
    const [section, index, field] = name.split('.');

    if (type === 'file') {
      const file = files[0];
      if (file) {
        const imageURL = await uploadImage(file);
        if (field) {
          setFormValues((prevValues) => ({
            ...prevValues,
            [section]: [
              ...prevValues[section].slice(0, index),
              { ...prevValues[section][index], [field]: imageURL },
              ...prevValues[section].slice(Number(index) + 1)
            ]
          }));
        } else {
          setFormValues((prevValues) => ({
            ...prevValues,
            [name]: imageURL
          }));
        }
      }
    } else {
      if (field) {
        setFormValues((prevValues) => ({
          ...prevValues,
          [section]: [
            ...prevValues[section].slice(0, index),
            { ...prevValues[section][index], [field]: value },
            ...prevValues[section].slice(Number(index) + 1)
          ]
        }));
      } else {
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: value
        }));
      }
    }
  };

  const uploadImage = async (file) => {
    const storageRef = ref(storage, `countries/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const onSubmit = async () => {
    const res = await createCountry(formValues).unwrap();
    dispatch(AddCountry({ ...res }));
    handleClose();
  };

  const addSection = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      sections: [
        ...prevValues.sections,
        { title: '', description: '', url: '' }
      ]
    }));
  };

  const removeSection = (index) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      sections: prevValues.sections.filter((_, i) => i !== index)
    }));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Country Added Successfully');
    }
  }, [isSuccess]);

  return (
    <Dialog fullWidth='xl' open={open} onClose={handleClose}>
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
          <TextField
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

          {/* Eligiblity */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Eligiblity</Typography>
            </AccordionSummary>
            <AccordionDetails className='flex flex-col gap-6'>
              {formValues.eligiblity.map((pointer, index) => (
                <TextField
                  key={`pointer${index}`}
                  id={`pointer${index}`}
                  name={`eligiblity.${index}`}
                  label={`Pointer ${index + 1}`}
                  variant="standard"
                  value={pointer}
                  onChange={handleChange}
                  className="mb-2"
                />
              ))}
            </AccordionDetails>
          </Accordion>
        </Box>
      </DialogContent>
      <DialogActions>
        <div className='text-white bg-custom-primary px-10 py-2 font-bold flex flex-row w-full justify-between'>
          <button onClick={handleClose} className="bg-white text-custom-color rounded-xl p-2 cursor-pointer">Close</button>
          <button onClick={onSubmit} className="bg-white text-custom-color rounded-xl p-2 cursor-pointer">Submit</button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default CreateCountryPop;
