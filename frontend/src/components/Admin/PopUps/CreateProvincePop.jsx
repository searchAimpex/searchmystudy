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
  InputLabel
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase'; // Adjust the import path accordingly
import { useCreateProvinceMutation } from '../../../slices/adminApiSlice';
import { toast } from 'react-toastify';
import { AddProvince } from '../../../slices/provinceSlice';

const storage = getStorage(app);

export default function CreateProvincePop({ open, handleClose }) {
  const [formValues, setFormValues] = useState({
    name: '',
    bannerURL: '',
    heroURL: '',
    description: '',
    sections: [
      { title: '', description: '', url: '' }
    ],
    eligiblity: ['', '', '', '', '', '', ''],
    Country: ''
  });

  const [createProvince, { isSuccess }] = useCreateProvinceMutation();
  const dispatch = useDispatch();
  const { countries } = useSelector(state => state.country);

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
    const storageRef = ref(storage, `provinces/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const addSection = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      sections: [...prevValues.sections, { title: '', description: '', url: '' }]
    }));
  };

  const removeSection = (index) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      sections: prevValues.sections.filter((_, i) => i !== index)
    }));
  };

  const onSubmit = async () => {
    const res = await createProvince(formValues).unwrap();
    dispatch(AddProvince({ ...res }));
    handleClose();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Province Added Successfully');
    }
  }, [isSuccess]);

  return (
    <Dialog fullWidth='xl' open={open} onClose={handleClose}>
      <DialogTitle className='text-white bg-custom-primary font-bold'>Add Province</DialogTitle>
      <DialogContent>
        <div className='py-2'>
          <DialogContentText>You can add a province.</DialogContentText>
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
            id="heroURL"
            name="heroURL"
            type="file"
            variant="standard"
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            className="mb-2"
            label="Hero Image"
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
                <Button onClick={() => removeSection(index)} variant="contained" color="secondary">
                  Remove Section
                </Button>
              </AccordionDetails>
            </Accordion>
          ))}

          <Button onClick={addSection} variant="contained" color="primary">
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


          {/* Country */}
          <FormControl variant="standard" className="mb-2">
            <InputLabel id="country-label">Country</InputLabel>
            <Select
              labelId="country-label"
              id="Country"
              name="Country"
              value={formValues.Country}
              onChange={handleChange}
              label="Country"
            >
              {countries?.map((country) => (
                <MenuItem key={country} value={country?._id}>
                  {country?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <div className='text-white bg-custom-primary font-bold flex flex-row w-full justify-between'>
          <button onClick={handleClose} className="bg-white text-custom-color rounded-xl p-2 cursor-pointer">Close</button>
          <button onClick={onSubmit} className="bg-white text-custom-color rounded-xl p-2 cursor-pointer">Submit</button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
