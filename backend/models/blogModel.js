import mongoose from 'mongoose';

const blogSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        bannerURL:{
            type:String,
            required:true
        },
        date:{
            type:String
        },
        content:{
            type:String,
            default:""
        },
        thumbnailURL: {
            type: String,
            required:true,
        }
    },
    {
      timestamps: true,
    }
);

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;