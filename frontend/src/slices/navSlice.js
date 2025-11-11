import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    nav: [],
  
  };
  

  const navSlice = createSlice({ 
    name: 'nav',
    initialState,
    reducers: {
        CreateNavs:(state,action)=>{
            state.nav.push(action.payload)
        },
        FetchNavs:(state,action)=>{
          state.nav = action.payload
        },
        DeleteOneNavs:(state,action)=>{
            console.log("action payload",action.payload)
            state.nav = state.nav.filter(item => item._id !== action.payload._id)
        }
    }
  })
export const { CreateNavs,FetchNavs,DeleteOneNavs } = navSlice.actions;
export default navSlice.reducer;