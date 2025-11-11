import mongoose from 'mongoose';

const videoSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        videoURL:{
            type:String,
            required:true
        },
        thumbnailURL :{
            type:String,
            default:''
        }
    },
    {
      timestamps: true,
    }
);

const Video = mongoose.model('Video', videoSchema);
export default Video;