import mongoose from 'mongoose';

const contact = mongoose.Schema(
    {
        name:{
            type:String,
            // required:true
        },
        phone:{
            type:String,
            // required:true
        },
        email:{
            type:String,
            // required:true
        },
        designation:{
            type:String,
            // required:true
        },
        profileImg:{
            type:String,
            // required:true
        },
        description:{
            type:String,
            // required:true
        },
        
    },
    {
      timestamps: true,
    }
);

const contacts = mongoose.model('contacts', contact);
export default contacts;