import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    services: [],
    oneService: {} // to store one service data
  };
  

  const serviceSlice = createSlice({ 
    name: 'service',
    initialState,
    reducers: {
        AddService:(state,action)=>{
            state.services.push(action.payload)
        },
        FetchAllServices:(state,action)=>{
            state.services = action.payload
          },
          GetOneService:(state,action)=>{
            state.oneService = action.payload
          },
        DeleteService:(state,action)=>{
            console.log("action payload",action.payload)
            state.services = state.services.filter(item => item._id!== action.payload._id)
        }

    }
  })


  
export const { AddService,FetchAllServices,DeleteService,GetOneService} = serviceSlice.actions;

export default serviceSlice.reducer;