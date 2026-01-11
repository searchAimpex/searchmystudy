import mongoose from 'mongoose';

// Ticket Schema
const ticketSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
     remark:{
        type:String,
      },
    status: {
      type: String,
      enum: ['open', 'in-progress', 'resolved', 'closed'],
      default: 'open',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Urgent'],
      default: 'medium',
    },
    category: {
      type: String,
      required: true,
    },
    attachments: [
        {
        type:String
  }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    responses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TicketResponse',
    }],
  },
  {
    timestamps: true,
  }
);

const ticketResponseSchema = mongoose.Schema(
    {
      ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true,
      },
     
      content: {
        type: String,
        required: true,
      },
      attachments: [{
        fileName: String,
        fileUrl: String,
        uploadedAt: {
          type: Date,
          default: Date.now,
        }
      }],
      respondedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, // Tracks who replied (admin or user)
      }
    },
    {
      timestamps: true,
    }
  );

const Ticket = mongoose.model('Ticket', ticketSchema);
const TicketResponse = mongoose.model('TicketResponse', ticketResponseSchema);

export { Ticket, TicketResponse };