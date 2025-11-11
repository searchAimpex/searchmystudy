import mongoose from 'mongoose';


const serviceSchenma =  mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    banner:{
        type:String,
        required:true
    },
    heading:{
        type:String,
    },
    card : {
        title:{
            type:String,
            required:true
        },
        cardImage:{
            type:String,
            required:true,
        },
        shortDescription:{
            type:String,
            required:true
        }
    },
    sectionOne: {
        heroOne: {
            type:String,

        },
        content:{
            type:String
        }
    },
    sectionTwo:{
        heroTwo: {
            type:String,
        },
        content:{
            type:String
        }
    },
    sectionThree:{
        heroThree: {
            type:String,
        },
        content:{
            type:String
        }
    },
    elegiblity:{
        title:{
            type:String,
            
        },
        pointerOne:{
            type:String,
        },
        pointerTwo:{
            type:String,
        },
        pointerThree:{
            type:String,
        },
        pointerFour:{
            type:String,
        },
        pointerFive:{
            type:String,
        },
        pointerSix:{
            type:String,
        },
        pointerSeven:{
            type:String,
        }


    }
},
{
  timestamps: true,
})

const Service = mongoose.model('Service', serviceSchenma);
export default Service;
