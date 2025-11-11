import mongoose from 'mongoose';

const mediaSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        imageURL:{
            type:String,
            required:true
        },
        articalURL:{
            type:String,
            default:""
        },
        description:{
            type:String,
            default:""
        }

       
    },
    {
      timestamps: true,
    }
);

const Media = mongoose.model('Media', mediaSchema);
export default Media;