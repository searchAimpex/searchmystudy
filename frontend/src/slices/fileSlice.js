import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    file: [],
};
  

  const fileSlice = createSlice({ 
    name: 'file',
    initialState,
    reducers: {
        CreateFiles:(state,action)=>{
            state.file.push(action.payload)
        },
        FetchFiles:(state,action)=>{
          state.file = action.payload
        },
        DeleteOneFiles:(state,action)=>{
            console.log("action payload",action.payload)
            state.file = state.file.filter(item => item._id !== action.payload._id)
        }
    }
  })
export const { CreateFiles,FetchFiles,DeleteOneFiles } = fileSlice.actions;
export default fileSlice.reducer;