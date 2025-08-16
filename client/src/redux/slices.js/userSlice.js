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
      state.redirect = false;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.error = null;
      state.redirect = true;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action;
      state.currentUser = null;
      state.redirect = false;
    },
    logout: (state) => {
      state.isLoading = false;
      state.error = null;
      state.currentUser = null;
      state.redirect = true;
    },
    updateUserStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.currentUser = null;
    },
    deleteUserStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.isLoading = false;
      state.currentUser = null;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.currentUser = null;
    },
  },
    
})

export const { loginStart, loginSuccess, loginFailure,  updateUserStart, updateUserSuccess, updateUserFailure, logout, deleteUserStart, deleteUserSuccess, deleteUserFailure } = userSlice.actions

export default userSlice.reducer