import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify
import { useUpdateLoanMutation, useUpdateOneTicketMutation } from '../../../slices/adminApiSlice';
import { UpdateTicket } from '../../../slices/ticketSlice';

export default function UpdateLoanStatus({ ticketId, open, handleClose }) {
  const [status, setStatus] = useState(''); // Initialize status
  const dispatch = useDispatch();
  const [UpdateLoan,{isSuccess}] = useUpdateLoanMutation();
  useEffect(()=>{
    if(isSuccess){
        toast.success('Ticket status updated successfully!');
        handleClose()
    }
  },[isSuccess])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare data for the update
      const data = {
        id: ticketId,
        raw: {
          status: status,
        },
      };
      console.log("fix data",data)
      // Dispatch the update action
      const res = await UpdateLoan(data).unwrap();
      console.log("res",res)
      dispatch(UpdateTicket(res));
    } catch (error) {
        console.log("error")
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Loan Status</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please select the new status for the ticket.
        </DialogContentText>
        <FormControl fullWidth variant="standard" margin="dense">
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {/* Map through your enum values to create options */}
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="processing">Processing</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>handleClose()}>Cancel</Button>
        <Button onClick={handleSubmit}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}
