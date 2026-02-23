import mongoose from 'mongoose';

const uploadSchema = mongoose.Schema(
    {   
        description:{
            type:String,
            default:""
        },
        countryName:{
            type:String,
            default:""
        },
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
            type:Boolean,
            default:false
        },
        target1:{
            type:Boolean,
            default:false
        }
    },
    {
      timestamps: true,
    }
);

const Upload = mongoose.model('Upload', uploadSchema);

export default Upload;