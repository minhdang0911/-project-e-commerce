// src/store/asyncAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from '../../apis';

export const getCurrent = createAsyncThunk('user/current', async (data, { rejectWithValue }) => {
    const response = await apis.apiGetCurrent();
    if (!response.success) return rejectWithValue(response);
    console.log('res', response);
    return response.rs;
});
