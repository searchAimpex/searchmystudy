import { Box, Dialog, Typography, Button, IconButton, Card, CardContent, Divider } from '@mui/material';
import { Description, Close, AttachMoney, VerifiedUser } from '@mui/icons-material';
import * as React from 'react';

const DetailedLoanPop = ({ open, handleClose, imageURL }) => {
  const { offerLetter, amount, status } = imageURL;

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="view-loan-dialog" maxWidth="sm" fullWidth>
      <Card sx={{ p: 2, position: 'relative' }}>
        <IconButton 
          onClick={handleClose} 
          sx={{ position: 'absolute', top: 8, right: 8, color: 'grey.500' }}
          aria-label="close"
        >
          <Close />
        </IconButton>
        
        <CardContent sx={{ textAlign: 'center', pb: 2 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>
            Loan Details
          </Typography>
          
          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
            <AttachMoney sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Amount: ${amount}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <VerifiedUser sx={{ color: 'secondary.main', mr: 1 }} />
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Status: {status}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Button
            variant="contained"
            color="primary"
            href={offerLetter}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<Description />}
            sx={{ mt: 2 }}
          >
            View Offer Letter (PDF)
          </Button>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default DetailedLoanPop;
