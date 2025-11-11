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
import { useCreateNotifcationMutation } from '../../../slices/adminApiSlice';
import { useDispatch } from 'react-redux';
import { AddNotifcation } from '../../../slices/notificationSlice';

function CreateNotificationPop({ open, handleClose }) {
    const [CreateNotifcation,{isSuccess}] = useCreateNotifcationMutation()
    const dispatch = useDispatch()
  const [formValues, setFormValues] = useState({
    message: '',
    role: '',
  });

  const roles = ['partner', 'franchise', 'counsellor'];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const onSubmit = async () => {

    console.log("fix",formValues)
    const res = await CreateNotifcation(formValues)
    dispatch(AddNotifcation(res))
    handleClose(); // Close the dialog after submission
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success('Notification Added Successfully');
    }
  }, [isSuccess])


  return (
    <Dialog fullWidth={true} open={open} onClose={handleClose}>
      <DialogTitle>Create Notification</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Create a notification for partners, franchise, or counsellors.
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
          {/* Message Input */}
          <TextField
            id="message"
            name="message"
            label="Message"
            variant="standard"
            value={formValues.message}
            onChange={handleChange}
            required
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
            sx={{ mt: 2 }}
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

export default CreateNotificationPop;
