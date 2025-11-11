import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    notification:[],
    AllNotification:[]
  
  };
  

  const notificationSlice = createSlice({ 
    name: 'notification',
    initialState,
    reducers: {
        FetchNotifcation:(state,action)=>{
          state.notification = action.payload
        },
        AddNotifcation:(state,action)=>{
            state.notification.push(action.payload)
        },
        FetchAllNotifcation:(state,action)=>{
            state.AllNotification = action.payload
        }
    }
  })


  
export const { FetchNotifcation,AddNotifcation,FetchAllNotifcation } = notificationSlice.actions;

export default notificationSlice.reducer;