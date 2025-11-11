import mongoose from 'mongoose';

const uploadSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        imageURL:{
            type:String,
            required:true
        },
        iconURL:{
            type:String,
            default:true
        },
        target:{
            type:String,
            default:"partner"
        }
    },
    {
      timestamps: true,
    }
);

const Upload = mongoose.model('Upload', uploadSchema);

export default Upload;