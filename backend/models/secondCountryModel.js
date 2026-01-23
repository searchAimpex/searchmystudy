import mongoose from 'mongoose';
const secondCountrySchema = mongoose.Schema(
    {
        name:{
            type:String,
        },
        country:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Country', // Reference to the User model
        },
        flagURL : {
            type:String,
            required:true,
        },
        currency: {
            type: String,
            required:true,
        },
        code : {
            type: String,
            required:true,
        },
        vfs:{
            type: String,
            default:""
        },
        step:{
            type: String,
            default:""
        },
        whyThisCountry: {
            type: String,
            default:""
        },
        faq: {
            type: String,
            default:""
        }
    },
    {
      timestamps: true,
    }
);

const SecondCountry = mongoose.model('SecondCountry', secondCountrySchema);
export default SecondCountry;