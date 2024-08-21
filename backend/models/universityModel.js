import mongoose from 'mongoose';

const universitySchema = mongoose.Schema(
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
        eligiblity: {
            type:String
        },    
        logo: {
            type: String,
            default: 'https://via.placeholder.com/150x150.png'
        },
        Province: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Province',
            required: true,
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
        type:{
            type: String,
            default: 'Public'
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