import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useCreateBlogMutation } from '../../../slices/adminApiSlice';
import { AddBlog } from '../../../slices/blogSlice';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch } from 'react-redux';
import { app } from '../../../firebase'; // Adjust the import path accordingly
import { toast } from 'react-toastify';

import TextEditor from '../TextEditor';

const storage = getStorage(app);

function CreateBlogPop({ open, handleClose }) {
  const [formValues, setFormValues] = useState({
    title: '',
    content: '',
    bannerURL: '',
    thumbnailURL: '',
  });
  const [CreateBlog, { isSuccess }] = useCreateBlogMutation();
  const dispatch = useDispatch();

  const handleChange = async (event) => {
    const { name, value, type, files } = event.target;

    if (type === 'file') {
      const file = files[0];
      if (file) {
        const imageURL = await uploadImage(file, name);
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: imageURL,
        }));
      }
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const uploadImage = async (file, fieldName) => {
    const storageRef = ref(storage, `${fieldName}/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const onSubmit = async () => {
    const res = await CreateBlog(formValues).unwrap();
    console.log("response", res);
    dispatch(AddBlog(res))
    handleClose();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Blog Added Successfully');
    }
  }, [isSuccess]);

  return (
    <div>
      <Dialog fullWidth={true} maxWidth='xl' open={open} onClose={handleClose}>
        <DialogTitle>Write a Blog</DialogTitle>
        <DialogContent>
          <DialogContentText>Add a new blog post.</DialogContentText>
          <Box className="flex flex-col m-auto w-full max-w-4xl p-4">
            <div className="flex flex-wrap space-x-4">
              <TextField
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
                variant="standard"
                name="title"
                value={formValues.title}
                onChange={handleChange}
                className="w-full md:w-1/2"
              />
              <TextField
                margin="dense"
                id="bannerURL"
                label="Banner"
                type="file"
                fullWidth
                variant="standard"
                name="bannerURL"
                onChange={handleChange}
                className="w-full md:w-1/2"
              />
              <TextField
                margin="dense"
                id="thumbnailURL"
                label="Thumnail"
                type="file"
                fullWidth
                variant="standard"
                name="thumbnailURL"
                onChange={handleChange}
                className="w-full md:w-1/2"
              />
            </div>
            <div className='border'>
              <TextEditor popupData={formValues.content} setPopUpData={setFormValues} />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="text-gray-500">Cancel</Button>
          <Button onClick={onSubmit} className="bg-blue-500 text-white">Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateBlogPop;
