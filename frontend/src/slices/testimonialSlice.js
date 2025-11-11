import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    testimonial: []
  };
  

  const testimonialSlice = createSlice({ 
    name: 'testimonial',
    initialState,
    reducers: {
        AddTestimonial:(state,action)=>{
            state.testimonial.push(action.payload)
        },
        FetchAllTestimonial:(state,action)=>{
            state.testimonial = action.payload
        },
        DeleteTestimonial:(state,action)=>{
            console.log("action payload",action.payload)
            state.testimonial = state.testimonial.filter(item => item._id!== action.payload._id)
        }
     

    }
  })


  
export const { AddTestimonial,FetchAllTestimonial,DeleteTestimonial} = testimonialSlice.actions;

export default testimonialSlice.reducer;