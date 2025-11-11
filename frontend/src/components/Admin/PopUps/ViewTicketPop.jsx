import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,

  Typography,
  Divider,
  IconButton,
  TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useCreateResponseTicketMutation, useUpdateOneTicketMutation } from '../../../slices/adminApiSlice';
import { UpdateTicket } from '../../../slices/ticketSlice';
import CloseIcon from '@mui/icons-material/Close';
import AttachmentIcon from '@mui/icons-material/AttachFile';

export default function ViewTicketPop({ ticketData, open, handleClose }) {
  const [status, setStatus] = useState(ticketData.status);
  const [replyContent, setReplyContent] = useState('');
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [CreateResponseTicket, { isSuccess: replySuccess }] = useCreateResponseTicketMutation();
  const [UpdateOneTicket, { isSuccess }] = useUpdateOneTicketMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Ticket status updated successfully!');
      handleClose();
    }
  }, [isSuccess, handleClose]);

  useEffect(() => {
    if (replySuccess) {
      toast.success('Reply submitted successfully!');
      setReplyContent('');
    }
  }, [replySuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        id: ticketData._id,
        raw: {
          status: status,
        },
      };
      const res = await UpdateOneTicket(data).unwrap();
      dispatch(UpdateTicket(res));
    } catch (error) {
      console.error("Error updating ticket status:", error);
      toast.error('Failed to update ticket status');
    }
  };

  const handleReplySubmit = async () => {
    try {
      const response = await CreateResponseTicket({
        id: ticketData._id,
        raw: {
          content: replyContent,
          userId: userInfo._id,
        },
      }).unwrap();
      dispatch(UpdateTicket(res));

      console.log('Reply submitted successfully:', response);
    } catch (error) {
      console.error("Error submitting reply:", error);
      toast.error('Failed to submit reply');
    }
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose} TransitionProps={{ onExited: () => setStatus(ticketData.status) }}>
      <DialogTitle>
        <Typography variant="h5" component="span">View Ticket Details</Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          style={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Here are the details of the ticket:</DialogContentText>
        <Divider style={{ margin: '20px 0' }} />
        
        <Typography variant="h6">Title: {ticketData.title}</Typography>
        <Typography variant="body1" style={{ marginBottom: '10px' }}>
          Description: {ticketData.description}
        </Typography>
        <Typography variant="body2">
          <strong>Created By:</strong> {ticketData?.createdBy?.name} ({ticketData?.createdBy?.email})
        </Typography>
        <Typography variant="body2">
          <strong>Priority:</strong> {ticketData.priority}
        </Typography>
        <Typography variant="body2">
          <strong>Category:</strong> {ticketData.category}
        </Typography>
        <Typography variant="body2">
          <strong>Current Status:</strong> {ticketData.status}
        </Typography>
        <Typography variant="body2">
          <strong>Created At:</strong> {new Date(ticketData.createdAt).toLocaleString()}
        </Typography>
        <Typography variant="body2">
          <strong>Updated At:</strong> {new Date(ticketData.updatedAt).toLocaleString()}
        </Typography>
        
        {ticketData?.attachments?.length > 0 && (
          <>
            <Typography variant="body2" style={{ marginTop: '20px', fontWeight: 'bold' }}>
              Attachments:
            </Typography>
            {ticketData.attachments.map((attachment, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <AttachmentIcon style={{ marginRight: '5px', color: '#3f51b5' }} />
                <a href={attachment} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#3f51b5' }}>
                  Attachment {index + 1}
                </a>
              </div>
            ))}
          </>
        )}

        <Divider style={{ margin: '20px 0' }} />
        
        {/* Reply Section */}
        <Typography variant="h6">Reply to Ticket</Typography>
        <TextField
          label="Your Response"
          multiline
          fullWidth
          rows={4}
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          variant="outlined"
          style={{ marginTop: '10px' }}
        />

        <Divider style={{ margin: '20px 0' }} />
        
        {/* Responses Section in Chat Style */}
        <Typography variant="h6">Responses</Typography>
        {ticketData?.responses?.length > 0 ? (
          ticketData.responses.map((response, index) => {
            const isCurrentUser = response?.respondedBy?._id === userInfo._id;
            return (
              <div
                key={response._id}
                style={{
                  display: 'flex',
                  justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                  marginTop: '10px',
                }}
              >
                <div
                  style={{
                    maxWidth: '60%',
                    backgroundColor: isCurrentUser ? '#1976d2' : '#f5f5f5',
                    color: isCurrentUser ? '#fff' : '#000',
                    padding: '10px',
                    borderRadius: '10px',
                    borderBottomLeftRadius: isCurrentUser ? '10px' : '0',
                    borderBottomRightRadius: isCurrentUser ? '0' : '10px',
                  }}
                >
                  <Typography variant="body2">
                    {response.content}
                  </Typography>
                  <Typography variant="body2" style={{ marginTop: '5px' }}>
                    <strong>{isCurrentUser ? 'You' : response?.respondedBy?.name}:</strong> ({response?.respondedBy?.email})
                  </Typography>
                  <Typography variant="body2" style={{ marginTop: '5px' }}>
                    <strong>Responded At:</strong> {new Date(response.createdAt).toLocaleString()}
                  </Typography>
                </div>
              </div>
            );
          })
        ) : (
          <Typography variant="body2">No responses yet.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="secondary">Cancel</Button>
        <Button onClick={handleReplySubmit} variant="contained" color="primary" disabled={!replyContent}>Submit Reply</Button>
      </DialogActions>
    </Dialog>
  );
}
