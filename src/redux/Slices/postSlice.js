import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    allPosts: [],
    myPosts: [],
    favoriteImages: [],
  },
  reducers: {
    setAllPosts: (state, action) => {
      state.allPosts = action.payload;
    },
    setMyPosts: (state, action) => {
      state.myPosts = action.payload;
    },
    setFavoriteImages: (state, action) => {
      state.favoriteImages = action.payload;
    },
  },
});

export const { setAllPosts, setMyPosts,setFavoriteImages } = postSlice.actions;

export default postSlice.reducer;
