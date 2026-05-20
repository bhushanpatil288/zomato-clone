import { createSlice } from '@reduxjs/toolkit';
import { getOrders, updateOrderStatus } from './authThunk';

const initialState = {
  data: [],
  total: 0,
  page: 1,
  pages: 1,
  isLoading: false,
  errors: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  extraReducers: (builder) => {
    builder
      // ── Get orders ──
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.data = action.payload.data || [];
        state.total = action.payload.total || 0;
        state.page = action.payload.page || 1;
        state.pages = action.payload.pages || 1;
        state.isLoading = false;
        state.errors = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      })

      // ── Update order status ──
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const idx = state.data.findIndex((o) => o._id === action.payload._id);
        if (idx !== -1) state.data[idx] = action.payload;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.errors = action.payload;
      });
  },
});

export default orderSlice.reducer;
