// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../modules/counter';
import shopReducer from '../modules/shopSlice'; 

const store = configureStore({
    reducer: {
        counter: counterReducer,
        shop: shopReducer,
    },
});

export default store;
