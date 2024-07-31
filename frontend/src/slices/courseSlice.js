import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    courses: [],
    singleCourse: {}  // To store single country data. For now it's an empty object, but it will be filled with fetched data.  // Array to store countries data. For now it's an empty array, but it will be filled with fetched data.  // To store single country data. For now it's an empty object, but it will be filled with fetched data.  // To store single country data. For now it's an empty object, but it will be filled
  };
  

  const courseSlice = createSlice({ 
    name: 'course',
    initialState,
    reducers: {
        AddCourse:(state,action)=>{
            state.courses.push(action.payload)
        },
        FetchCourses:(state,action)=>{
          state.courses = action.payload
        },
        DeleteCourse:(state,action)=>{
           
            state.courses = state.courses.filter(item => item._id!== action.payload._id)
        },
        FetchOneCourses:(state,action)=>{
            state.singleCourse = action.payload
        }
    }
  })


  
export const { AddCourse,FetchCourses,DeleteCourse,FetchOneCourses } = courseSlice.actions;

export default courseSlice.reducer;