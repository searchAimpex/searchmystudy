import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    media: [],
  
  };
  

  const mediaSlice = createSlice({ 
    name: 'media',
    initialState,
    reducers: {
        CreateMedias:(state,action)=>{
            state.media.push(action.payload)
        },
        FetchMedias:(state,action)=>{
          state.media = action.payload
        },
        DeleteOneMedia:(state,action)=>{
            console.log("action payload",action.payload)
            state.media = state.media.filter(item => item._id !== action.payload._id)
        }
    }
  })


  
export const { CreateMedias,FetchMedias,DeleteOneMedia } = mediaSlice.actions;

export default mediaSlice.reducer;