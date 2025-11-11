import mongoose from 'mongoose';

const popupSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        imageURL:{
            type:String,
            default:"",
            required :true
        },
        target: {
            type: String,
            default:"partner"
        }

    },
    {
      timestamps: true,
    }
);

const Popup = mongoose.model('Popup', popupSchema);

export default Popup;