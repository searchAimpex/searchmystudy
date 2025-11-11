import mongoose from 'mongoose';

const generateTrackingId = () => {
    const randomFourDigit = Math.floor(1000 + Math.random() * 9000);
    return `STU${randomFourDigit}`;
};

const loanSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: ""
    },
    trackingId: {
        type: String,
        unique: true
    },
    middleName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    dob: {
        type: String,
        default: ""
    },
    mobileNumber: {
        type: String,
        default: ''
    },
    emailID: {
        type: String,
        default: ''
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null, // Set default to null

    },
    // Required fields

    offerLetter : { type: String },
    amount : {type: Number, required: true},
    passportDoc: {type: String, default:""},
    // Additional fields
    status: { 
        type: String, 
        default: "pending" ,
        enum: ['pending','processing','approved','rejected'],

    }
}, 
{
    timestamps: true,
});


// Pre-save hook to generate a unique tracking ID
loanSchema.pre('save', function (next) {
    if (!this.trackingId) {
      this.trackingId = generateTrackingId();
    }
    next();
  });

const Loan = mongoose.model('Loan', loanSchema);

export default Loan;
