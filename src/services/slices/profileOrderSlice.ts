import { TNewOrderResponse, orderBurgerApi, getOrderByNumberApi } from '@api';
import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TProfileOrderState = {
  orderRequest: boolean;
  orderState: TOrder | null;
};

const initialState: TProfileOrderState = {
  orderRequest: false,
  orderState: null
};

export const getOrderByNumberThunk = createAsyncThunk(
  'order/getOrderNumber',
  (data: number) => getOrderByNumberApi(data)
);

export const createOrder = createAsyncThunk(
  'order/create',
  async (itemsOrder: string[]) => {
    const result = await orderBurgerApi(itemsOrder);
    return result;
  }
);

export const profileOrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },
    setOrderModalData: (state, action: PayloadAction<TOrder>) => {
      state.orderState = action.payload;
    },
    resetOrderModalData: (state) => {
      state.orderState = null;
      state.orderRequest = false;
    }
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<TNewOrderResponse>) => {
          state.orderRequest = false;
          state.orderState = action.payload.order;
        }
      )
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const { setOrderRequest, setOrderModalData, resetOrderModalData } =
  profileOrderSlice.actions;
export const { getOrderRequest, getOrderModalData } =
  profileOrderSlice.selectors;
export const orderReducer = profileOrderSlice.reducer;
