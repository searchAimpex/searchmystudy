import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {useCountryStatusUpdateMutation} from '../../slices/adminApiSlice.js';
// import { UpdateCountryStatus } from '../../slices/countrySlice.js';

function StatusUpdatePop({ open, handleClose, countryId, statuss }) {
    const [status, setStatus] = useState(false);
    const dispatch = useDispatch();
    const [CountryStatusUpdate,{isSuccess}] = useCountryStatusUpdateMutation();

    useEffect(() => {
        setStatus(statuss);
        if(isSuccess){
            toast.success('Country status updated successfully');
        }
    }, [statuss]);

    const handleStatusChange = (event) => {
        setStatus(event.target.checked);
    };

    const handleSave = async () => {
        try {
            let data = { 
                raw : {
                    mbbsAbroad: status,
                },
                id: countryId
            };
            console.log("sata",data)
            await CountryStatusUpdate(data);
            handleClose();

            // await dispatch(UpdateCountryStatus({ countryId, status }));
           
        } catch (error) {
            toast.error('Failed to update country status');
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update Country Status</DialogTitle>
            <DialogContent>
                <FormControlLabel
                    control={<Switch checked={status} onChange={handleStatusChange} />}
                    label="Active"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave} variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default StatusUpdatePop;
