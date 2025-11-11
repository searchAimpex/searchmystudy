import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    transaction: []
  };
  

  const transactionSlice = createSlice({ 
    name: 'transaction',
    initialState,
    reducers: {
        AddTransaction:(state,action)=>{
            state.transaction.push(action.payload)
        },
        FetchAllTransactionss:(state,action)=>{
            state.transaction = action.payload
        },
        DeleteTransactionSlice:(state,action)=>{
            console.log("action payload",action.payload)
            state.transaction = state.transaction.filter(item => item._id!== action.payload._id)
        }
     

    }
  })


  
export const { AddTransaction,FetchAllTransactionss,DeleteTransactionSlice} = transactionSlice.actions;

export default transactionSlice.reducer;