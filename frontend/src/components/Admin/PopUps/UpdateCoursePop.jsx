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
import { useFetchProvinceMutation, useFetchUniversityMutation, useUpdateCourseOneMutation } from '../../../slices/adminApiSlice'; // Adjust the slice accordingly
import { toast } from 'react-toastify';
import { FetchProvinces } from '../../../slices/provinceSlice';
import { FetchUniversitys } from '../../../slices/universitySlice';

const storage = getStorage(app);
const levels = ['High School', 'UG Diploma/Certificate/Associate Degree', 'UG', 'PG Diploma', 'PG', 'UG+PG(Accelerated) Degree', 'PhD', 'Foundation', 'Short Term Program', 'Pathway Program', 'Twiming Program(UG)', 'Twiming Program(PG)', 'Online Program/Distance Learning'];

const categories = [
  'Arts', 'Accounts', 'Finance', 'Marketing', 'Science', 'Medical', 'Computers', 'Engineering', 'Law', 'Education', 'Social Sciences', 'Business Administration', 'Psychology', 'Economics', 'Architecture', 'Environmental Science', 'Nursing', 'Hospitality Management', 'Media and Communication', 'Information Technology', 'Pharmacy', 'Agriculture', 'Design', 'Public Health', 'Mathematics', 'Data Science', 'Artificial Intelligence',
];

