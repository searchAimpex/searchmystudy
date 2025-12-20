import mongoose from 'mongoose';

const fileSchema = mongoose.Schema(
    {
        SecondCountry : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SecondCountry',
            required: true,
        },
        name:{ 
            type:String,
        },
        template:{
            type:String
        },
        broucher:{
            type:String

        },
        type:{
            type:String,
            enum:['TEMPLATE',"BROUCHER"]
        },
      
        university:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'University',
            required: true,
        }
    },

    {
      timestamps: true,
    }
);

const Files = mongoose.model('Files', fileSchema);
export default Files;