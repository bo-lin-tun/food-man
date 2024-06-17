import {
  CreateOrderOptions,
  OrderSlice,
  RefreshOrderOptions,
  UpdateOrderOptions,
} from "@/types/order";
import { config } from "@/utils/config";
import { ORDERSTATUS, Order } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState: OrderSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (options: CreateOrderOptions, thunkApi) => {
    const { tableId, cartItems, onSuccess, onError } = options;
    try {
      const response = await fetch(`${config.orderApiUrl}/orders`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tableId, cartItems }),
      });
      const { orders } = await response.json();
      thunkApi.dispatch(setOrders(orders));
      onSuccess && onSuccess(orders);
    } catch (err) {
      onError && onError();
    }
  }
);

interface OrderUpdateOptions {
  itemId: string;
  status: ORDERSTATUS;
}

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (options: OrderUpdateOptions, thunkApi) => {
    const { itemId, status } = options;
    thunkApi.dispatch(setIsLoading(true));
    const response = await fetch(
      `${config.orderApiUrl}/orders?itemId=${itemId}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status }),
      }
    );
    const resData = await response.json();
    if (!response.ok) {
      return toast.error(resData.message);
    }
    thunkApi.dispatch(setOrders(resData.orders));
    thunkApi.dispatch(setIsLoading(false));
  }
);

export const refreshOrder = createAsyncThunk(
  "order/refreshOrder",
  async (options: RefreshOrderOptions, thunkApi) => {
    const { orderSeq, onSuccess, onError } = options;
    try {
      thunkApi.dispatch(setIsLoading(true));
      const response = await fetch(
        `${config.orderApiUrl}/orders?orderSeq=${orderSeq}`
      );
      const { orders } = await response.json();
      thunkApi.dispatch(setOrders(orders));
      thunkApi.dispatch(setIsLoading(false));
      onSuccess && onSuccess(orders);
    } catch (err) {
      onError && onError();
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.items = action.payload;
    },
    addOrders: (
      state,
      action: PayloadAction<{ orders: Order[]; tableId: string }>
    ) => {
      // const tableId = state.items[0].tableId;
      // const newOrders = action.payload.orders.filter(
      //   (item) => item.tableId === tableId
      // );
      // console.log("new order", newOrders, tableId);
      state.items = [...state.items, ...action.payload.orders];
    },
    removeOrders: (state, action: PayloadAction<Order[]>) => {
      if (!action.payload.length) return;
      const orderIds = action.payload.map((item) => item.id);
      state.items = state.items.filter((item) => !orderIds.includes(item.id));
    },
  },
});

export const { setOrders, setIsLoading, addOrders, removeOrders } =
  orderSlice.actions;
export default orderSlice.reducer;
