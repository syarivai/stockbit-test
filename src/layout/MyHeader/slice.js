import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  search: 'Pokemon',
  searchSuggestion: [],
};

export const searchReducer = createSlice({
  name: 'searchReducer',
  initialState,
  reducers: {
    setSearchSuggestion: (state, action) => {
      state.searchSuggestion = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setSearch, setSearchSuggestion } = searchReducer.actions;

export default searchReducer.reducer;
