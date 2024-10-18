import mongoose from 'mongoose';

const popupSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        details:{
            type:String,
            default:""
        },
    },
    {
      timestamps: true,
    }
);

const Popup = mongoose.model('Popup', popupSchema);

export default Popup;