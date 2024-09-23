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
import { useCreateUserMutation } from '../../../slices/usersApiSlice'; // Assuming you have a slice for creating users
import { useDispatch } from 'react-redux';

function CreateUserPop({ open, handleClose }) {
  const [createUser, { isSuccess }] = useCreateUserMutation(); // Updated mutation for creating users
  const dispatch = useDispatch();
  
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    role: '',
    name:''
  });

  const roles = ['partner', 'franchise', 'counsellor']; // Update role options as needed

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    const res = await createUser(formValues); // Assuming the API expects these fields// Update the Redux store with the new user
    handleClose(); // Close the dialog after submission
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
        <DialogContentText>
          Create a user by filling in the following fields.
        </DialogContentText>
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
          {/* Email Input */}
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="standard"
            value={formValues.email}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
            {/* Name Input */}
            <TextField
            id="name"
            name="name"
            label="Name"
            variant="standard"
            value={formValues.name}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />


          {/* Password Input */}
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="standard"
            value={formValues.password}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />

          {/* Role Dropdown */}
          <TextField
            id="role"
            name="role"
            label="Role"
            select
            value={formValues.role}
            onChange={handleChange}
            variant="standard"
            required
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </MenuItem>
            ))}
          </TextField>
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
