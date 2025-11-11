import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    contactLead: [],
  
  };
  const contactLeadSlice = createSlice({ 
    name: 'ContactLead',
    initialState,
    reducers: {
        AddContactLead:(state,action)=>{
            state.contactLead.push(action.payload)
        },
        FetchContactLead:(state,action)=>{
          state.contactLead = action.payload
        },
        DeleteContactLead:(state,action)=>{
            console.log("action payload",action.payload)
            state.contactLead = state.contactLead.filter(item => item._id!== action.payload._id)
        }
    }
  })


  
export const { AddContactLead,FetchContactLead,DeleteContactLead} = contactLeadSlice.actions;

export default contactLeadSlice.reducer;