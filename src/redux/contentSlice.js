import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    contentList: [],
    filteredContent: [],
    sortCriteria: 'name',
};

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        setContent: (state, action) => {
            state.contentList = action.payload;
            state.filteredContent = action.payload;
        },
        setFilteredContent: (state, action) => {
            state.filteredContent = action.payload;
        },
        setSortCriteria: (state, action) => {
            state.sortCriteria = action.payload;
        },
    },
});

export const { setContent, setFilteredContent, setSortCriteria } = contentSlice.actions;
export default contentSlice.reducer;