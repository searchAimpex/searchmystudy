import mongoose from 'mongoose';

const testimonialSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true
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