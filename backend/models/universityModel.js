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
        
    },
    {
      timestamps: true,
    }
);

const University = mongoose.model('University', universitySchema);
export default University;