import mongoose from 'mongoose';

const webinarSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        imageURL:{
            type:String,
            required:true
        },
        date:{
            type:String,
            default:""
        },
        day: {
            type: String,
            
        },
        time:{
            type:String,
            default:""
        }
    },
    {
      timestamps: true,
    }
);

const Webinar = mongoose.model('Webinar', webinarSchema);
export default Webinar;