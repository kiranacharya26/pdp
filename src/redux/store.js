import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterSlice';
import contentReducer from './contentSlice';

const store = configureStore({
    reducer: {
        filter: filterReducer,
        content: contentReducer,
    },
});

export default store;