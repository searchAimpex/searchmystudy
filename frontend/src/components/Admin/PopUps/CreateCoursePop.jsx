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
  IconButton,
  Switch,
  FormControlLabel,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase'; // Adjust the import path accordingly
import { useCreateCourseMutation, useFetchProvinceMutation, useFetchUniversityMutation } from '../../../slices/adminApiSlice'; // Adjust the slice accordingly
import { toast } from 'react-toastify';
import { FetchProvinces } from '../../../slices/provinceSlice';
import { FetchUniversitys } from '../../../slices/universitySlice';
import { AddCourse } from '../../../slices/courseSlice';
import { NearMe } from '@mui/icons-material';

const storage = getStorage(app);
const level = ['High School', 'UG Diploma/Cerificate/Associate Degree', 'UG', 'PG Diploma', 'PG', 'UG+PG(Accelerated)Degree', 'PhD', 'Foundation', 'Short Term Program', 'Pathway Program', 'Twiming Program(UG)', 'Twiming Program(PG)', 'Online Programe/Distance Learning']

const categories = [
  'Arts',
  'Accounts',
  'Finance',
  'Marketing',
  'Science',
  'Medical',
  'Computers',
  'Engineering',
  'Law',
  'Education',
  'Social Sciences',
  'Business Administration',
  'Psychology',
  'Economics',
  'Architecture',
  'Environmental Science',
  'Nursing',
  'Hospitality Management',
  'Media and Communication',
  'Information Technology',
  'Pharmacy',
  'Agriculture',
  'Design',
  'Public Health',
  'Mathematics',
  'Data Science',
  'Artificial Intelligence'
]

