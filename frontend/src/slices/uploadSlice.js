import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    upload: []
  };
  

  const uploadSlice = createSlice({ 
    name: 'upload',
    initialState,
    reducers: {
        AddUpload:(state,action)=>{
            state.upload.push(action.payload)
        },
        FetchUpload:(state,action)=>{
          state.upload = action.payload
        },
        DeleteUploadState:(state,action)=>{
            state.upload = state.upload.filter(item => item._id !== action.payload._id)
        }

    }
  })


  
export const { AddUpload,FetchUpload,DeleteUploadState } = uploadSlice.actions;

export default uploadSlice.reducer;