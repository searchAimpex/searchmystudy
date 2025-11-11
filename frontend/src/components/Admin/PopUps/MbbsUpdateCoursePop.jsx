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
// const [university, setuniversity] = useState()

  // console.log(courseData,"//////////////////////////////////////////////////////////////");
  
  const [fetchProvinces] = useFetchProvinceMutation();
  const [fetchUniversity] = useFetchUniversityMutation();
  const [updateCourse, { isSuccess }] = useUpdateCourseOneMutation();
  const [CountryAllFetch, { isLoading }] = useCountryAllFetchMutation();
  const [countries, setCountries] = useState([])
  const [formValues, setFormValues] = useState(() => ({
    ProgramName: courseData?.ProgramName || '',
    University: courseData?.University?._id || '',
    Eligibility: courseData?.Eligibility || '',
    WebsiteURL: courseData?.WebsiteURL || '',
    Location: courseData?.Location || '',
    Duration: courseData?.Duration || '',
    Category: courseData?.Category || '',
    Fees: courseData?.Fees || 0,
    Intake: courseData?.Intake || [{ status: true, date: '', expiresAt: '' }],
    Scholarships: courseData?.Scholarships || false,
    ProgramLevel: courseData?.ProgramLevel || '',
    languageRequire: courseData?.languageRequire || '',
    broucherURL: ""
  }));
  console.log("+++++++++++++++++++++++++++++++////////////////////////", courseData)
  // Update form values when courseData changes
  // const [CountryId, setCountryId] = useState(courseData.University,_id)
  // Fetch universities on component mount
  
  // Fetch provinces on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const result = await fetchProvinces().unwrap();
        // dispatch(FetchProvinces(result));        
        const result1 = await CountryAllFetch().unwrap();
        dispatch(FetchCountry(result1));
        setCountries(result1)
        console.log(result1,"++++++++++++++++++++++++++++++++++++");
      } catch (error) {
        console.error('Failed to fetch provinces:', error);
      }
    };
    fetchData();
  }, [CountryAllFetch,fetchUniversity, dispatch]);
// 
  // console.log(courseData, "++++++++++++++++++++++++++++++++++++++++++++");

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
// console.log(courseData?.Eligibility,"\\\\\\\\\\\\\\\\\\\\\\\\\\|||||||||||||||||||||||||");

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

            {/* <FormControl variant="standard" className="mb-2" sx={{ flex: '1 1 30%' }}>
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
            </FormControl> */}

            {/* <FormControl variant="standard" className="mb-2" sx={{ flex: '1 1 30%' }}>
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
            </FormControl> */}

              <div>
                        <div className='py-2'>
                          <DialogContentText>Language Requirement</DialogContentText>
                        </div>
            
                        <div className="flex my-2 space-x-10">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="english"
                              name="language"
                              value="English"
                              className="mr-2"
                              checked={formValues.languageRequire?.english || false} 
                              onChange={(e) => {
                                setFormValues((prev) => ({
                                  ...prev,
                                  languageRequire: {
                                    ...prev.languageRequire, // Preserve existing languageRequire fields
                                    english: e.target.checked  // Update the 'english' field
                                  }
                                }));
                              }} />
                            <label htmlFor="english">  <DialogContentText>English</DialogContentText></label>
                          </div>
            
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="No_any_Preference"
                              name="language"
                              value="No_any_Preference"
                              checked={formValues.languageRequire?.no_any_preference || false} // Controlled checked state
                              className="mr-2"
                              onChange={(e) => {
                                setFormValues((prev) => ({
                                  ...prev,
                                  languageRequire: {
                                    ...prev.languageRequire, // Preserve existing languageRequire fields
                                    no_any_preference: e.target.checked  // Update the 'english' field
                                  }
                                }));
                              }}
                            />
                            <label htmlFor="No_any_Preference">  <DialogContentText>No any Preference</DialogContentText></label>
                          </div>
            
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="motherTongue"
                              name="language"
                              value="motherTongue"
                              checked={formValues.languageRequire?.motherTongue || false} // Controlled checked state
                              className="mr-2"
                              onChange={(e) => {
                                setFormValues((prev) => ({
                                  ...prev,
                                  languageRequire: {
                                    ...prev.languageRequire, // Preserve existing languageRequire fields
                                    motherTongue: e.target.checked  // Update the 'english' field
                                  }
                                }));
                              }}
                            />
                            <label htmlFor="motherTongue">  <DialogContentText>Mother Tongue</DialogContentText></label>
                          </div>
                        </div>
                      </div>

            <div>
              <DialogContentText>Eligibility</DialogContentText>
              <TextEditor
                // id={`sectionDescription${index}`}
                // name={`sections.${index}.description`}
                // label="Description"
                variant="standard"
                value={formValues.Eligibility}

                // onChange={handleChange}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    Eligibility: e.target.value,
                  }))
                }                className="mb-2"
              />
            </div>

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


            
            <TextField
              id="Duration"
              name="Duration"
              label="Duration"
              variant="standard"
              value={formValues.Duration}
              onChange={handleChange}
              sx={{ flex: '1 1 30%' }}
            />
            {/* <label htmlFor="">fees</label> */}
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
