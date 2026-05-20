import { createSlice } from '@reduxjs/toolkit';
import { getFoods, addFood, updateFood, deleteFood } from './authThunk';

const initialState = {
  data: null,     // { success, count, data: [...] }
  isLoading: false,
  errors: null,
};

const foodSlice = createSlice({
  name: 'foods',
  initialState,
  extraReducers: (builder) => {
    builder
      // ── Get all foods ──
      .addCase(getFoods.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(getFoods.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.errors = null;
      })
      .addCase(getFoods.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
        state.data = null;
      })

      // ── Add food ──
      .addCase(addFood.fulfilled, (state, action) => {
        if (state.data?.data) {
          state.data.data.unshift(action.payload);
          state.data.count = (state.data.count || 0) + 1;
        }
      })
      .addCase(addFood.rejected, (state, action) => {
        state.errors = action.payload;
      })

      // ── Update food ──
      .addCase(updateFood.fulfilled, (state, action) => {
        if (state.data?.data) {
          const idx = state.data.data.findIndex((f) => f._id === action.payload._id);
          if (idx !== -1) state.data.data[idx] = action.payload;
        }
      })
      .addCase(updateFood.rejected, (state, action) => {
        state.errors = action.payload;
      })

      // ── Delete food ──
      .addCase(deleteFood.fulfilled, (state, action) => {
        if (state.data?.data) {
          state.data.data = state.data.data.filter((f) => f._id !== action.payload);
          state.data.count = Math.max(0, (state.data.count || 1) - 1);
        }
      })
      .addCase(deleteFood.rejected, (state, action) => {
        state.errors = action.payload;
      });
  },
});

export default foodSlice.reducer;
