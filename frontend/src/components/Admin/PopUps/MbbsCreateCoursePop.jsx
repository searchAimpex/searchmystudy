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
import { useCountryAllFetchMutation, useCreateCourseMutation, useFetchProvinceMutation, useFetchUniversityMutation } from '../../../slices/adminApiSlice'; // Adjust the slice accordingly
import { toast } from 'react-toastify';
import { FetchProvinces } from '../../../slices/provinceSlice';
import { FetchUniversitys } from '../../../slices/universitySlice';
import { AddCourse } from '../../../slices/courseSlice';
import { NearMe } from '@mui/icons-material';
import { FetchCountry } from '../../../slices/countrySlice.js';
import TextEditor from '../TextEditor.jsx';
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

export default function MbbsCreateCoursePop({ open, handleClose }) {
  const dispatch = useDispatch();
  const { provinces } = useSelector(state => state.province);
  const { university } = useSelector(state => state.university); // Assume universities are fetched and stored in the state
  const [fetchProvinces] = useFetchProvinceMutation();
  const [FetchUniversity] = useFetchUniversityMutation();
  const [CountryAllFetch, { isLoading }] = useCountryAllFetchMutation();
  const [createCourse, { isSuccess }] = useCreateCourseMutation();
  // const { countries } = useSelector((state) => state.country);
  const [countries, setCountries] = useState([])
  const [CountryId, setCountryId] = useState("")
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await FetchUniversity().unwrap();
  //       const filteredUniversities = Universities_result.filter(
  //         (university) => university.Country === countries._id
  //       );
  //       dispatch(FetchUniversitys(filteredUniversities));

        // console.log(university,"uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");

  //     } catch (error) {
  //       console.error('Failed to fetch universities:', error);
  //     }
  //   };
  //   fetchData();
  // }, [FetchUniversity, dispatch]);

  // console.log(CountryId, "%$%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");

  // Fetch countries on component load
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const result = await CountryAllFetch().unwrap();
        // const filtered = result.filter(country => country.mbbsAbroad === true);
        dispatch(FetchCountry(result));
        console.log(result);
        
        setCountries(result)
      } catch (error) {
        console.error('Failed to fetch countries:', error);
      }
    };

    fetchCountries();
  }, [CountryAllFetch, dispatch]);

  // Fetch universities when country is selected
  // useEffect(() => {
    // const fetchUniversitiesByCountry = async () => {
      // try {
        // if (CountryId) {
          // const result = await FetchUniversity().unwrap();
          const filteredUniversities = university.filter(
            (university) => university.Country?._id === CountryId
          );
          // dispatch(FetchUniversitys(filteredUniversities));
          console.log("Filtered Universities::::::::::::::::::::::::", filteredUniversities);
        // }
      // } catch (error) {
        // console.error('Failed to fetch universities:', error);
      // }
    // };

    // fetchUniversitiesByCountry();
  // }, [CountryId, FetchUniversity, dispatch]);


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
    // CampusLife:'',
    University: '',
    Eligibility: '',
    WebsiteURL: '',
    // CampusLife: '',
    Location: '',
    Duration: '',
    Category: '',
    Fees: 0,
    Intake: [{ status: true, date: '', expiresAt: new Date() }],
    Scholarships: true,
    ProgramLevel: '',
    languageRequire: {
      english: '',
      no_any_preference: '',
      motherTongue: ''
    },
    // LanguageRequirements: {
    //   PTE: { status: false, description: '', minRequirement: '' },
    //   TOFFL: { status: false, description: '', minRequirement: '' },
    //   IELTS: { status: false, description: '', minRequirement: '' },
    //   DET: { status: false, description: '', minRequirement: '' }
    // },
    // StandardizeRequirement: {
    //   SAT: { status: false, description: '', minRequirement: '' },
    //   ACT: { status: false, description: '', minRequirement: '' },
    //   GRE: { status: false, description: '', minRequirement: '' },
    //   GMAT: { status: false, description: '', minRequirement: '' }
    // },
    broucherURL: ""
  });
  const handlecancell = (e) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel without submitting the form?");
    e.stopPropagation();
    if(confirmCancel){
      handleClose();
    }
  }



  const handleChange = async (event) => {
    const { name, value, type, files } = event.target;
    console.log(name, value, type, files);

    if (name === "Country") {
      setCountryId(value); // this is for filtering universities
    }

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
    console.log(formValues);
    try {
      if (
        formValues.ProgramName !== '' &&
        formValues.Country !== '' &&
        formValues.Eligibility !== '' &&
        formValues.University !== '' &&
        formValues.WebsiteURL !== '' &&
        formValues.Location !== '' &&
        formValues.Duration !== '' &&
        formValues.Category !== '' &&
        formValues.Intake.date !== '' &&
        formValues.Intake.expiresAt !== '' &&
        formValues.languageRequire.Duration !== ''
        
      ) {
        // console.log(formValues,"zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
        const res = await createCourse(formValues).unwrap();
        // console.log(res, "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");

        dispatch(AddCourse({ ...res }));
        handleClose();
      } else {
        toast.error('Please fill in all required fields.');
      }
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
      <DialogTitle className='text-white bg-custom-primary font-bold'>Add MBBS Course</DialogTitle>
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
              <InputLabel id="Country-label">Country</InputLabel>
              <Select
                labelId="Country-label"
                id="Country"
                name="Country"
                value={formValues.Country}
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


            {/* country  */}
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
                  {filteredUniversities?.map((uni) => (
                    <MenuItem key={uni?.id} value={uni?._id}>
                      {uni?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>


            <TextField
              id="WebsiteURL"
              name="WebsiteURL"
              label="University Website URL"
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
              
              <div className="w-full sm:w-1/2 md:w-1/3 px-2">
                <label
                  htmlFor={`Intake-${index}-date`}
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Start Date
                </label>
                <TextField
                  id="intake"
                  // type="date"
                  variant="standard"
                  // label="Ex"
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

          {/* <div>
            <DialogContentText>Campus Life</DialogContentText>
            <TextEditor
              // id={`sectionDescription${index}`}
              // name={`sections.${index}.description`}
              // label="Description"
              variant="standard"
              // value={section.description}
              onChange={(e)=>{setFormValues((prev)=>({...prev,CampusLife:e.target.value}))}}
              className="mb-2"
            />
          </div> */}

          <div>
            <DialogContentText>Eligibility</DialogContentText>
            <TextEditor
              // id={`sectionDescription${index}`}
              // name={`sections.${index}.description`}
              // label="Description"
              variant="standard"
              // value={section.description}
              onChange={(e)=>{setFormValues((prev)=>({...prev,Eligibility:e.target.value}))}}
              className="mb-2"
            />
          </div>





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
