import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  blog: [],
  SingleBlog:{}
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    AddBlog:(state,action)=>{
        state.blog.push(action.payload)
    },
    FetchBlogs:(state,action)=>{
        state.blog = action.payload
    },
    SingleBlogs:(state,action)=>{
      state.SingleBlog = action.payload;
    },
    DeleteBlogs:(state,action)=>{
      state.blog = state.banner.blog(item => item._id!== action.payload._id)
  }
  },
});


export const { AddBlog,FetchBlogs,SingleBlogs,DeleteBlogs } = blogSlice.actions;

export default blogSlice.reducer;
