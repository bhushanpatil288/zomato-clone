import { createSlice } from "@reduxjs/toolkit";
import { getFoods } from "./authThunk";

const initialState = {
  data: null,
  isLoading: false,
  errors: null,
};

const foodSlice = createSlice({
  name: 'foods',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getFoods.fulfilled, (state, action)=>{
        state.data = action.payload;
        state.isLoading = false;
        state.errors = false;
      })
      .addCase(getFoods.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFoods.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload,
        state.data = null;
      });
  },
});

export default foodSlice.reducer;
