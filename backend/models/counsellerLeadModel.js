import mongoose from 'mongoose';

const counsellerLeadSchema = mongoose.Schema(
    {
        Counsellors: { type: mongoose.Schema.Types.ObjectId, ref: "Counsellor" },
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
        test : {
            type:String,
            default: "None"
        },
        score : {
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