import mongoose from 'mongoose';

const contactLeadSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        phoneNo:{
            type:String,
        },
        email:{
            type:String,
            default:""
        },
        occupation: {
                type: String,
                default: ""
        },
        comment : {
            type: String,
            default: ""
        }
        
    },
    {
      timestamps: true,
    }
);

const ContactLead = mongoose.model('ContactLead', contactLeadSchema);
export default ContactLead;