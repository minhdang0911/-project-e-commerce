// src/store/appSlice.js
import { createSlice } from '@reduxjs/toolkit';
// import { getNewProducts } from './asyncAction';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null,
    },
    reducers: {
        login: (state, action) => {
            console.log(action);
            state.isLoggedIn = action.payload.isLoggedIn;
            state.current = action.payload.userData;
            state.token = action.payload.token;
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(getNewProducts.pending, (state) => {
    //         state.isLoading = true;
    //     });
    //     builder.addCase(getNewProducts.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.newProducts = action.payload;
    //     });
    //     builder.addCase(getNewProducts.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.errorMessage = action.payload?.message;
    //     });
    // },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
