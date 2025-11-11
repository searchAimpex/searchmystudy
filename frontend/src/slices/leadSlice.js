import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    homeLead: [],
  };
  const homeLeadSlice = createSlice({ 
    name: 'HomeLead',
    initialState,
    reducers: {
        AddHomeLead:(state,action)=>{
            state.homeLead.push(action.payload)
        },
        FetchHomeLead:(state,action)=>{
          state.homeLead = action.payload
        },
        DeleteHomeLead:(state,action)=>{
            console.log("action payload",action.payload)
            state.homeLead = state.homeLead.filter(item => item._id!== action.payload._id)
        }
    }
  })


  
export const { AddHomeLead,FetchHomeLead,DeleteHomeLead} = homeLeadSlice.actions;

export default homeLeadSlice.reducer;