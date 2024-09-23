import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { toast } from 'react-toastify';
import { useCreateUserMutation } from '../../../slices/usersApiSlice'; 
import { useDispatch } from 'react-redux';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase'; // Ensure correct path for firebase config

const storage = getStorage(app);

function CreateUserPop({ open, handleClose }) {
  const [createUser, { isSuccess }] = useCreateUserMutation();
  const dispatch = useDispatch();
  
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    role: '',
    name: '',
    OwnerName: '',
    OwnerFatherName: '',
    InstitutionName: '',
    ContactNumber: '',
    WhatsAppNumber: '',
    CenterCode: '',
    DateOfBirth: '',
    city: '',
    state: '',
    zipCode: '',
    address: '',
    FrontAadhar: null,
    BackAadhar: null,
    PanCard: null,
    ProfilePhoto: null,
    VisitOffice: '',
    CancelledCheck: null,
    Logo: null,
  });

  const roles = ['partner', 'franchise', 'counsellor']; 

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === 'file') {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: files[0], // File upload
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const uploadFile = async (file) => {
    const storageRef = ref(storage, `users/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const onSubmit = async () => {
    try {
      const fileUploads = await Promise.all([
        formValues.FrontAadhar ? uploadFile(formValues.FrontAadhar) : null,
        formValues.BackAadhar ? uploadFile(formValues.BackAadhar) : null,
        formValues.PanCard ? uploadFile(formValues.PanCard) : null,
        formValues.ProfilePhoto ? uploadFile(formValues.ProfilePhoto) : null,
        formValues.CancelledCheck ? uploadFile(formValues.CancelledCheck) : null,
        formValues.Logo ? uploadFile(formValues.Logo) : null,
      ]);

      const mediaData = {
        ...formValues,
        FrontAadhar: fileUploads[0],
        BackAadhar: fileUploads[1],
        PanCard: fileUploads[2],
        ProfilePhoto: fileUploads[3],
        CancelledCheck: fileUploads[4],
        Logo: fileUploads[5],
      };

      const res = await createUser(mediaData).unwrap();
      dispatch({ type: 'user/addUser', payload: res }); // Dispatch action
      handleClose();
      toast.success('User Created Successfully');
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error('Failed to create user');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('User Created Successfully');
    }
  }, [isSuccess]);

  return (
    <Dialog fullWidth={true} open={open} onClose={handleClose}>
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        <DialogContentText>Create a user by filling in the fields.</DialogContentText>
        <Box
          noValidate
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 'auto',
            width: 'fit-content',
          }}
        >
          <TextField id="email" name="email" label="Email" variant="standard" value={formValues.email} onChange={handleChange} required sx={{ mb: 2 }} />
          <TextField id="name" name="name" label="Name" variant="standard" value={formValues.name} onChange={handleChange} required sx={{ mb: 2 }} />
          <TextField id="password" name="password" label="Password" type="password" variant="standard" value={formValues.password} onChange={handleChange} required sx={{ mb: 2 }} />
          <TextField id="role" name="role" label="Role" select value={formValues.role} onChange={handleChange} variant="standard" required>
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </MenuItem>
            ))}
          </TextField>
          <TextField id="OwnerName" name="OwnerName" label="Owner Name" variant="standard" value={formValues.OwnerName} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField id="OwnerFatherName" name="OwnerFatherName" label="Owner Father Name" variant="standard" value={formValues.OwnerFatherName} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField id="InstitutionName" name="InstitutionName" label="Institution Name" variant="standard" value={formValues.InstitutionName} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField id="ContactNumber" name="ContactNumber" label="Contact Number" variant="standard" value={formValues.ContactNumber} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField id="WhatsAppNumber" name="WhatsAppNumber" label="WhatsApp Number" variant="standard" value={formValues.WhatsAppNumber} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField id="CenterCode" name="CenterCode" label="Center Code" variant="standard" value={formValues.CenterCode} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField id="DateOfBirth" name="DateOfBirth" label="Date of Birth" type="date" variant="standard" value={formValues.DateOfBirth} onChange={handleChange} sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
          <TextField id="city" name="city" label="City" variant="standard" value={formValues.city} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField id="state" name="state" label="State" variant="standard" value={formValues.state} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField id="zipCode" name="zipCode" label="Zip Code" type="number" variant="standard" value={formValues.zipCode} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField id="address" name="address" label="Address" variant="standard" value={formValues.address} onChange={handleChange} sx={{ mb: 2 }} />

          {/* Add File Inputs */}
          <TextField id="FrontAadhar" name="FrontAadhar" type="file" label="Front Aadhar" onChange={handleChange} InputLabelProps={{ shrink: true }} />
          <TextField id="BackAadhar" name="BackAadhar" type="file" label="Back Aadhar" onChange={handleChange} InputLabelProps={{ shrink: true }} />
          <TextField id="PanCard" name="PanCard" type="file" label="Pan Card" onChange={handleChange} InputLabelProps={{ shrink: true }} />
          <TextField id="ProfilePhoto" name="ProfilePhoto" type="file" label="Profile Photo" onChange={handleChange} InputLabelProps={{ shrink: true }} />
          <TextField id="VisitOffice" name="VisitOffice" label="Visit Office" variant="standard" value={formValues.VisitOffice} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField id="CancelledCheck" name="CancelledCheck" type="file" label="Cancelled Check" onChange={handleChange} InputLabelProps={{ shrink: true }} />
          <TextField id="Logo" name="Logo" type="file" label="Logo" onChange={handleChange} InputLabelProps={{ shrink: true }} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={onSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateUserPop;
