import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Grid,
  TextField,
  FormLabel,
  Input,
  Button,
  Card,
  CardContent
} from '@mui/material';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase';
import { useCreateBlogMutation } from '../../../slices/adminApiSlice';
import { AddBlog } from '../../../slices/blogSlice';
import CircularProgress from '@mui/material/CircularProgress';
import TextEditor from '../TextEditor';

const storage = getStorage(app);

const CreateBlogPop = ({ open, handleClose }) => {
  // const[date,setDate] = useState("")
  const [formValues, setFormValues] = useState({
    title: '',
    content: '',
    date: '',
    bannerURL: '',
    thumbnailURL: '',
  });


  const [uploads, setUploads] = useState({
    banner: { progress: 0, preview: null, name: '', loading: false },
    thumbnail: { progress: 0, preview: null, name: '', loading: false }
  });

  const [wordCount, setWordCount] = useState(0);
  const maxWords = 400;

  const [CreateBlog, { isSuccess }] = useCreateBlogMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Blog has been created");
    }
  }, [isSuccess]);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const countWords = (htmlString) => {
    const plainText = htmlString.replace(/<[^>]+>/g, '').trim(); // Remove HTML tags
    return plainText === '' ? 0 : plainText.split(/\s+/).length;
  };

  const handleFileChange = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploads(prev => ({
      ...prev,
      [type]: { ...prev[type], loading: true, name: file.name }
    }));

    try {
      const previewURL = URL.createObjectURL(file);

      const progressInterval = setInterval(() => {
        setUploads(prev => ({
          ...prev,
          [type]: { ...prev[type], progress: Math.min(prev[type].progress + 10, 90) }
        }));
      }, 200);

      const storageRef = ref(storage, `${type}/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      clearInterval(progressInterval);

      setFormValues(prev => ({ ...prev, [`${type}URL`]: url }));
      setUploads(prev => ({
        ...prev,
        [type]: { progress: 100, preview: previewURL, name: file.name, loading: false }
      }));
    } catch (error) {
      toast.error(`Failed to upload ${type}`);
      setUploads(prev => ({
        ...prev,
        [type]: { progress: 0, preview: null, name: '', loading: false }
      }));
    }
  };

  const removeFile = (type) => {
    setFormValues(prev => ({ ...prev, [`${type}URL`]: '' }));
    setUploads(prev => ({
      ...prev,
      [type]: { progress: 0, preview: null, name: '', loading: false }
    }));
  };

  const onSubmit = async () => {
    try {
      console.log(formValues);

      const res = await CreateBlog(formValues).unwrap();
      // dispatch(AddBlog(res));
      // handleClose();
      // setFormValues({
      //   title: '',
      //   content: '',
      //   bannerURL: '',
      //   thumbnailURL: '',
      // });
      // setUploads({
      //   banner: { progress: 0, preview: null, name: '', loading: false },
      //   thumbnail: { progress: 0, preview: null, name: '', loading: false },
      // });
      // setWordCount(0);
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const FileUploadCard = ({ type, label }) => (
    <Card>
      <CardContent>
        <FormLabel htmlFor={type} sx={{ display: 'block', mb: 1 }}>
          {label}
        </FormLabel>
        <Box sx={{ width: '100%' }}>
          <Input
            id={type}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, type)}
            sx={{
              display: uploads[type].preview ? 'none' : 'block',
              width: '100%',
              cursor: 'pointer',
              padding: '10px 0',
            }}
          />
        </Box>

        {!uploads[type].preview && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 2,
            }}
          >
            <Upload sx={{ mr: 1 }} />
            <span>{uploads[type].loading ? 'Uploading...' : 'Choose file or drag and drop'}</span>
          </Box>
        )}

        {(uploads[type].progress > 0 || uploads[type].preview) && (
          <Box sx={{ mt: 2 }}>
            {uploads[type].preview ? (
              <Box sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    width: '100%',
                    height: '200px',
                    borderRadius: 1,
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <img
                    src={uploads[type].preview}
                    alt={`${type} preview`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => removeFile(type)}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      minWidth: 'unset',
                      width: 32,
                      height: 32,
                      p: 0,
                    }}
                  >
                    <X />
                  </Button>
                </Box>
                <Box sx={{ mt: 1, fontSize: '0.875rem', color: 'text.secondary' }}>
                  {uploads[type].name}
                </Box>
              </Box>
            ) : (
              <CircularProgress variant="determinate" value={uploads[type].progress} size={24} />
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          height: '90vh',
          maxHeight: '90vh',
          m: 2
        }
      }}
    >
      <DialogTitle sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        borderBottom: 1,
        borderColor: 'divider',
        pb: 2
      }}>
        <ImageIcon />
        Create New Blog Post
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Blog Title"
            name="title"
            value={formValues.title}
            onChange={handleTextChange}
            fullWidth
            variant="outlined"
          />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FileUploadCard type="banner" label="Upload Banner Image" />
            </Grid>
            <Grid item xs={12} md={6}>
              <FileUploadCard type="thumbnail" label="Upload Thumbnail Image" />
              <p className='text-red-300 mt-3 font-bold'>Image size should be 500 x 250px</p>
            </Grid>
          </Grid>
          <p className='text-red-300 mt-3 font-bold'>Image size should be 1200 x 600px</p>

          <Box sx={{ flex: 1, minHeight: '400px' }}>
            <FormLabel sx={{ display: 'block', mb: 1 }}>Content</FormLabel>
            <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, height: '100%' }}>
              <TextEditor
                value={formValues.content}
                onChange={(value) => {
                  setFormValues(prev => ({ ...prev, content: value.target.value }));
                  // setWordCount(countWords(value));
                }}
              />
            </Box>
            <Box sx={{ textAlign: 'right', mt: 1, fontSize: '0.9rem' }}>
              {wordCount} / {maxWords} words
            </Box>
          </Box>

          <div class="w-64">
            <label for="date" class="block mb-2 text-sm font-medium text-gray-700">
              Select a date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              // value={date}
              onChange={(e) => setFormValues((prev) => ({ ...prev, date: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            />
          </div>


        </Box>
      </DialogContent>
      <DialogActions sx={{
        borderTop: 1,
        borderColor: 'divider',
        p: 2,
        gap: 1
      }}>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={wordCount > maxWords}
        >
          Create Blog
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBlogPop;
