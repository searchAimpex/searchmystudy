import { createSlice } from '@reduxjs/toolkit';

const initialState =  {
    video: [],  // Array to store counsellors data
 
}
const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    addVideo: (state, action) => {
      state.video.push(action.payload);
    },
    getVideo:(state,action) =>{
        state.video = action.payload;
    },
    deleteVideo:(state,action) =>{
      console.log("action payload",action.payload)
      state.video = state.video.filter(item => item._id!== action.payload._id)
    }
  },
});

export const { addVideo,getVideo,deleteVideo } = videoSlice.actions;
export default videoSlice.reducer;