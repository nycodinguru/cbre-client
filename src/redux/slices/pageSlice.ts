import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  currentPage: 0,
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    nextPage: (state) => {
      state.currentPage = state.currentPage + 1;
    },
    prevPage: (state) => {
      if (state.currentPage > 0){
        state.currentPage = state.currentPage - 1;
      }
    }
  },
});

export const {
  nextPage,
  prevPage,
} = pageSlice.actions

export default pageSlice.reducer
