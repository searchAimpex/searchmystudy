import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useCreateBannerMutation, useServiceCreateMutation } from '../../../slices/adminApiSlice';
import { AddBanner } from '../../../slices/bannerSlice';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch } from 'react-redux';
import { app } from '../../../firebase'; // Adjust the import path accordingly
import { toast } from 'react-toastify';
import { AddService } from '../../../slices/serviceSlice';

const storage = getStorage(app);

function CreateServicePop({ open, handleClose }){
  const [formValues, setFormValues] = useState({
    title: '',
    banner: '',
    heading: '',
    card: {
      title: '',
      cardImage: '',
      shortDescription: ''
    },
    sectionOne: {
      heroOne: '',
      content: ''
    },
    sectionTwo: {
      heroTwo: '',
      content: ''
    },
    sectionThree: {
      heroThree: '',
      content: ''
    },
    elegiblity: {
      title: '',
      pointerOne: '',
      pointerTwo: '',
      pointerThree: '',
      pointerFour: '',
      pointerFive: '',
      pointerSix: '',
      pointerSeven: ''
    }
  });
  const [ServiceCreate, { isSuccess }] = useServiceCreateMutation();
  const dispatch = useDispatch();

  const handleChange = async (event) => {
    const { name, value, type, files } = event.target;
    const [section, field] = name.split('.');

    if (type === 'file') {
      const file = files[0];
      if (file) {
        const imageURL = await uploadImage(file);
        if (field) {
          setFormValues((prevValues) => ({
            ...prevValues,
            [section]: {
              ...prevValues[section],
              [field]: imageURL
            }
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
          [section]: {
            ...prevValues[section],
            [field]: value
          }
        }));
      } else {
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: value
        }));
      }
    }
  };

  console.log("form value", formValues);

  const uploadImage = async (file) => {
    const storageRef = ref(storage, `services/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const onSubmit = async () => {
    const res = await ServiceCreate(formValues).unwrap();
    console.log("response", res);
    dispatch(AddService({ ...res }));
    handleClose(); // Close the dialog after submission
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Service Added Successfully');
    }
  }, [isSuccess]);

  return (
    <Dialog   fullWidth='xl' open={open} onClose={handleClose}>
      <DialogTitle className='text-white bg-custom-primary font-bold'>Add Service</DialogTitle>
      <DialogContent>
        <div className='py-2'>
          <DialogContentText>You can add a service.</DialogContentText>
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
            id="title"
            name="title"
            label="Title"
            variant="standard"
            value={formValues.title}
            onChange={handleChange}
            className="mb-2"
          />
          <TextField
            id="banner"
            name="banner"
            type="file"
            variant="standard"
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            className="mb-2"
            label="Image"

          />
          <TextField
            id="heading"
            name="heading"
            label="Heading"
            variant="standard"
            value={formValues.heading}
            onChange={handleChange}
            className="mb-2"
          />
          
          {/* Card Section */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Card</Typography>
            </AccordionSummary>
            <AccordionDetails className='flex flex-col gap-6'>
              <TextField
                id="cardTitle"
                name="card.title"
                label="Card Title"
                variant="standard"
                value={formValues.card.title}
                onChange={handleChange}
                className="mb-2"
              />
              <TextField
                id="cardImage"
                name="card.cardImage"
                type="file"
                variant="standard"
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                className='mb-2'
                label="Image"
              />
              <TextField
                id="cardShortDescription"
                name="card.shortDescription"
                label="Card Short Description"
                variant="standard"
                value={formValues.card.shortDescription}
                onChange={handleChange}
                className="mb-2"
              />
            </AccordionDetails>
          </Accordion>

          {/* Section One */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Section One</Typography>
            </AccordionSummary>
            <AccordionDetails className='flex flex-col gap-6'>
              <TextField
                id="sectionOneHero"
                name="sectionOne.heroOne"
                variant="standard"
                onChange={handleChange}
                className="mb-2"
                type="file"
                label="Image"
              />
              <TextField
                id="sectionOneContent"
                name="sectionOne.content"
                label="Section One Content"
                variant="standard"
                multiline
                rows={4}
                value={formValues.sectionOne.content}
                onChange={handleChange}
                className="mb-2"
              />
            </AccordionDetails>
          </Accordion>

          {/* Section Two */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Section Two</Typography>
            </AccordionSummary>
            <AccordionDetails className='flex flex-col gap-6'>
              <TextField
                id="sectionTwoHero"
                name="sectionTwo.heroTwo"
                variant="standard"
                onChange={handleChange}
                className="mb-2"
                type="file"
                label="Image"
              />
              <TextField
                id="sectionTwoContent"
                name="sectionTwo.content"
                label="Section Two Content"
                variant="standard"
                multiline
                rows={4}
                value={formValues.sectionTwo.content}
                onChange={handleChange}
                className="mb-2"
              />
            </AccordionDetails>
          </Accordion>

          {/* Section Three */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Section Three</Typography>
            </AccordionSummary>
            <AccordionDetails className='flex flex-col gap-6'>
              <TextField
                id="sectionThreeHero"
                name="sectionThree.heroThree"
                variant="standard"
                onChange={handleChange}
                className="mb-2"
                type="file"
                label="Image"
              />
              <TextField
                id="sectionThreeContent"
                name="sectionThree.content"
                label="Section Three Content"
                variant="standard"
                multiline
                rows={4}
                value={formValues.sectionThree.content}
                onChange={handleChange}
                className="mb-2"
              />
            </AccordionDetails>
          </Accordion>

          {/* Elegibility */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Elegibility</Typography>
            </AccordionSummary>
            <AccordionDetails className='flex flex-col gap-6'>
              <TextField
                id="elegibilityTitle"
                name="elegiblity.title"
                label="Elegibility Title"
                variant="standard"
                onChange={handleChange}
                className="mb-2"
              />
              {Array.from({ length: 7 }, (_, i) => (
                <TextField
                  key={`pointer${i + 1}`}
                  id={`pointer${i + 1}`}
                  name={`elegiblity.pointer${i + 1}`}
                  label={`Pointer ${i + 1}`}
                  variant="standard"
                  value={formValues.elegiblity[`pointer${i + 1}`]}
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

export default CreateServicePop;
