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
import { useCountryAllFetchMutation, useFetchProvinceMutation, useFetchUniversityMutation, useUpdateCourseOneMutation } from '../../../slices/adminApiSlice'; // Adjust the slice accordingly
import { toast } from 'react-toastify';
import { FetchProvinces } from '../../../slices/provinceSlice';
import { FetchUniversitys } from '../../../slices/universitySlice';
import TextEditor from '../TextEditor';
import { FetchCountry } from '../../../slices/countrySlice.js';

const storage = getStorage(app);
const levels = ['High School', 'UG Diploma/Certificate/Associate Degree', 'UG', 'PG Diploma', 'PG', 'UG+PG(Accelerated) Degree', 'PhD', 'Foundation', 'Short Term Program', 'Pathway Program', 'Twiming Program(UG)', 'Twiming Program(PG)', 'Online Program/Distance Learning'];

const categories = [
  'Arts', 'Accounts', 'Finance', 'Marketing', 'Science', 'Medical', 'Computers', 'Engineering', 'Law', 'Education', 'Social Sciences', 'Business Administration', 'Psychology', 'Economics', 'Architecture', 'Environmental Science', 'Nursing', 'Hospitality Management', 'Media and Communication', 'Information Technology', 'Pharmacy', 'Agriculture', 'Design', 'Public Health', 'Mathematics', 'Data Science', 'Artificial Intelligence',
];

export default function MbbsUpdateCoursePop({ open, handleClose, courseData }) {
  const dispatch = useDispatch();
  const { provinces } = useSelector(state => state.province);
  const { university } = useSelector(state => state.university);

  const [fetchProvinces] = useFetchProvinceMutation();
  const [fetchUniversity] = useFetchUniversityMutation();
  const [updateCourse, { isSuccess }] = useUpdateCourseOneMutation();
  const [CountryAllFetch, { isLoading }] = useCountryAllFetchMutation();
  const [countries, setCountries] = useState([])
  const [formValues, setFormValues] = useState(() => ({
    ProgramName: courseData?.ProgramName || '',
    University: courseData?.University?._id || '',
    Country: courseData?.University.Country || '',
    Eligibility: courseData?.University?.eligiblity || '',
    WebsiteURL: courseData?.WebsiteURL || '',
    Location: courseData?.Location || '',
    Duration: courseData?.Duration || '',
    Category: courseData?.Category || '',
    Fees: courseData?.Fees || 0,
    Intake: courseData?.Intake || [{ status: true, date: '', expiresAt: '' }],
    Scholarships: courseData?.Scholarships || false,
    ProgramLevel: courseData?.ProgramLevel || '',
    broucherURL: ""
  }));
  console.log("fix", formValues)
  // Update form values when courseData changes
  // const [CountryId, setCountryId] = useState(courseData.University,_id)
  // Fetch universities on component mount

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchUniversity().unwrap();
        // const filteredUniversities = result.filter(
        //   (university) => university.Country === `${courseData?.University?._id}`
        // );
        dispatch(FetchUniversitys(result));
        console.log("Filtered Universitieswwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww:", filteredUniversities);
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
        // const result = await fetchProvinces().unwrap();
        // dispatch(FetchProvinces(result));
        const result1 = await CountryAllFetch().unwrap();
        dispatch(FetchCountry(result1));
        setCountries(result1)
      } catch (error) {
        console.error('Failed to fetch provinces:', error);
      }
    };
    fetchData();
  }, [CountryAllFetch, dispatch]);

  console.log(courseData, "++++++++++++++++++++++++++++++++++++++++++++");

  // Initialize form values with course data

  useEffect(() => {
    setFormValues(prev => ({
      ...prev,
      ...courseData
    }));
  }, [courseData]);

  // Handle input changes
  const handleChange = async (event) => {
    const { name, value, type, files } = event.target;
    console.log(name, value, type, files);
    
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
      console.log(data,"-----------------------------------------------------------");
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
      <DialogTitle className='text-white bg-custom-primary font-bold'>Update MBBS Course</DialogTitle>
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

            <FormControl variant="standard" className="mb-2" sx={{ flex: '1 1 30%' }}>
              <InputLabel id="University-label">University</InputLabel>
              <Select
                labelId="University-label"
                id="University"
                name="University"
                value={courseData?.University?._id}
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

            <FormControl variant="standard" className="mb-2" sx={{ flex: '1 1 30%' }}>
              <InputLabel id="Country-label">Country</InputLabel>
              <Select
                labelId="Country-label"
                id="Country"
                name="Country"
                value={courseData?.University?.Country}
                onChange={handleChange}
                label="Country"
              >
                {countries?.map((uni) => (
                  <MenuItem key={uni?.id} value={uni?._id}>
                    {uni?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <div>
              <DialogContentText>Eligibility</DialogContentText>
              <TextEditor
                // id={`sectionDescription${index}`}
                // name={`sections.${index}.description`}
                // label="Description"
                variant="standard"
                value={courseData?.University?.eligiblity}
                // onChange={handleChange}
                onChange={(e)=>{setFormValues((prev)=>({...prev,Eligibility:e.target.value}))}}
                className="mb-2"
              />
            </div> */}

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
              // type="number"
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
            {/* <FormControlLabel
              control={
                <Switch
                  checked={formValues.Scholarships}
                  onChange={handleChange}
                  name="Scholarships"
                />
              }
              label="Scholarships Available"
            /> */}
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
                    type='date'
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
                    type='date'
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


        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          Update MBBS Course
        </Button>
      </DialogActions>
    </Dialog>
  );
}
