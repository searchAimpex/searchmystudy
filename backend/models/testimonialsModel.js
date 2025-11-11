import mongoose from 'mongoose';

const testimonialSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        name:{
            type:String
        },
        location:{
type:String
        },
        role:{
            type:String
        },
        degree:{    
            type:String
        },
        experience:{
            type:String
        },
        imageURL:{
            type:String,
            required:true
        },
        description:{
            type:String,
            default:""
        },
        rating: {
            type: Number,
            required:true,
            min:1,
            max:5,
            default:5   
        }
    },
    {
      timestamps: true,
    }
);

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;