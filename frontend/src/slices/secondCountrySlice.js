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
        },
        updateSecondCountry:(state,action)=>{
          const index = state.SecondCountries.findIndex(user => user._id === action.payload._id);
          if (index !== -1) {
            // Replace the old user with the updated user
            state.SecondCountries[index] = action.payload;
          }
        }
    }
  })
export const { AddSecondCountry,FetchSecondCountry,updateSecondCountry } = secondCountrySlice.actions;
export default secondCountrySlice.reducer;