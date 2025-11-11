import mongoose from 'mongoose';

const universitySchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true
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
        grade: {
            type: String,
            default:"A"
        },
        rating: {
            type:String,
            default:"5"
        },
        sections: [
            {
            title: String,
            description: String,
            url: String
            }
        ],        
        logo: {
            type: String,
            default: 'https://via.placeholder.com/150x150.png'
        },
        Province: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Province',
            required: false,  // optional field
        }], 
        Country: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Country',
            // required: true,
        },   
        Course: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            }
        ],
        campusLife: {
            type: String,
            default: ''
        },
        hostel : {
            type: String,
            default: ''
        },
        MCI:{
            type:Boolean,
            default:false
        },
        ECFMG:{
            type:Boolean,
            default:false
        },
        WHO:{
            type:Boolean,
            default:false
        },
        NMC:{
            type:Boolean,
            default:false
        },
        
        type:{
            type: String
        },
        rank: {
            type: Number,
            default: 0
        },
        UniLink: {
            type: String,
            default: ''
        }
    },
    {
      timestamps: true,
    }
);

const University = mongoose.model('University', universitySchema);
export default University;