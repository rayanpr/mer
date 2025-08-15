import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser : null,
  isLoading: false,
  error: null,
  redirect: false
};

export const userSlice =  createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.currentUser = null;
      state.redirect = false
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.error = null;
      state.redirect = true
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action;
      state.currentUser = null;
      state.redirect = false
    }
  },
    
})

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions

export default userSlice.reducer