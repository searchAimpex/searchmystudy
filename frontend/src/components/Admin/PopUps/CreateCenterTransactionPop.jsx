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
import { DialogActions, Grid } from '@mui/material';

const storage = getStorage(app);

function CreateCenterTransactionPop({ open, handleClose }) {
  const [formValues, setFormValues] = useState({
    amount: '',
    transactionDate: '',
    transactionID: '',
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
    remarks: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [CreateTransaction, { isSuccess }] = useCreateTransactionMutation();
  const dispatch = useDispatch();

  const validateRemarks = (value) => value.split(' ').length > 40;

  const handleChange = async (event) => {
    const { name, value, type, files } = event.target;

    let fieldError = false;

    if (type === 'text' || type === 'number' || type === 'date') {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));

      fieldError = !value.trim() || (name === 'remarks' && validateRemarks(value));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: fieldError,
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

    validateForm();
  };

  const uploadFile = async (file, fieldName) => {
    const storageRef = ref(storage, `transactions/${fieldName}/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const validateForm = () => {
    const formErrors = {
      amount: !formValues.amount.trim(),
      transactionMode: !formValues.transactionMode.trim(),
      centerCode: !formValues.centerCode.trim(),
      remarks: validateRemarks(formValues.remarks),
    };

    setErrors(formErrors);

    const isValid = Object.values(formErrors).every((error) => !error);
    setIsFormValid(isValid);
  };

  const onSubmit = async () => {
    if (isFormValid) {
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
          <Box component="form" noValidate sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="transactionDate"
                  name="transactionDate"
                  label="Transaction Date"
                  type="date"
                  variant="standard"
                  value={formValues.transactionDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="transactionID"
                  name="transactionID"
                  label="Transaction ID"
                  variant="standard"
                  value={formValues.transactionID}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="transactionMode"
                  name="transactionMode"
                  label="Transaction Mode"
                  variant="standard"
                  value={formValues.transactionMode}
                  onChange={handleChange}
                  error={errors.transactionMode}
                  helperText={errors.transactionMode ? 'Transaction mode is required' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="remarks"
                  name="remarks"
                  label="Remarks"
                  variant="standard"
                  value={formValues.remarks}
                  onChange={handleChange}
                  error={errors.remarks}
                  helperText={errors.remarks ? 'Remarks should not exceed 40 words' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="centerCode"
                  name="centerCode"
                  label="Center Code"
                  variant="standard"
                  value={formValues.centerCode}
                  onChange={handleChange}
                  error={errors.centerCode}
                  helperText={errors.centerCode ? 'Center code is required' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  id="invoice"
                  name="invoice"
                  type="file"
                  label="Invoice"
                  variant="standard"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  helperText="Upload invoice file"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  id="recipt"
                  name="recipt"
                  type="file"
                  label="Receipt"
                  variant="standard"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  helperText="Upload receipt file"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  id="other"
                  name="other"
                  type="file"
                  label="Other"
                  variant="standard"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  helperText="Upload additional document"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={onSubmit} disabled={!isFormValid}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateCenterTransactionPop;
