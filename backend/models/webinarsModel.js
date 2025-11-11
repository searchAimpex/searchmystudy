import mongoose from 'mongoose';

const webinarSchema = mongoose.Schema(
    {
        trainer_name:{
            type:String,
            required:true
        },
        trainer_profession:{
            type:String,
            // required:true
        },
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
        weekday: {
            type: String,
            required : true
        },
        timeStart:{
            type:String,
            default:"",
            required : true
        },
        timeEnd:{
            type:String,
            default:"",
            required : true
        }
    },
    {
      timestamps: true,
    }
);

const Webinar = mongoose.model('Webinar', webinarSchema);
export default Webinar;