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
import { useCreateUniversityMutation, useFetchProvinceMutation } from '../../../slices/adminApiSlice'; // Adjust the slice accordingly
import { toast } from 'react-toastify';
import { AddUniversity } from '../../../slices/universitySlice'; // Adjust the slice accordingly
import { FetchProvinces } from '../../../slices/provinceSlice';

const storage = getStorage(app);

export default function CreateUniversityPop({ open, handleClose }) {
    const dispatch = useDispatch();
    const { province } = useSelector(state => state.province);
    const [FetchProvince] = useFetchProvinceMutation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await FetchProvince().unwrap();
                dispatch(FetchProvinces(result));
            } catch (error) {
                console.error('Failed to fetch provinces:', error);
            }
        };
        fetchData();
    }, [FetchProvince, dispatch]);

    const [formValues, setFormValues] = useState({
        name: '',
        bannerURL: '',
        heroURL: '',
        description: '',
        grade: 'A',
        rating: '5',
        sections: [
            { title: '', description: '', url: '' }
        ],
        eligiblity: '',
        logo: '',
        Province: '',
        campusLife: '',
        hostel: '',
        type: 'Public',
        rank: 0,
        UniLink: '',
        Course: []
    });

    const [createUniversity, { isSuccess }] = useCreateUniversityMutation();

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
        const storageRef = ref(storage, `universities/${file.name}`);
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
      console.log("On submit",formValues)
        const res = await createUniversity(formValues).unwrap();
        dispatch(AddUniversity({ ...res }));
        handleClose();
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success('University Added Successfully');
        }
    }, [isSuccess]);

    return (
        <Dialog fullWidth='xl' open={open} onClose={handleClose}>
            <DialogTitle className='text-white bg-custom-primary font-bold'>Add University</DialogTitle>
            <DialogContent>
                <div className='py-2'>
                    <DialogContentText>You can add a university.</DialogContentText>
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
                        id="logo"
                        name="logo"
                        type="file"
                        variant="standard"
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        className="mb-2"
                        label="Logo"
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
                    <TextField
                        id="eligiblity"
                        name="eligiblity"
                        label="Eligiblity"
                        variant="standard"
                        value={formValues.eligiblity}
                        onChange={handleChange}
                        className="mb-2"
                    />

                    {/* Province */}
                    <FormControl variant="standard" className="mb-2">
                        <InputLabel id="province-label">Province</InputLabel>
                        <Select
                            labelId="province-label"
                            id="Province"
                            name="Province"
                            value={formValues.Province}
                            onChange={handleChange}
                            label="Province"
                        >
                            {province?.map((province) => (
                                <MenuItem key={province} value={province?._id}>
                                    {province?.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Campus Life */}
                    <TextField
                        id="campusLife"
                        name="campusLife"
                        label="Campus Life"
                        variant="standard"
                        value={formValues.campusLife}
                        onChange={handleChange}
                        className="mb-2"
                    />

                    {/* Hostel */}
                    <TextField
                        id="hostel"
                        name="hostel"
                        label="Hostel"
                        variant="standard"
                        value={formValues.hostel}
                        onChange={handleChange}
                        className="mb-2"
                    />

                    {/* University Type */}
                    <FormControl variant="standard" className="mb-2">
                        <InputLabel id="type-label">University Type</InputLabel>
                        <Select
                            labelId="type-label"
                            id="type"
                            name="type"
                            value={formValues.type}
                            onChange={handleChange}
                            label="Type"
                        >
                            <MenuItem value="Public">Public</MenuItem>
                            <MenuItem value="Private">Private</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Rank */}
                    <TextField
                        id="rank"
                        name="rank"
                        label="Rank"
                        type="number"
                        variant="standard"
                        value={formValues.rank}
                        onChange={handleChange}
                        className="mb-2"
                    />

                    {/* University Link */}
                    <TextField
                        id="UniLink"
                        name="UniLink"
                        label="University Link"
                        variant="standard"
                        value={formValues.UniLink}
                        onChange={handleChange}
                        className="mb-2"
                    />

                    <Button onClick={onSubmit} variant="contained" color="primary">
                        Submit
                    </Button>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
}
