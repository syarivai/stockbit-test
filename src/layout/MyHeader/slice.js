import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  search: 'Pokemon',
};

export const searchReducer = createSlice({
  name: 'searchReducer',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = searchReducer.actions;

export default searchReducer.reducer;
