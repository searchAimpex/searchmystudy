import mongoose from 'mongoose';

const querySchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required :true
        },
        phone: {
            type:Number
        },
        message:{
            type:String
        }

    },
    {
      timestamps: true,
    }
);

const query = mongoose.model('query', querySchema);

export default query;