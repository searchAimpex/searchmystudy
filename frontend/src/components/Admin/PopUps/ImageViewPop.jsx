// ImageViewPop

import { Image } from '@mui/icons-material';
import { Box, Dialog } from '@mui/material';
import * as React from 'react';


const ImageViewPop = ({ open, handleClose, imageURL }) => {
  console.log("check")
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="view-banner-dialog">
      <Box sx={{ p: 2 }}>
        <img src={imageURL} alt="Banner Image" />
      </Box>
    </Dialog>
  );
};

export default ImageViewPop;
