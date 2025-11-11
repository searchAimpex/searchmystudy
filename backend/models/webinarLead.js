import mongoose from 'mongoose';

const webinarLead = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        number :{
            type:String,
            default:''
        },
        state:{
            type:String,
            require:true
        },
        country:{
            type:String,
            require:true
        }
    },
    {
      timestamps: true,
    }
);

const webinarleads= mongoose.model('webinarleads', webinarLead);
export default webinarleads;