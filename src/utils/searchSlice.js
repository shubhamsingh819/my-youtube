const { createSlice } = require("@reduxjs/toolkit");

const searchSlice = createSlice({
  name: "search",
  initialState: {},
  reducers: {
    cacheResults: (state, action) => {
      state = Object.assign(state, action.payload);
    },
  },
});

export const {cacheResults} = searchSlice.actions;

export default searchSlice.reducer

//LRU cache results -> in this method we can restrict our cache to [100 ] or any numbers