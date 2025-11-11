import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    promotional: []
  };
  

  const promotionalSlice = createSlice({ 
    name: 'promotional',
    initialState,
    reducers: {
        AddPromotional:(state,action)=>{
            state.promotional.push(action.payload)
        },
        FetchPromotional:(state,action)=>{
          state.promotional = action.payload
        },
        DeletePromotionalState:(state,action)=>{
            console.log("action payload",action.payload)
            state.promotional = state.promotional.filter(item => item._id!== action.payload[0])
        }

    }
  })


  
export const { AddPromotional,FetchPromotional,DeletePromotionalState } = promotionalSlice.actions;

export default promotionalSlice.reducer;