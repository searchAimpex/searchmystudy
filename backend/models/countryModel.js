import mongoose from 'mongoose';
const countrySchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        bullet:{
            type:String,
            default: ""
        },
        bannerURL:{
            type:String,
            required:true
        },
        flagURL : {
            type:String,
            required:true,
        },
        description:{
            type:String,
            default:""
        },
        sections: [
        {
          title: String,
          description: String,
          url: String
        }
      ], 
      eligiblity: [{
        type:String
    }],    
    Province: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Province'
        }],
    faq:[
        {
            question:String,
            answer:String
        }
    ]
    },
    {
      timestamps: true,
    }
);

const Country = mongoose.model('Country', countrySchema);
export default Country;