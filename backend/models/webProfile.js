import mongoose from 'mongoose';

const webProfile = mongoose.Schema(
    {
        name:{
            type:String
        },
        email:{
            type:String,
        },
        number:{
            type:String
        },
        designation:{
            type:String
        },
        des:{
            type:String
        }

    },
    {
      timestamps: true,
    }
);

const websiteProfile = mongoose.model('websiteProfile', webProfile);
export default websiteProfile;