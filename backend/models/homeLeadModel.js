import mongoose from 'mongoose';

const homeLeadSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        phoneNo:{
            type:String,
            required:true
        },
        email:{
            type:String,
            default:""
        },
        country:{
            type:String,
            require:true
        },
        countryCode:{
            type:String,
            // require:true
        },
        message:{
            type:String,
            required:true
        }
    },
    {
      timestamps: true,
    }
);

const HomeLead = mongoose.model('HomeLead', homeLeadSchema);
export default HomeLead;