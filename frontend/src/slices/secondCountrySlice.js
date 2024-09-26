import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    SecondCountries: []  // To store single country data. For now it's an empty object, but it will be filled with fetched data.  // Array to store countries data. For now it's an empty array, but it will be filled with fetched data.  // To store single country data. For now it's an empty object, but it will be filled with fetched data.  // To store single country data. For now it's an empty object, but it will be filled
  };
  

  const secondCountrySlice = createSlice({ 
    name: 'SecondCountry',
    initialState,
    reducers: {
        AddSecondCountry:(state,action)=>{
            state.SecondCountries.push(action.payload)
        },
        FetchSecondCountry:(state,action)=>{
          state.SecondCountries = action.payload
        },
        DeleteSecondCountry:(state,action)=>{
            state.SecondCountries = state.SecondCountries.filter(item => item._id!== action.payload._id)
        }
    }
  })
export const { AddSecondCountry,FetchSecondCountry,DeleteSecondCountry } = secondCountrySlice.actions;
export default secondCountrySlice.reducer;