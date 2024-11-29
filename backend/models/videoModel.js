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
        }
    },
    {
      timestamps: true,
    }
);

const Video = mongoose.model('Video', videoSchema);
export default Video;