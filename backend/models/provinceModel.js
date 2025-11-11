import mongoose from 'mongoose';

const provinceSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        bannerURL:{
            type:String,
            required:true
        },
        heroURL : {
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
        eligiblity: [
            {
            type:String
            }
        ],    
    
        Country: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Country',
            required: true,
        }
    },
    {
      timestamps: true,
    }
);

const Province = mongoose.model('Province', provinceSchema);
export default Province;