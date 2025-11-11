import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    loan: [],
  };
  const loanSlice = createSlice({ 
    name: 'loan',
    initialState,
    reducers: {
        FetchLoans:(state,action)=>{
          state.loan = action.payload
        },
        DeleteLoan:(state,action)=>{
            console.log("action payload",action.payload)
            state.loan = state.loan.filter(item => item._id!== action.payload._id)
        }
    }
  })


  
export const { FetchLoans,DeleteLoan} = loanSlice.actions;

export default loanSlice.reducer;