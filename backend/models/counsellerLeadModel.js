import mongoose from 'mongoose';

const counsellerLeadSchema = mongoose.Schema(
    {
        Counsellor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Counsellor',
        },  
        type : {
                type: String,
                enum:['MEDICAL',"ABROAD"]
        },
        name:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        },
        email:{
            type:String,
            default:""
        },
        city: {
            type: String,
            required:true
        },
        intersetedCountry : {
            type: String,
            required:true
        },
        intersetedCourse:{
            type:String,
            required:true
        },
        Test : {
            type:String,
            default: "None"
        },
        Score : {
            type:String,
            default: 0
        },

    },
    {
      timestamps: true,
    }
);

const CounsellerLead = mongoose.model('CounsellerLead', counsellerLeadSchema);
export default CounsellerLead;