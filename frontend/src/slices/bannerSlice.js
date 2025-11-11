import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    banner: []
  };
  

  const bannerSlice = createSlice({ 
    name: 'auth',
    initialState,
    reducers: {
        AddBanner:(state,action)=>{
            state.banner.push(action.payload)
        },
        FetchBanner:(state,action)=>{
          state.banner = action.payload
        },
        DeleteBannerState:(state,action)=>{
            console.log("action payload",action.payload)
            state.banner = state.banner.filter(item => item._id!== action.payload[0])
        }

    }
  })


  
export const { AddBanner,FetchBanner,DeleteBannerState } = bannerSlice.actions;

export default bannerSlice.reducer;