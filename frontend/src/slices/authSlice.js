import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  user:[]
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
    },
    deleteUser:(state,action)=>{
      state.user = state.user.filter(item => item._id!== action.payload._id)
  }
  },
});

export const { setCredentials, logout,fetchUser ,deleteUser} = authSlice.actions;

export default authSlice.reducer;
