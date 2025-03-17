import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedOptions: [],
    keyword: '',
    minPrice: 0,
    maxPrice: 499,
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.selectedOptions = action.payload.selectedOptions;
            state.keyword = action.payload.keyword;
            state.minPrice = action.payload.minPrice;
            state.maxPrice = action.payload.maxPrice;
        },
        resetFilter: (state) => {
            state.selectedOptions = [];
            state.keyword = '';
            state.minPrice = 0;
            state.maxPrice = 999;
        },
    },
});

export const { setFilter, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;