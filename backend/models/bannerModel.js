import mongoose from 'mongoose';

const bannerSchema = mongoose.Schema(
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

const Banner = mongoose.model('Banner', bannerSchema);

export default Banner;