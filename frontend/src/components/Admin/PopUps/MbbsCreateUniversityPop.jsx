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
    FormControlLabel, Checkbox
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import {  FormControl } from "@mui/material";

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase'; // Adjust the import path accordingly
import { useCountryAllFetchMutation, useCreateUniversityMutation, useFetchProvinceMutation } from '../../../slices/adminApiSlice'; // Adjust the slice accordingly
import { toast } from 'react-toastify';
import { AddUniversity } from '../../../slices/universitySlice'; // Adjust the slice accordingly
import { FetchProvinces } from '../../../slices/provinceSlice';
import TextEditor from '../TextEditor';
import { FetchCountry } from '../../../slices/countrySlice.js';


const storage = getStorage(app);

export default function MbbsCreateUniversityPop({ open, handleClose }) {
    const dispatch = useDispatch();
    const { province } = useSelector((state) => state.province);
    const [FetchProvince] = useFetchProvinceMutation();
    const [CountryAllFetch, { isLoading }] = useCountryAllFetchMutation();
    // State for form values and image validation
    const [countries, setCountries] = useState([])
    // const { countries } = useSelector((state) => state.country);
    const [formValues, setFormValues] = useState({
        name: '',
        bannerURL: '',
        Province: null,
        heroURL: '',
        Country: '',
        description: '',
        grade: 'A',
        rating: '5',
        sections: [{ title: '', description: '', url: '' }],
        // eligiblity: '',
        logo: '',
        campusLife: '',
        hostel: '',
        type: 'Public',
        MCI: '',
        ECFMG: null,
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
    const [createUniversity, { isSuccess }] = useCreateUniversityMutation();
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;  // 'checked' holds true or false
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: checked,  // Update to true or false based on checkbox status
        }));
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultforsidebar = await CountryAllFetch().unwrap();
                // const filtered = resultforsidebar.filter(country => country.mbbsAbroad === true);
                dispatch(FetchCountry(resultforsidebar));
                setCountries(resultforsidebar)
                console.log(resultforsidebar, "************************************************")

            } catch (error) {
                console.error('Failed to fetch provinces:', error);
            }
        };
        fetchData();
    }, [CountryAllFetch, dispatch]);

    const validateImage = (file, requiredWidth, requiredHeight) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                resolve(img.width >= requiredWidth && img.height >= requiredHeight);
            };
        });
    };
    const handleChange = async (event) => {
        const { name, value, type, files } = event.target;
        const [section, index, field] = name.split('.');

        if (type === 'file') {
            const file = files[0];
            if (file) {
                let isValid = false;

                switch (name) {
                    case 'bannerURL':
                        isValid = await validateImage(file, 1200, 500);
                        break;
                    case 'heroURL':
                        isValid = await validateImage(file, 400, 300);
                        break;
                    case 'logo':
                        isValid = await validateImage(file, 150, 150);
                        break;
                    case name.includes('sections'):
                        isValid = true;
                        break;
                    default:
                        break;
                }

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
            // Check for word limit on section descriptions
            if (section === 'sections' && field === 'description') {
                const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
                if (wordCount > 400) return; // limit to 400 words
            }

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
        // Inline validation
        const errors = [];

        if (!formValues.name.trim()) errors.push('University name is required.');
        if (!formValues.bannerURL.trim()) errors.push('Banner URL is required.');
        // if (!formValues.Province) errors.push('Province must be selected.');
        if (!formValues.heroURL.trim()) errors.push('Hero URL is required.');
        if (!formValues.Country.trim()) errors.push('Country is required.');
        if (!formValues.description.trim()) errors.push('Description is required.');
        if (!formValues.logo.trim()) errors.push('Logo URL is required.');
        if (!formValues.campusLife.trim()) errors.push('Campus Life description is required.');
        if (!formValues.hostel.trim()) errors.push('Hostel information is required.');
        if (!formValues.type.trim()) errors.push('University type is required.');
        if (formValues.rank === null || formValues.rank === '' || isNaN(formValues.rank)) errors.push('Valid rank is required.');
        if (!formValues.UniLink.trim()) errors.push('University website link is required.');
        // if (!Array.isArray(formValues.Course) || formValues.Course.length === 0) {
        //     errors.push('At least one course must be added.');
        // }

        // formValues.sections.forEach((section, index) => {
        //     if (!section.title.trim() || !section.description.trim() || !section.url.trim()) {
        //         errors.push(`All fields are required in section ${index + 1}.`);
        //     }
        // });

        // Show all validation errors and stop submission
        if (errors.length > 0) {
            errors.forEach(err => toast.error(err));
            return;
        }

        try {
            console.log(formValues, "Submitting university data...");
            const res = await createUniversity(formValues).unwrap();
            dispatch(AddUniversity({ ...res }));
            console.log(res, "University created successfully");
            handleClose();
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message || "An error occurred");
        }
    };


    useEffect(() => {
        if (isSuccess) {
            toast.success('University Added Successfully');
        }
    }, [isSuccess]);
    const handlecancell = (e) => {
        e.stopPropagation();
        handleClose();
    }

    useEffect(() => {
        // Check if all required images are valid
        const allImagesValid = Object.values(imageValidations).every(Boolean);
        setIsFormValid(allImagesValid && formValues.name);
    }, [imageValidations, formValues]);

    return (
        <Dialog fullWidth='xl' open={open} onClose={handleClose}>
            <DialogTitle className='text-white bg-custom-primary font-bold'>Add MBBS University</DialogTitle>
            <DialogContent>
                <div className='py-2'>
                    <DialogContentText></DialogContentText>
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
                    <span className='text-red-300 text-sm font-bold'>Image should be w-2400px h-700px</span>
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
                    <span className='text-red-300 text-sm font-bold'>Image should be w-400px h-300px</span>

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
                    {/* <h4 className='text-gray-500'>Description</h4> */}
                    <TextEditor
                        id="description"
                        name="description"
                        label="Description"
                        variant="standard"
                        value={formValues.description}
                        onChange={handleChange}
                        className="mb-2"
                    />
                    <p className="text-red-300 text-sm font-bold">Only 200 hundered words are allowed.</p>
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
                                {/* <TextField
                                    id={`sectionDescription${index}`}
                                    name={`sections.${index}.description`}
                                    label="Description"
                                    variant="standard"
                                    value={section.description}
                                    onChange={handleChange}
                                    className="mb-2"
                                /> */}
                                {/* <TextEditor
                                        id="description"
                                        name="description"
                                        label="Description"
                                        variant="standard"
                                        value={formValues._id}
                                        onChange={(e)=>{setFormValues((prev)=>({...prev,campusLife:e.target.value}))}}
                                        className="mb-2"
                                    /> */}
                                <TextEditor
                                    id={`sectionDescription${index}`}
                                    name={`sections.${index}.description`}
                                    label="Description"
                                    variant="standard"
                                    value={section.description}
                                    onChange={handleChange}
                                    className="mb-2"
                                />
                                {/* <TextEditor
                                    id={`sectionDescription${index}`}
                                    name={`sections.${index}.description`}
                                    label="Description"
                                    variant="standard"
                                    value={section.description || ""}
                                    onChange={(value) => {
                                        handleChange({
                                            target: {
                                                name: `sections.${index}.description`,
                                                value: value,
                                            },
                                        });
                                    }}
                                    className="mb-2"
                                /> */}

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

                    {/* Additional Fields */}
                    <FormControl variant="standard" fullWidth className="mb-2">
                        <InputLabel id="Country-label">Country</InputLabel>
                        <Select
                            labelId="Country-label"
                            id="country"
                            name="Country"
                            value={formValues.Country}
                            onChange={handleChange}
                        >
                            {countries.map((prov) => (
                                <MenuItem key={prov.id} value={prov._id}>{prov.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* <TextEditor
                        id="eligiblity"
                        name="description"
                        label="Eligibility"
                        variant="standard"
                        value={formValues.eligiblity}
                        onChange={(e) => setFormValues((prev) => ({
                            ...prev,
                           eligiblity: e.target.value
                          }))}
                        className="mb-2"
                    /> */}
                    {/* <TextField
                        id="eligiblity"
                        name="eligiblity"
                        label="Eligibility"
                        variant="standard"
                        value={formValues.eligiblity}
                        onChange={handleChange}
                        className="mb-2"
                    /> */}
                    {/* <TextField
                        id="campusLife"
                        name="campusLife"
                        label="Campus Life"
                        variant="standard"
                        value={formValues.campusLife}
                        onChange={handleChange}
                        className="mb-2"
                    /> */}

                    <TextEditor
                        id="description"
                        name="description"
                        label="Campus Life"
                        variant="standard"
                        value={formValues.campusLife}
                        onChange={(e) => { setFormValues((prev) => ({ ...prev, campusLife: e.target.value })) }}
                        className="mb-2"
                    />



                    {/* <TextField
                        id="hostel"
                        name="hostel"
                        label="Hostel"
                        variant="standard"
                        value={formValues.hostel}
                        onChange={handleChange}
                        className="mb-2"
                    /> */}

                    <TextEditor
                        id="description"
                        name="description"
                        label="Hostel"
                        variant="standard"
                        value={formValues.hostel}
                        onChange={(e) => { setFormValues((prev) => ({ ...prev, hostel: e.target.value })) }}
                        className="mb-2"
                    />
                    {/* <TextField
                        id="type"
                        name="type"
                        label="University Type"
                        variant="standard"
                        value={formValues.type}
                        onChange={handleChange}
                        className="mb-2"
                    /> */}



                    {/* MCI Approved */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                // checked={formValues.MCIApproved}  // Will be true or false
                                onChange={(e) => {
                                    setFormValues((prev) => ({
                                        ...prev,
                                        MCI: e.target.checked // Update the state with checked value
                                    }));
                                }}

                                name="MCIApproved"  // Will update formValues.MCIApproved
                            />
                        }
                        label="MCI Approved"
                    />

                    {/* ECFMG Approved */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formValues.ECFMGApproved}  // Will be true or false
                                onChange={(e) => {
                                    setFormValues((prev) => ({
                                        ...prev,
                                        ECFMG: e.target.checked // Update the state with checked value
                                    }));
                                }}  // Update the state with checked value
                                name="ECFMGApproved"  // Will update formValues.ECFMGApproved
                            />
                        }
                        label="ECFMG Approved"
                    />
                    {/* <TextField
                        id="type"
                        name="type"
                        label="University Type"
                        variant="standard"
                        value={formValues.type}
                        onChange={handleChange}
                        className="mb-2"
                    /> */}



                    <FormControl variant="standard" fullWidth>
                        <InputLabel id="university-type-label">University Type</InputLabel>
                        <Select
                            labelId="university-type-label"
                            id="type"
                            name="type"
                            value={formValues.type}
                            onChange={handleChange}
                        >
                            <MenuItem value="Private">Private</MenuItem>
                            <MenuItem value="Public">Public</MenuItem>
                        </Select>
                    </FormControl>
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
                    <TextField
                        id="UniLink"
                        name="UniLink"
                        label="University Link"
                        variant="standard"
                        value={formValues.UniLink}
                        onChange={handleChange}
                        className="mb-2"
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handlecancell}>Cancel</Button>
                <Button onClick={onSubmit} >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}
