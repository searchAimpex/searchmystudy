import mongoose from 'mongoose';

const promotionalSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        imageURL:{
            type:String,
            required:true
        },
        altName:{
            type:String,
            default:""
        },
    },
    {
      timestamps: true,
    }
);

const Promotional = mongoose.model('Promotional', promotionalSchema);

export default Promotional;