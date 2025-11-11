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
import { useCreateUserMutation } from '../../../slices/usersApiSlice';
import { useDispatch } from 'react-redux';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase';

const storage = getStorage(app);

function CreateUserPop({ open, handleClose }) {
  const [createUser, { isSuccess }] = useCreateUserMutation();
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

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
    accountedDetails: '',
    IFSC: '',
    bankName: ''
  });

  const roles = ['partner', 'franchise'];

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        return !value ? 'Email is required' :
          !/\S+@\S+\.\S+/.test(value) ? 'Email is invalid' : '';
      case 'password':
        return !value ? 'Password is required' :
          value.length < 6 ? 'Password must be at least 6 characters' : '';
      case 'role':
        return !value ? 'Role is required' : '';
      case 'name':
        return !value ? 'Name is required' : '';
      case 'ContactNumber':
        return !value ? 'Contact number is required' :
          !/^\d{10}$/.test(value) ? 'Invalid contact number' : '';
      case 'WhatsAppNumber':
        return !value ? 'WhatsApp number is required' :
          !/^\d{10}$/.test(value) ? 'Invalid WhatsApp number' : '';
      case 'accountedDetails':
        return !value ? 'Account number is required' :
          !/^\d{9,18}$/.test(value) ? 'Invalid account number' : '';
      case 'IFSC':
        return !value ? 'IFSC code is required' :
          !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value) ? 'Invalid IFSC code' : '';
      case 'zipCode':
        return !value ? 'Zip code is required' :
          !/^\d{6}$/.test(value) ? 'Invalid zip code' : '';
      default:
        return !value ? `${name} is required` : '';
    }
  };

  // Validate all fields
  const validateForm = () => {
    const errors = {};
    const requiredFields = [
      'email', 'password', 'role', 'name', 'OwnerName', 'ContactNumber',
      'WhatsAppNumber', 'CenterCode', 'DateOfBirth', 'city', 'state',
      'zipCode', 'address', 'accountedDetails', 'IFSC', 'bankName'
    ];

    requiredFields.forEach(field => {
      const error = validateField(field, formValues[field]);
      if (error) {
        errors[field] = error;
      }
    });

    // Validate required files
    const requiredFiles = ['FrontAadhar', 'BackAadhar', 'PanCard', 'ProfilePhoto'];
    requiredFiles.forEach(field => {
      if (!formValues[field]) {
        errors[field] = `${field.replace(/([A-Z])/g, ' $1').trim()} is required`;
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Quick presence-only check used to enable the Create button while user fills the form.
  const isFormFilled = () => {
    const requiredFields = [
      'email', 'password', 'role', 'name', 'OwnerName', 'ContactNumber',
      'WhatsAppNumber', 'CenterCode', 'DateOfBirth', 'city', 'state',
      'zipCode', 'address', 'accountedDetails', 'IFSC', 'bankName'
    ];
    for (const f of requiredFields) {
      const v = formValues[f];
      if (!v || (typeof v === 'string' && !v.trim())) return false;
    }
    const requiredFiles = ['FrontAadhar', 'BackAadhar', 'PanCard', 'ProfilePhoto'];
    for (const f of requiredFiles) {
      if (!formValues[f]) return false;
    }
    return true;
  };
  
  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    const newValue = type === 'file' ? (files && files[0] ? files[0] : null) : value;

    setFormValues(prevValues => ({
      ...prevValues,
      [name]: newValue
    }));

    // Clear error when field is modified
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Validate the changed field
    const error = validateField(name, newValue);
    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Use a lightweight presence check to enable the button while user fills the form.
  // Full validation still runs on submit (validateForm).
  useEffect(() => {
    setIsFormValid(isFormFilled());
  }, [formValues]);
  
  const uploadFile = async (file) => {
    if (!file) return null;
    const storageRef = ref(storage, `users/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const onSubmit = async () => {
    // if (!validateForm()) {
    //   toast.error('Please fill all required fields correctly');
    //   return;
    // }

    try {
      const fileUploads = await Promise.all([
        uploadFile(formValues.FrontAadhar),
        uploadFile(formValues.BackAadhar),
        uploadFile(formValues.PanCard),
        uploadFile(formValues.ProfilePhoto),
        uploadFile(formValues.CancelledCheck),
        uploadFile(formValues.Logo)
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

      await createUser(mediaData).unwrap();
      handleClose();
      toast.success('User Created Successfully');
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error('Failed to create user');
    }
  };

  return (
    <Dialog fullWidth={true} open={open} onClose={handleClose}>
      <DialogTitle sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Create New User</DialogTitle>
      <DialogContent sx={{ padding: '2rem' }}>
        <DialogContentText sx={{ mb: 3, fontSize: '1rem', color: '#6b6b6b' }}>
          Fill in the form to create a new user. All fields marked with * are required.
        </DialogContentText>
        
        <Grid container spacing={2}>
          {/* Existing Grid items with error handling */}
          <Grid item xs={12} sm={6}>
            <TextField
              id="email"
              name="email"
              label="Email *"
              fullWidth
              variant="outlined"
              value={formValues.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
              required
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="name"
              name="name"
              label="Name *"
              fullWidth
              variant="outlined"
              value={formValues.name}
              onChange={handleChange}
              error={!!formErrors.name}
              helperText={formErrors.name}
              required
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={formValues.password}
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
                  transform: 'translate(14px, 12px) scale(1)', // Adjust label position
                },
                '& .MuiInputBase-root': {
                  paddingTop: '20px', // Adjust padding to create space
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
                  transform: 'translate(14px, 12px) scale(1)', // Adjust label position
                },
                '& .MuiInputBase-root': {
                  paddingTop: '20px', // Adjust padding to create space
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
                  transform: 'translate(14px, 12px) scale(1)', // Adjust label position
                },
                '& .MuiInputBase-root': {
                  paddingTop: '20px', // Adjust padding to create space
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
                  transform: 'translate(14px, 12px) scale(1)', // Adjust label position
                },
                '& .MuiInputBase-root': {
                  paddingTop: '20px', // Adjust padding to create space
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
                  transform: 'translate(14px, 12px) scale(1)', // Adjust label position
                },
                '& .MuiInputBase-root': {
                  paddingTop: '20px', // Adjust padding to create space
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
                  transform: 'translate(14px, 12px) scale(1)', // Adjust label position
                },
                '& .MuiInputBase-root': {
                  paddingTop: '20px', // Adjust padding to create space
                },
              }}
            />
          </Grid>   
          <Grid item xs={12} sm={6}>
            <TextField
              id="VisitOffice"
              name="VisitOffice"
              label="Account Holder Name"
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
          {/* ... Rest of the form fields following the same pattern ... */}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button 
          onClick={onSubmit} 
          color="primary" 
          disabled={!isFormValid}
        >
          Create User
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateUserPop;