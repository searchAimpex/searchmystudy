import mongoose from 'mongoose';

const navSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },
    },
    {
      timestamps: true,
    }
);

const Nav = mongoose.model('Nav', navSchema);
export default Nav;