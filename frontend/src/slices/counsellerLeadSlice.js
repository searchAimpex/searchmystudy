import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    counsellerLead: [],
  
  };
  

  const counsellerLeadSlice = createSlice({ 
    name: 'CounsellerLead',
    initialState,
    reducers: {
        AddCounsellerLead:(state,action)=>{
            state.counsellerLead.push(action.payload)
        },
        FetchCounsellerLead:(state,action)=>{
          state.counsellerLead = action.payload
        },
        DeleteCounsellerLead:(state,action)=>{
            console.log("action payload",action.payload)
            state.counsellerLead = state.counsellerLead.filter(item => item._id!== action.payload._id)
        }
    }
  })


  
export const { AddCounsellerLead,FetchCounsellerLead,DeleteCounsellerLead} = counsellerLeadSlice.actions;

export default counsellerLeadSlice.reducer;