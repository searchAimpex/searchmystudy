import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Grid,
  TextField,
} from '@mui/material';
import { useCheckCenterMutation, useCreateTransactionMutation } from '../../../slices/adminApiSlice';
import { AddTransaction } from '../../../slices/transactionSlice';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useDispatch } from 'react-redux';
import { app } from '../../../firebase';
import { toast } from 'react-toastify';

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
    receipt: '',
    other: '',
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [centerExists, setCenterExists] = useState(true);
  
  const [createTransaction, { isSuccess }] = useCreateTransactionMutation();
  const [checkCenter] = useCheckCenterMutation();
  
  const dispatch = useDispatch();

  const validateRemarks = (value) => value.split(' ').length > 40;

  const handleChange = async (event) => {
    const { name, value, type, files } = event.target;
    
    if (type === 'file') {
      const file = files[0];
      if (file) {
        const fileURL = await uploadFile(file, name);
        setFormValues((prev) => ({ ...prev, [name]: fileURL }));
      }
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));

      if (name === 'remarks') {
        setErrors((prev) => ({
          ...prev,
          remarks: validateRemarks(value),
        }));
      } else if (name === 'centerCode') {
        try {
          const response = await checkCenter(value).unwrap();
          console.log('centercode',response)
          setCenterExists(response.message === 'Center not found.');
        } catch {
          setCenterExists(false);
          toast.error('Failed to verify center code.');
        }
      }

      validateForm();
    }
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
      centerCode: !formValues.centerCode.trim() || !centerExists,
      remarks: validateRemarks(formValues.remarks),
    };

    setErrors(formErrors);
    setIsFormValid(Object.values(formErrors).every((error) => !error));
  };

  const onSubmit = async () => {
    if (isFormValid) {
      try {
        const res = await createTransaction(formValues).unwrap();
        dispatch(AddTransaction({ ...res }));
        toast.success('Transaction created successfully');
        handleClose();
      } catch (error) {
        toast.error('Error creating transaction.');
      }
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
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>Create Transaction</DialogTitle>
      <DialogContent>
        <DialogContentText>Fill in the transaction details.</DialogContentText>
        <Box component="form" noValidate sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {[
              { id: 'amount', label: 'Amount', type: 'number', required: true },
              { id: 'transactionDate', label: 'Transaction Date', type: 'date' },
              { id: 'transactionID', label: 'Transaction ID' },
              { id: 'transactionMode', label: 'Transaction Mode', required: true },
              { id: 'remarks', label: 'Remarks' },
              { id: 'centerCode', label: 'Center Code', required: true },
            ].map(({ id, label, type = 'text', required = false }) => (
              <Grid key={id} item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id={id}
                  name={id}
                  label={label}
                  type={type}
                  variant="standard"
                  value={formValues[id]}
                  onChange={handleChange}
                  error={errors[id]}
                  helperText={
                    errors[id]
                      ? id === 'centerCode' && !centerExists
                        ? 'Center does not exist'
                        : `${label} is required`
                      : ''
                  }
                  InputLabelProps={type === 'date' ? { shrink: true } : {}}
                />
              </Grid>
            ))}
            {['invoice', 'receipt', 'other'].map((id) => (
              <Grid key={id} item xs={12} sm={4}>
                <TextField
                  fullWidth
                  id={id}
                  name={id}
                  type="file"
                  label={id.charAt(0).toUpperCase() + id.slice(1)}
                  variant="standard"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  helperText={`Upload ${id} file`}
                />
              </Grid>
            ))}
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
  );
}

export default CreateCenterTransactionPop;
