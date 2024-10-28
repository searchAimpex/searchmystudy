import mongoose from 'mongoose';

// Ticket Schema
const transactionSchema = mongoose.Schema(
  {
    amount : {
        type: Number,
        required: true,
    },
    transactionDate : {
        type: String,
    },
    transactionMode : {
        type: String,
        required: true,
    },
    remarks : {
        type: String,
        
    },
    invoice: {
        type:String,
        default:""
    },

    recipt : {
        type:String,
        default:""
    },
    other : {
        type: String,
        default:""
    },
    centerCode: {
        type: String,
        required:true
    }

  },
  {
    timestamps: true,
  }
);


const Transaction = mongoose.model('Transaction', transactionSchema);

export  default Transaction ;