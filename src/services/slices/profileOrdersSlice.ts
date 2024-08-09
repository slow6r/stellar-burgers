import { getFeedsApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TProfileOrdersState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isOrdersLoading: boolean;
  error: string | null;
};

const initialState: TProfileOrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isOrdersLoading: true,
  error: null
};

export const loadAllOrders = createAsyncThunk('orders/all/get', async () => {
  const result = await getFeedsApi();
  return result;
});

export const loadOrders = createAsyncThunk('orders/get', async () => {
  const result = await getOrdersApi();
  return result;
});

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getOrders: (state) => state.orders,
    getTotalOrders: (state) => state.total,
    getTotalTodayOrders: (state) => state.totalToday,
    getIsOrderLoading: (state: TProfileOrdersState): boolean =>
      state.isOrdersLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAllOrders.pending, (state) => {
        state.isOrdersLoading = true;
        state.error = null;
      })
      .addCase(loadAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.error = null;
        state.isOrdersLoading = false;
      })
      .addCase(loadAllOrders.rejected, (state, action) => {
        state.orders = [];
        state.total = 0;
        state.totalToday = 0;
        state.error = action.error.message as string;
        state.isOrdersLoading = false;
      })
      .addCase(loadOrders.pending, (state) => {
        state.isOrdersLoading = true;
        state.error = null;
      })
      .addCase(loadOrders.fulfilled, (state, action) => {
        state.isOrdersLoading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(loadOrders.rejected, (state, action) => {
        state.isOrdersLoading = false;
        state.error = action.error.message as string;
      });
  }
});

export const {
  getOrders,
  getTotalOrders,
  getTotalTodayOrders,
  getIsOrderLoading
} = ordersSlice.selectors;

export const ordersReducer = ordersSlice.reducer;
