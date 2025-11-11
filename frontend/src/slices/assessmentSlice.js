import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    assessment: [],
  };
  

  const assessmentSlice = createSlice({ 
    name: 'assessment',
    initialState,
    reducers: {
        
        fetchAssessment:(state,action)=>{
            state.assessment = action.payload;
        },
        statusAssessmentUpdate:(state,action)=>{
            console.log("action",action.payload)
            const index = state.assessment.findIndex(user => user._id === action.payload._id);
            if (index !== -1) {
              // Replace the old user with the updated user
              state.assessment[index] = action.payload;
            }
          },
          DeleteOneAssessment:(state,action)=>{
            state.assessment = state.assessment.filter(item => item._id!== action.payload._id)
          },
    }
  })


  
export const { fetchAssessment,statusAssessmentUpdate,DeleteOneAssessment } = assessmentSlice.actions;
export default assessmentSlice.reducer;