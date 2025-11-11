import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    ticket: []
  };
  

  const ticketSlice = createSlice({ 
    name: 'ticket',
    initialState,
    reducers: {
        AllTicket:(state,action)=>{
            state.ticket = action.payload
        },
        DeletetTicket:(state,action)=>{
            console.log("action payload",action.payload)
            state.ticket = state.ticket.filter(item => item._id!== action.payload._id)
        },
        UpdateTicket: (state,action)=>{  
            console.log("what is action",action.payload)
            // Find the index of the user to update
            const index = state.ticket.findIndex(user => user._id === action.payload._id);
              if (index !== -1) {
                // Replace the old user with the updated user
                state.ticket[index] = action.payload;
              }
        },
     

    }
  })


  
export const { AllTicket,DeletetTicket,UpdateTicket} = ticketSlice.actions;

export default ticketSlice.reducer;