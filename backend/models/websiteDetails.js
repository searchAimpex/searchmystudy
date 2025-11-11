import mongoose from 'mongoose';

const websiteDetails = mongoose.Schema(
    {
        counselling_no:{
            type:String
        },
        call_no:{
            type:String,
        },
        whatsapp_no:{
            type:String
        },
        mail:{
            type:String
        },
        insta:{
            type:String
        },
        facebook:{
            type:String
        },
        linkedIn:{
            type:String
        },
        twitter:{
            type:String
        },
        address:{
            type:String
        }

    },
    {
      timestamps: true,
    }
);

const websiteDetail = mongoose.model('websiteDetails', websiteDetails);
export default websiteDetail;