export default function UpdateCoursePop({ open, handleClose, courseData }) {
  const dispatch = useDispatch();
  const { provinces } = useSelector(state => state.province);
  const { university } = useSelector(state => state.university);

  const [fetchProvinces] = useFetchProvinceMutation();
  const [fetchUniversity] = useFetchUniversityMutation();
  const [updateCourse, { isSuccess }] = useUpdateCourseOneMutation();

  // Fetch universities on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchUniversity().unwrap();
        dispatch(FetchUniversitys(result));
      } catch (error) {
        console.error('Failed to fetch universities:', error);
      }
    };
    fetchData();
  }, [fetchUniversity, dispatch]);

  // Fetch provinces on component mount
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

  // Initialize form values with course data
  const [formValues, setFormValues] = useState(() => ({
    ProgramName: courseData?.ProgramName || '',
    University: courseData?.University || '',
    WebsiteURL: courseData?.WebsiteURL || '',
    Location: courseData?.Location || '',
    Duration: courseData?.Duration || '',
    Category: courseData?.Category || '',
    Fees: courseData?.Fees || 0,
    Intake: courseData?.Intake || [{ status: true, date: '',expiresAt:'' }],
    Scholarships: courseData?.Scholarships || false,
    ProgramLevel: courseData?.ProgramLevel || '',
    LanguageRequirements: courseData?.LanguageRequirements || {
      PTE: { status: false, description: '', minRequirement: '' },
      TOFFL: { status: false, description: '', minRequirement: '' },
      IELTS: { status: false, description: '', minRequirement: '' },
      DET: { status: false, description: '', minRequirement: '' },
    },
    StandardizeRequirement: courseData?.StandardizeRequirement || {
      SAT: { status: false, description: '', minRequirement: '' },
      ACT: { status: false, description: '', minRequirement: '' },
      GRE: { status: false, description: '', minRequirement: '' },
      GMAT: { status: false, description: '', minRequirement: '' },
    },
    broucherURL:""
  }));
  console.log("fix",formValues)
  // Update form values when courseData changes
  useEffect(() => {
    setFormValues(prev => ({
      ...prev,
      ...courseData
    }));
  }, [courseData]);

  // Handle input changes
  const handleChange = async (event) => {
    const { name, value, type, files } = event.target;

    if (type === 'file') {
      const file = files[0];
      if (file) {
        const imageURL = await uploadImage(file);
        setFormValues(prevValues => ({
          ...prevValues,
          [name]: imageURL,
        }));
      }
    } else {
      setFormValues(prevValues => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  // Upload image to Firebase storage
  const uploadImage = async (file) => {
    const storageRef = ref(storage, `courses/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  // Manage intake fields
  const addIntake = () => {
    setFormValues(prevValues => ({
      ...prevValues,
      Intake: [...prevValues.Intake, { status: true, date: '' }],
    }));
  };

  const removeIntake = (index) => {
    setFormValues(prevValues => ({
      ...prevValues,
      Intake: prevValues.Intake.filter((_, i) => i !== index),
    }));
  };

  const handleIntakeChange = (index, field, value) => {
    setFormValues(prevValues => {
      const updatedIntake = [...prevValues.Intake];
      updatedIntake[index] = { ...updatedIntake[index], [field]: value };
      return { ...prevValues, Intake: updatedIntake };
    });
  };

  const onSubmit = async () => {
    try {
      const data = {
        id: courseData._id,
        raw: formValues
      }
      await updateCourse(data).unwrap();
    
      handleClose();
    } catch (error) {
      console.error('Failed to update course:', error);
    }
  };

  // Show success toast on update success
  useEffect(() => {
    if (isSuccess) {
      toast.success('Course Updated Successfully');
    }
  }, [isSuccess]);

  return (
    <Dialog maxWidth='xl' fullWidth open={open} onClose={handleClose}>
      <DialogTitle className='text-white bg-custom-primary font-bold'>Update Course</DialogTitle>
      <DialogContent>
        <DialogContentText>You can update the course details here.</DialogContentText>
        <Box
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
            {/* Input fields for course data */}
            <TextField
              id="ProgramName"
              name="ProgramName"
              label="Program Name"
              variant="standard"
              value={formValues.ProgramName}
              onChange={handleChange}
              sx={{ flex: '1 1 30%' }}
            />
           
            <TextField
              id="WebsiteURL"
              name="WebsiteURL"
              label="Website URL"
              variant="standard"
              value={formValues.WebsiteURL}
              onChange={handleChange}
              sx={{ flex: '1 1 30%' }}
            />
            <TextField
              id="Location"
              name="Location"
              label="Location"
              variant="standard"
              value={formValues.Location}
              onChange={handleChange}
              sx={{ flex: '1 1 30%' }}
            />
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
                {levels.map(level => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="Duration"
              name="Duration"
              label="Duration"
              variant="standard"
              value={formValues.Duration}
              onChange={handleChange}
              sx={{ flex: '1 1 30%' }}
            />
            <TextField
              id="Fees"
              name="Fees"
              label="Fees"
              type="number"
              variant="standard"
              value={formValues.Fees}
              onChange={handleChange}
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
            <FormControlLabel
              control={
                <Switch
                  checked={formValues.Scholarships}
                  onChange={handleChange}
                  name="Scholarships"
                />
              }
              label="Scholarships Available"
            />
          </Box>

          {/* Intake Section */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Intake Dates</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {formValues.Intake.map((intake, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <TextField
                    id={`intake-date-${index}`}
                    label="Intake Date"
                    variant="standard"
                    value={intake.date}
                    onChange={(e) => handleIntakeChange(index, 'date', e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                    <TextField
                    id={`intake-expiresAt-${index}`}
                    label="Expire Date"
                    variant="standard"
                    type = 'date'
                    value={intake?.expiresAt?.split('T')[0]}
                    onChange={(e) => handleIntakeChange(index, 'expiresAt', e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={intake.status}
                        onChange={(e) => handleIntakeChange(index, 'status', e.target.checked)}
                      />
                    }
                    label="Available"
                  />
                  <IconButton onClick={() => removeIntake(index)}>
                    <RemoveIcon />
                  </IconButton>
                </Box>
              ))}
              <Button startIcon={<AddIcon />} onClick={addIntake}>
                Add Intake
              </Button>
            </AccordionDetails>
          </Accordion>

          {/* Language Requirements Section */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Language Requirements</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {Object.keys(formValues.LanguageRequirements).map(lang => (
                <Box key={lang} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <TextField
                    id={lang}
                    name={lang}
                    label={lang}
                    variant="standard"
                    value={formValues.LanguageRequirements[lang].minRequirement}
                    onChange={(e) => setFormValues(prev => ({
                      ...prev,
                      LanguageRequirements: {
                        ...prev.LanguageRequirements,
                        [lang]: {
                          ...prev.LanguageRequirements[lang],
                          minRequirement: e.target.value,
                        },
                      },
                    }))}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formValues.LanguageRequirements[lang].status}
                        onChange={(e) => setFormValues(prev => ({
                          ...prev,
                          LanguageRequirements: {
                            ...prev.LanguageRequirements,
                            [lang]: {
                              ...prev.LanguageRequirements[lang],
                              status: e.target.checked,
                            },
                          },
                        }))}
                      />
                    }
                    label="Required"
                  />
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>

          {/* Standardized Requirements Section */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Standardized Requirements</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {Object.keys(formValues.StandardizeRequirement).map(test => (
                <Box key={test} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <TextField
                    id={test}
                    name={test}
                    label={test}
                    variant="standard"
                    value={formValues.StandardizeRequirement[test].minRequirement}
                    onChange={(e) => setFormValues(prev => ({
                      ...prev,
                      StandardizeRequirement: {
                        ...prev.StandardizeRequirement,
                        [test]: {
                          ...prev.StandardizeRequirement[test],
                          minRequirement: e.target.value,
                        },
                      },
                    }))}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formValues.StandardizeRequirement[test].status}
                        onChange={(e) => setFormValues(prev => ({
                          ...prev,
                          StandardizeRequirement: {
                            ...prev.StandardizeRequirement,
                            [test]: {
                              ...prev.StandardizeRequirement[test],
                              status: e.target.checked,
                            },
                          },
                        }))}
                      />
                    }
                    label="Required"
                  />
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          Update Course
        </Button>
      </DialogActions>
    </Dialog>
  );
}
