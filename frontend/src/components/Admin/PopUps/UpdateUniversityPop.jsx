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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase'; // Adjust the import path accordingly
import { useUpdateUniversityMutation, useFetchProvinceMutation } from '../../../slices/adminApiSlice'; // Adjust the slice accordingly
import { toast } from 'react-toastify';
import { FetchProvinces } from '../../../slices/provinceSlice';

const storage = getStorage(app);

export default function UpdateUniversityPop({ open, handleClose, initialData }) {
    const dispatch = useDispatch();
    const { province } = useSelector((state) => state.province);
    const [FetchProvince] = useFetchProvinceMutation();

    // State for form values and image validation
    const [formValues, setFormValues] = useState(initialData || {
        name: '',
        bannerURL: '',
        heroURL: '',
        description: '',
        grade: 'A',
        rating: '5',
        sections: [{ title: '', description: '', url: '' }],
        eligiblity: '',
        logo: '',
        Province: '',
        campusLife: '',
        hostel: '',
        type: 'Public',
        rank: 0,
        UniLink: '',
        Course: [],
    });

    const [imageValidations, setImageValidations] = useState({
        bannerURL: false,
        heroURL: false,
        logo: false,
    });

    const [isFormValid, setIsFormValid] = useState(false);
    const [updateUniversity, { isSuccess }] = useUpdateUniversityMutation();

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

    const validateImage = (file, requiredWidth, requiredHeight) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                resolve(img.width === requiredWidth && img.height === requiredHeight);
            };
        });
    };

    const handleChange = async (event) => {
        const { name, value, type, files } = event.target;
        const [section, index, field] = name.split('.');

        if (type === 'file') {
            const file = files[0];
            if (file) {
                let isValid = true;

                // switch (name) {
                //     case 'bannerURL':
                //         isValid = await validateImage(file, 1200, 500);
                //         break;
                //     case 'heroURL':
                //         isValid = await validateImage(file, 400, 300);
                //         break;
                //     case 'logo':
                //         isValid = await validateImage(file, 150, 150);
                //         break;
                //     default:
                //         break;
                // }

                if (!isValid) {
                    toast.error(`${name} must be of the correct dimensions.`);
                    setImageValidations((prev) => ({
                        ...prev,
                        [name]: false,
                    }));
                    setFormValues((prevValues) => ({
                        ...prevValues,
                        [name]: '',
                    }));
                    return;
                }

                setImageValidations((prev) => ({
                    ...prev,
                    [name]: true,
                }));

                const imageURL = await uploadImage(file);
                if (field) {
                    setFormValues((prevValues) => ({
                        ...prevValues,
                        [section]: [
                            ...prevValues[section].slice(0, index),
                            { ...prevValues[section][index], [field]: imageURL },
                            ...prevValues[section].slice(Number(index) + 1),
                        ],
                    }));
                } else {
                    setFormValues((prevValues) => ({
                        ...prevValues,
                        [name]: imageURL,
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
                        ...prevValues[section].slice(Number(index) + 1),
                    ],
                }));
            } else {
                setFormValues((prevValues) => ({
                    ...prevValues,
                    [name]: value,
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
            sections: [...prevValues.sections, { title: '', description: '', url: '' }],
        }));
    };

    const removeSection = (index) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            sections: prevValues.sections.filter((_, i) => i !== index),
        }));
    };

    const onSubmit = async () => {
        try {
            const data =  { 
                id:initialData._id,
                raw:formValues
            }
            const res = await updateUniversity(data).unwrap();
            handleClose();
        } catch (error) {
            console.error('Failed to update university:', error);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success('University Updated Successfully');
        }
    }, [isSuccess]);

    useEffect(() => {
        const allImagesValid = Object.values(imageValidations).every(Boolean);
        setIsFormValid(allImagesValid && formValues.name && formValues.eligiblity);
    }, [imageValidations, formValues]);

    return (
        <Dialog fullWidth='xl' open={open} onClose={handleClose}>
            <DialogTitle className='text-white bg-custom-primary font-bold'>Update University</DialogTitle>
            <DialogContent>
                <div className='py-2'>
                    <DialogContentText>You can update the university details.</DialogContentText>
                </div>
                <Box
                    component="form"
                    sx={{ display: 'flex', flexDirection: 'column', m: 'auto', width: 'fit-content' }}
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
                                        <span className='text-red-300 text-sm font-bold'>Image should be w-1200px h-500px</span>

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
                                        <span className='text-red-300 text-sm font-bold'>Image should be w-1200px h-500px</span>

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
                                        <span className='text-red-300 text-sm font-bold'>Image should be w-150px h-150px</span>

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
                                <Button onClick={() => removeSection(index)}>Remove Section</Button>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                    <Button onClick={addSection}>Add Section</Button>
                    <TextField
                        id="eligiblity"
                        name="eligiblity"
                        label="Eligiblity"
                        variant="standard"
                        value={formValues.eligiblity}
                        onChange={handleChange}
                        className="mb-2"
                    />
                    <FormControl variant="standard">
                        <InputLabel id="province-label">Province</InputLabel>
                        <Select
                            labelId="province-label"
                            id="Province"
                            name="Province"
                            value={formValues.Province}
                            onChange={handleChange}
                        >
                            {province.map((prov, index) => (
                                <MenuItem key={index} value={prov.name}>
                                    {prov.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} className="mr-4">Cancel</Button>
                <Button onClick={onSubmit} className="text-white">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
}
