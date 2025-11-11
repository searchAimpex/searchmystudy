import { createSlice } from '@reduxjs/toolkit';

const initialState =  {
    counsellors: [],  // Array to store counsellors data
 
}
const counsellorSlice = createSlice({
  name: 'counsellors',
  initialState,
  reducers: {
    addCounsellor: (state, action) => {
      state.counsellors.push(action.payload);
    },
    getCounsellor:(state,action) =>{
        state.counsellors = action.payload;
    },
    deleteCounsellor:(state,action) =>{
      console.log("action payload",action.payload)
      state.counsellors = state.counsellors.filter(item => item._id!== action.payload._id)
    }
  },
});

export const { addCounsellor,getCounsellor,deleteCounsellor } = counsellorSlice.actions;
export default counsellorSlice.reducer;