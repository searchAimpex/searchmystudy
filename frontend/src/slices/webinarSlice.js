import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    webinar: [],
  
  };
  

  const webinarSlice = createSlice({ 
    name: 'webinar',
    initialState,
    reducers: {
        CreateWebinar:(state,action)=>{
            state.webinar.push(action.payload)
        },
        FetchWebinar:(state,action)=>{
          state.webinar = action.payload
        },
        DeleteOneWebinar:(state,action)=>{
            console.log("action payload",action.payload)
            state.webinar = state.webinar.filter(item => item._id !== action.payload._id)
        }
    }
  })


  
export const { CreateWebinar,FetchWebinar,DeleteOneWebinar } = webinarSlice.actions;

export default webinarSlice.reducer;