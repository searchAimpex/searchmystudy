import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    commission: []
  };
  

  const commissionSlice = createSlice({ 
    name: 'commission',
    initialState,
    reducers: {
        AddCommission:(state,action)=>{
            state.commission.push(action.payload)
        },
        FetchCommission:(state,action)=>{
          state.commission = action.payload
        },
        DeleteCommissionState:(state,action)=>{
            state.commission = state.commission.filter(item => item._id !== action.payload._id)
        }

    }
  })


  
export const { AddCommission,FetchCommission,DeleteCommissionState } = commissionSlice.actions;

export default commissionSlice.reducer;