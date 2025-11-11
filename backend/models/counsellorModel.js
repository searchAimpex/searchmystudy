import mongoose from 'mongoose';

const counsellorSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        imageURL:{
            type:String,
            required:true
        },
        experience:{
            type:String,
            default:""
        },
        course: {
            type: String,
            required:true,
        }
    },
    {
      timestamps: true,
    }
);

const Counsellor = mongoose.model('Counsellor', counsellorSchema);
export default Counsellor;