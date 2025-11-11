import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  user:[],
  frenchise:[]
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
    fetchUser: (state,action)=>{
      state.user = action.payload;
    },UpdateUser: (state,action)=>{  
        // Find the index of the user to update
        const index = state.user.findIndex(user => user._id === action.payload._id);
          if (index !== -1) {
            // Replace the old user with the updated user
            state.user[index] = action.payload;
          }
    },
    deleteUser:(state,action)=>{
      state.user = state.user.filter(item => item._id!== action.payload._id)
    },
    fetchFrenchise: (state,action)=>{
      state.frenchise = action.payload;
    },
    UpdateFrenchise: (state,action)=>{
      // Find the index of the user to update
      const index = state.frenchise.findIndex(user => user._id === action.payload._id);
      if (index !== -1) {
        // Replace the old user with the updated user
        state.frenchise[index] = action.payload;
      }
    },
  },
});

export const { setCredentials, logout,fetchUser ,deleteUser,fetchFrenchise,UpdateUser,UpdateFrenchise} = authSlice.actions;

export default authSlice.reducer;
