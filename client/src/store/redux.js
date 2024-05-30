import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import productSlice from './products/productSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import userSlice from './user/userSlice';

const commonConfig = {
    key: 'shop/user',
    storage,
};

const userConfig = {
    ...commonConfig,
    whitelist: ['isLoggedIn', 'token'],
};
export const store = configureStore({
    reducer: {
        app: appSlice,
        products: productSlice,
        user: persistReducer(userConfig, userSlice),
    },
});

export const persistStor = persistStore(store);
