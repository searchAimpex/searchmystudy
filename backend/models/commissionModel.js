import mongoose from 'mongoose';

const commissionSchema = mongoose.Schema(
    {
        SecondCountry: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SecondCountry', // Reference to the User model
          },
          title : {
            type: String,
            default:""
          },
        fileURL:{
            type:String,
            required:true
        },
        target:{
            type:String,
            default:"partner"
        }
    },
    {
      timestamps: true,
    }
);

const Commission = mongoose.model('Commission', commissionSchema);

export default Commission;