export default function CreateCoursePop({ open, handleClose }) {
  const dispatch = useDispatch();
  const { provinces } = useSelector(state => state.province);
  const { university } = useSelector(state => state.university); // Assume universities are fetched and stored in the state

  const [fetchProvinces] = useFetchProvinceMutation();
  const [FetchUniversity] = useFetchUniversityMutation();

  const [createCourse, { isSuccess }] = useCreateCourseMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await FetchUniversity().unwrap();
        dispatch(FetchUniversitys(result));
      } catch (error) {
        console.error('Failed to fetch universities:', error);
      }
    };
    fetchData();
  }, [FetchUniversity, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchProvinces().unwrap();
        dispatch(FetchProvinces(result));
      } catch (error) {
        console.error('Failed to fetch provinces:', error);
      }
    };
    fetchData();
  }, [fetchProvinces, dispatch]);

  const [formValues, setFormValues] = useState({
    ProgramName: '',
    University: '',
    WebsiteURL: '',
    Location: '',
    Duration: '',
    Category: '',
    Fees: 0,
    Intake: [{ status: true, date: '', expiresAt: new Date() }],
    Scholarships: false,
    ProgramLevel: '',
    LanguageRequirements: {
      PTE: { status: false, description: '', minRequirement: '' },
      TOFFL: { status: false, description: '', minRequirement: '' },
      IELTS: { status: false, description: '', minRequirement: '' },
      DET: { status: false, description: '', minRequirement: '' }
    },
    StandardizeRequirement: {
      SAT: { status: false, description: '', minRequirement: '' },
      ACT: { status: false, description: '', minRequirement: '' },
      GRE: { status: false, description: '', minRequirement: '' },
      GMAT: { status: false, description: '', minRequirement: '' }
    },
    broucherURL: ""
  });
  const handlecancell = (e) => {
    e.stopPropagation();
    handleClose();
  }
  const handleChange = async (event) => {
    const { name, value, type, files } = event.target;
    console.log("value", value, name, type, files)
    const [section, subSection, field] = name.split('.');

    if (type === 'file') {
      const file = files[0];
      if (file) {
        const imageURL = await uploadImage(file);
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: imageURL
        }));
      }
    } else {
      if (subSection) {
        setFormValues((prevValues) => ({
          ...prevValues,
          [section]: {
            ...prevValues[section],
            [subSection]: { ...prevValues[section][subSection], [field]: value }
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

  const uploadImage = async (file) => {
    const storageRef = ref(storage, `courses/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const addIntake = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      Intake: [...prevValues.Intake, { status: true, date: '' }]
    }));
  };

  const removeIntake = (index) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      Intake: prevValues.Intake.filter((_, i) => i !== index)
    }));
  };

  const handleRequirementChange = (section, key, field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [section]: {
        ...prevValues[section],
        [key]: {
          ...prevValues[section][key],
          [field]: value
        }
      }
    }));
  };

  const handleStatusChange = (section, key, field, checked) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [section]: {
        ...prevValues[section],
        [key]: {
          ...prevValues[section][key],
          [field]: checked
        }
      }
    }));
  };

  const onSubmit = async () => {
    try {
      const res = await createCourse(formValues).unwrap();
      dispatch(AddCourse({ ...res }));
      handleClose();
    } catch (error) {
      console.error('Failed to create course:', error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Course Added Successfully');
    }
  }, [isSuccess]);

  return (
    <Dialog maxWidth='xl' fullWidth={true} open={open} onClose={handleClose}>
      <DialogTitle className='text-white bg-custom-primary font-bold'>Add Course</DialogTitle>
      <DialogContent>
        <div className='py-2'>
          <DialogContentText>You can add a course.</DialogContentText>
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
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <TextField
              id="ProgramName"
              name="ProgramName"
              label="Program Name"
              variant="standard"
              value={formValues.ProgramName}
              onChange={handleChange}
              className="mb-2"
              sx={{ flex: '1 1 30%' }}
            />
            <FormControl variant="standard" className="mb-2" sx={{ flex: '1 1 30%' }}>
              <InputLabel id="University-label">University</InputLabel>
              <Select
                labelId="University-label"
                id="University"
                name="University"
                value={formValues.University}
                onChange={handleChange}
                label="University"
              >
                {university?.map((uni) => (
                  <MenuItem key={uni?.id} value={uni?._id}>
                    {uni?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="WebsiteURL"
              name="WebsiteURL"
              label="Website URL"
              variant="standard"
              value={formValues.WebsiteURL}
              onChange={handleChange}
              className="mb-2"
              sx={{ flex: '1 1 30%' }}
            />
            <TextField
              id="Location"
              name="Location"
              label="Location"
              variant="standard"
              value={formValues.Location}
              onChange={handleChange}
              className="mb-2"
              sx={{ flex: '1 1 30%' }}
            />
            <TextField
              id="Duration"
              name="Duration"
              label="Duration"
              variant="standard"
              value={formValues.Duration}
              onChange={handleChange}
              className="mb-2"
              sx={{ flex: '1 1 30%' }}
            />
            <TextField
              id="Fees"
              name="Fees"
              label="Fees in Indian Rupee"
              variant="standard"
              value={formValues.Fees}
              onChange={handleChange}
              className="mb-2"
              sx={{ flex: '1 1 30%' }}
            />
            <TextField
              id="broucherURL"
              type='file'
              name="broucherURL"
              label="Broucher URL"
              variant="standard"
              onChange={handleChange}
              className="mb-2"
              sx={{ flex: '1 1 30%' }}
            />
            <FormControl variant="standard" className="mb-2" sx={{ flex: '1 1 30%' }}>
              <InputLabel id="Category-label">Category</InputLabel>
              <Select
                labelId="Category-label"
                id="Category"
                name="Category"
                value={formValues.Category}
                onChange={handleChange}
                label="Category"
              >{
                  categories.map((item) => {
                    return (
                      <MenuItem value={item}>{item}</MenuItem>

                    )
                  })}
              </Select>
            </FormControl>
          </Box>

          {/* Intake */}
          {Array.isArray(formValues?.Intake) && formValues?.Intake?.map((intake, index) => (
            <Box key={index} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {/* <FormControlLabel
                control={
                  <Switch
                    checked={intake.status}
                    onChange={(e) => {
                      const updatedIntake = [...formValues.Intake];
                      updatedIntake[index].status = e.target.checked;
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        Intake: updatedIntake
                      }));
                    }}
                  />
                }
                label="Status"
              /> */}
              <div className="w-full sm:w-1/2 md:w-1/3 px-2">
                <label
                  htmlFor={`Intake-${index}-date`}
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Start Date
                </label>
                <TextField
                  id={`Intake-${index}-date`}
                  type="date"
                  variant="standard"
                  fullWidth
                  value={intake.date}
                  onChange={(e) => {
                    const updatedIntake = [...formValues.Intake];
                    updatedIntake[index].date = e.target.value;
                    setFormValues((prevValues) => ({
                      ...prevValues,
                      Intake: updatedIntake
                    }));
                  }}
                  InputLabelProps={{ shrink: true }} // Optional: to avoid label overlap
                />
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3 px-2">
                <label
                  htmlFor={`Intake-${index}-expiresAt`}
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Expire Date
                </label>
                <TextField
                  id={`Intake-${index}-expiresAt`}
                  type="date"
                  variant="standard"
                  fullWidth
                  value={intake.expiresAt}
                  onChange={(e) => {
                    const updatedIntake = [...formValues.Intake];
                    updatedIntake[index].expiresAt = e.target.value;
                    setFormValues((prevValues) => ({
                      ...prevValues,
                      Intake: updatedIntake
                    }));
                  }}
                  InputLabelProps={{ shrink: true }} // Optional to prevent overlap
                />
              </div>

              <IconButton color="primary" onClick={addIntake}>
                <AddIcon />
              </IconButton>
              {index > 0 && (
                <IconButton color="secondary" onClick={() => removeIntake(index)}>
                  <RemoveIcon />
                </IconButton>
              )}
            </Box>
          ))}

          <FormControl variant="standard" sx={{ flex: '1 1 30%' }}>
            <InputLabel id="ProgramLevel-label">Program Level</InputLabel>
            <Select
              labelId="ProgramLevel-label"
              id="ProgramLevel"
              name="ProgramLevel"
              value={formValues.ProgramLevel}
              onChange={handleChange}
              label="Program Level"
            >
              {
                level.map((item) => {
                  return (
                    <MenuItem value={item}>{item}</MenuItem>
                  )
                })
              }


            </Select>
          </FormControl>

          {/* Language Requirements */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="language-requirements-content"
              id="language-requirements-header"
            >
              <Typography>Language Requirements</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {['PTE', 'TOFFL', 'IELTS', 'DET'].map((test) => (
                  <Accordion key={test}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>{test}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formValues.LanguageRequirements[test].status}
                            onChange={(e) =>
                              handleStatusChange('LanguageRequirements', test, 'status', e.target.checked)
                            }
                          />
                        }
                        label="Status"
                      />
                      <TextField
                        label={`${test} Description`}
                        variant="standard"
                        value={formValues.LanguageRequirements[test].description}
                        onChange={(e) =>
                          handleRequirementChange('LanguageRequirements', test, 'description', e.target.value)
                        }
                        className="mb-2"
                        sx={{ flex: '1 1 45%' }}
                      />
                      <TextField
                        label={`${test} Min Requirement`}
                        variant="standard"
                        value={formValues.LanguageRequirements[test].minRequirement}
                        onChange={(e) =>
                          handleRequirementChange('LanguageRequirements', test, 'minRequirement', e.target.value)
                        }
                        className="mb-2"
                        sx={{ flex: '1 1 45%' }}
                      />
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Standardized Requirements */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="standardized-requirements-content"
              id="standardized-requirements-header"
            >
              <Typography>Standardized Requirements</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {['SAT', 'ACT', 'GRE', 'GMAT'].map((test) => (
                  <Accordion key={test}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>{test}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formValues.StandardizeRequirement[test].status}
                            onChange={(e) =>
                              handleStatusChange('StandardizeRequirement', test, 'status', e.target.checked)
                            }
                          />
                        }
                        label="Status"
                      />
                      <TextField
                        label={`${test} Description`}
                        variant="standard"
                        value={formValues.StandardizeRequirement[test].description}
                        onChange={(e) =>
                          handleRequirementChange('StandardizeRequirement', test, 'description', e.target.value)
                        }
                        className="mb-2"
                        sx={{ flex: '1 1 45%' }}
                      />
                      <TextField
                        label={`${test} Min Requirement`}
                        variant="standard"
                        value={formValues.StandardizeRequirement[test].minRequirement}
                        onChange={(e) =>
                          handleRequirementChange('StandardizeRequirement', test, 'minRequirement', e.target.value)
                        }
                        className="mb-2"
                        sx={{ flex: '1 1 45%' }}
                      />
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handlecancell} className='text-custom-primary'>
          Cancel
        </Button>
        <Button onClick={onSubmit} className='text-custom-primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
