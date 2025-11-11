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
import Grid from '@mui/material/Grid';
import { toast } from 'react-toastify';
import { useUpdateUserMutation } from '../../../slices/usersApiSlice'; 
import { useDispatch } from 'react-redux';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase'; // Ensure correct path for firebase config
import { UpdateFrenchise } from '../../../slices/authSlice';

const storage = getStorage(app);

function UpdateFranchisePop({ open, handleClose, userData }) {
  const [updateUser, { isSuccess }] = useUpdateUserMutation();
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    email: '',
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
    accountedDetails:'',
    IFSC:'',
    bankName:''
  });

  useEffect(() => {
    if (userData) {
      setFormValues(prevValues => ({
        ...prevValues,
        ...userData
      }));
    }
  }, [userData]);

  const roles = ['partner', 'franchise'];

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
    if (!file) return null;
    const storageRef = ref(storage, `users/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const onSubmit = async () => {
    try {
      const fileUploads = await Promise.all([
        formValues.FrontAadhar instanceof File ? uploadFile(formValues.FrontAadhar) : formValues.FrontAadhar,
        formValues.BackAadhar instanceof File ? uploadFile(formValues.BackAadhar) : formValues.BackAadhar,
        formValues.PanCard instanceof File ? uploadFile(formValues.PanCard) : formValues.PanCard,
        formValues.ProfilePhoto instanceof File ? uploadFile(formValues.ProfilePhoto) : formValues.ProfilePhoto,
        formValues.CancelledCheck instanceof File ? uploadFile(formValues.CancelledCheck) : formValues.CancelledCheck,
        formValues.Logo instanceof File ? uploadFile(formValues.Logo) : formValues.Logo,
      ]);

      const mediaData = {
        ...formValues,
        FrontAadhar:    fileUploads[0] || formValues.FrontAadhar,
        BackAadhar:     fileUploads[1] || formValues.BackAadhar,
        PanCard:        fileUploads[2] || formValues.PanCard,
        ProfilePhoto:   fileUploads[3] || formValues.ProfilePhoto,
        CancelledCheck: fileUploads[4] || formValues.CancelledCheck,
        Logo:           fileUploads[5] || formValues.Logo,
      };

      const res = await updateUser({ userId: userData._id,data:mediaData }).unwrap();
    //   dispatch({ type: 'user/updateUser', payload: res }); // Dispatch action
    console.log('res',res)
        dispatch(UpdateFrenchise(res))
      handleClose();
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('User Updated Successfully');
    }
  }, [isSuccess]);

  return (
    <Dialog fullWidth={true} open={open} onClose={handleClose}>
      <DialogTitle sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Update User</DialogTitle>
      <DialogContent sx={{ padding: '2rem' }}>
        <DialogContentText sx={{ mb: 3, fontSize: '1rem', color: '#6b6b6b' }}>
          Update the user information. Please ensure all required fields are completed.
        </DialogContentText>
        
        {/* Form fields */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="email"
              name="email"
              label="Email"
              fullWidth
              variant="outlined"
              value={formValues.email}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="name"
              name="name"
              label="Name"
              fullWidth
              variant="outlined"
              value={formValues.name}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="role"
              name="role"
              label="Role"
              select
              fullWidth
              variant="outlined"
              value={formValues.role}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Additional Fields */}
          <Grid item xs={12} sm={6}>
            <TextField
              id="OwnerName"
              name="OwnerName"
              label="Owner Name"
              fullWidth
              variant="outlined"
              value={formValues.OwnerName}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="OwnerFatherName"
              name="OwnerFatherName"
              label="Owner Father Name"
              fullWidth
              variant="outlined"
              value={formValues.OwnerFatherName}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="CenterCode"
              name="CenterCode"
              label="Center Code"
              fullWidth
              variant="outlined"
              value={formValues.CenterCode}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="ContactNumber"
              name="ContactNumber"
              label="Contact Number"
              fullWidth
              variant="outlined"
              value={formValues.ContactNumber}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="WhatsAppNumber"
              name="WhatsAppNumber"
              label="WhatsApp Number"
              fullWidth
              variant="outlined"
              value={formValues.WhatsAppNumber}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="DateOfBirth"
              name="DateOfBirth"
              label="Date of Birth"
              type="date"
              fullWidth
              variant="outlined"
              value={formValues.DateOfBirth}
              onChange={handleChange}
              sx={{ mb: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="city"
              name="city"
              label="City"
              fullWidth
              variant="outlined"
              value={formValues.city}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State"
              fullWidth
              variant="outlined"
              value={formValues.state}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="zipCode"
              name="zipCode"
              label="Zip Code"
              fullWidth
              variant="outlined"
              value={formValues.zipCode}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address"
              name="address"
              label="Address"
              fullWidth
              variant="outlined"
              value={formValues.address}
              onChange={handleChange}
              multiline
              rows={2}
              sx={{ mb: 2 }}
            />
          </Grid>

          {/* File Uploads */}
          <Grid item xs={12} sm={6}>
            <TextField
              id="FrontAadhar"
              name="FrontAadhar"
              label="Upload Front Aadhar"
              type="file"
              fullWidth
              variant="standard"
              onChange={handleChange}
              inputProps={{ accept: 'image/*' }}
              sx={{
                mb: 2,
                '& .MuiInputLabel-root': {
                  transform: 'translate(14px, 12px) scale(1)',
                },
                '& .MuiInputBase-root': {
                  paddingTop: '20px',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="BackAadhar"
              name="BackAadhar"
              label="Back Aadhar"
              type="file"
              fullWidth
              variant="standard"
              onChange={handleChange}
              inputProps={{ accept: 'image/*' }}
              sx={{
                mb: 2,
                '& .MuiInputLabel-root': {
                  transform: 'translate(14px, 12px) scale(1)',
                },
                '& .MuiInputBase-root': {
                  paddingTop: '20px',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="PanCard"
              name="PanCard"
              label="Upload Pan Card"
              type="file"
              fullWidth
              onChange={handleChange}
              inputProps={{ accept: 'image/*' }}
              sx={{
                mb: 2,
                '& .MuiInputLabel-root': {
                  transform: 'translate(14px, 12px) scale(1)',
                },
                '& .MuiInputBase-root': {
                  paddingTop: '20px',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="ProfilePhoto"
              name="ProfilePhoto"
              label="Upload Profile Photo"
              type="file"
              fullWidth
              onChange={handleChange}
              inputProps={{ accept: 'image/*' }}
              sx={{
                mb: 2,
                '& .MuiInputLabel-root': {
                  transform: 'translate(14px, 12px) scale(1)',
                },
                '& .MuiInputBase-root': {
                  paddingTop: '20px',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="CancelledCheck"
              name="CancelledCheck"
              label="Upload Cancelled Check"
              type="file"
              fullWidth
              onChange={handleChange}
              inputProps={{ accept: 'image/*' }}
              sx={{
                mb: 2,
                '& .MuiInputLabel-root': {
                  transform: 'translate(14px, 12px) scale(1)',
                },
                '& .MuiInputBase-root': {
                  paddingTop: '20px',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="Logo"
              name="Logo"
              label="Upload Logo"
              type="file"
              fullWidth
              onChange={handleChange}
              inputProps={{ accept: 'image/*' }}
              sx={{
                mb: 2,
                '& .MuiInputLabel-root': {
                  transform: 'translate(14px, 12px) scale(1)',
                },
                '& .MuiInputBase-root': {
                  paddingTop: '20px',
                },
              }}
            />
          </Grid>   
          <Grid item xs={12} sm={6}>
            <TextField
              id="VisitOffice"
              name="VisitOffice"
              label="Visit Office"
              fullWidth
              variant="outlined"
              value={formValues.VisitOffice}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="accountedDetails"
              name="accountedDetails"
              label="Account Number"
              fullWidth
              variant="outlined"
              value={formValues.accountedDetails}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="IFSC"
              name="IFSC"
              label="IFSC CODE"
              fullWidth
              variant="outlined"
              value={formValues.IFSC}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="bankName"
              name="bankName"
              label="Bank Name"
              fullWidth
              variant="outlined"
              value={formValues.bankName}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button onClick={onSubmit} color="primary">Update User</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateFranchisePop;