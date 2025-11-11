import mongoose from 'mongoose';

const trainingLeadSchema = mongoose.Schema(
    {
        Date:{
            type:String,
            required:true
        },
        Time:{
            type:String,
            required:true
        },
        Reason:{
            type:String,
            default:""
        }
    },
    {
      timestamps: true,
    }
);

const TrainingLead = mongoose.model('HomeLead', trainingLeadSchema);
export default TrainingLead;