import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    student: [],
    // to store one service data
  };
  

  const studentSlice = createSlice({ 
    name: 'student',
    initialState,
    reducers: {
        
        FetchAllStudent:(state,action)=>{
            state.student = action.payload
          },
        statusUpdate:(state,action)=>{
            console.log("action",action.payload)
            const index = state.student.findIndex(user => user._id === action.payload._id);
            if (index !== -1) {
              // Replace the old user with the updated user
              state.student[index] = action.payload;
            }
          },
          DeleteOneStudent:(state,action)=>{
            state.student = state.student.filter(item => item._id!== action.payload._id)
          },
        },
        

    
  })


  
export const { FetchAllStudent,statusUpdate,DeleteOneStudent} = studentSlice.actions;

export default studentSlice.reducer;