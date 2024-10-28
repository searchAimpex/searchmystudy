import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useCreateTransactionMutation } from '../../../slices/adminApiSlice';
import { AddTransaction } from '../../../slices/transactionSlice';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useDispatch } from 'react-redux';
import { app } from '../../../firebase';
import { toast } from 'react-toastify';
import { DialogActions } from '@mui/material';

const storage = getStorage(app);

function CreateCenterTransactionPop({ open, handleClose }) {
  const [formValues, setFormValues] = useState({
    amount: '',
    transactionDate: '',
    transactionMode: '',
    remarks: '',
    centerCode: '',
    invoice: '',
    recipt: '',
    other: '',
  });

  const [errors, setErrors] = useState({
    amount: false,
    transactionMode: false,
    centerCode: false,
  });

  const [CreateTransaction, { isSuccess }] = useCreateTransactionMutation();
  const dispatch = useDispatch();

  const handleChange = async (event) => {
    const { name, value, type, files } = event.target;

    if (type === 'text' || type === 'number') {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: !value.trim(), // Set error to true if value is empty
      }));
    }

    if (type === 'file') {
      const file = files[0];
      if (file) {
        const fileURL = await uploadFile(file, name);
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: fileURL,
        }));
      }
    }
  };

  const uploadFile = async (file, fieldName) => {
    const storageRef = ref(storage, `transactions/${fieldName}/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const onSubmit = async () => {
    if (!errors.amount && !errors.transactionMode && !errors.centerCode) {
      const res = await CreateTransaction(formValues).unwrap();
      dispatch(AddTransaction({ ...res }));
      handleClose();
      toast.success('Transaction Added Successfully');
    } else {
      toast.error('Please fix the form errors.');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Transaction created successfully');
    }
  }, [isSuccess]);

  return (
    <div>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Create Transaction</DialogTitle>
        <DialogContent>
          <DialogContentText>Fill in the transaction details.</DialogContentText>
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
            <TextField
              id="amount"
              name="amount"
              label="Amount"
              variant="standard"
              type="number"
              value={formValues.amount}
              onChange={handleChange}
              error={errors.amount}
              helperText={errors.amount ? 'Amount is required' : ''}
            />
            <TextField
              id="transactionDate"
              name="transactionDate"
              label="Transaction Date"
              type="date"
              variant="standard"
              value={formValues.transactionDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              id="transactionMode"
              name="transactionMode"
              label="Transaction Mode"
              variant="standard"
              value={formValues.transactionMode}
              onChange={handleChange}
              error={errors.transactionMode}
              helperText={errors.transactionMode ? 'Transaction mode is required' : ''}
            />
            <TextField
              id="remarks"
              name="remarks"
              label="Remarks"
              variant="standard"
              value={formValues.remarks}
              onChange={handleChange}
            />
            <TextField
              id="centerCode"
              name="centerCode"
              label="Center Code"
              variant="standard"
              value={formValues.centerCode}
              onChange={handleChange}
              error={errors.centerCode}
              helperText={errors.centerCode ? 'Center code is required' : ''}
            />
            <TextField
              id="invoice"
              name="invoice"
              type="file"
              label="Invoice"
              variant="standard"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              helperText="Upload invoice file"
            />
            <TextField
              id="recipt"
              name="recipt"
              type="file"
              label="Receipt"
              variant="standard"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              helperText="Upload receipt file"
            />
            <TextField
              id="other"
              name="other"
              type="file"
              label="Other"
              variant="standard"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              helperText="Upload additional document"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            onClick={onSubmit}
            disabled={errors.amount || errors.transactionMode || errors.centerCode} 
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateCenterTransactionPop;
