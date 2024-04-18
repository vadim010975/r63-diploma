import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { BosaNogaAPI, type ProductCard } from "../../entities/Service";

export interface ListMoviesState {
  items: ProductCard[],
  loading: boolean,
}

const initialState: ListMoviesState = {
  items: [],
  loading: false,
};

export const fetchTopSales = createAsyncThunk(
  "topSales/fetchTopSales",
  async () => {
    const response = await BosaNogaAPI.fetchTopSales();
    return response;
  },
);

export const topSalesSlice = createSlice({
  name: "topSales",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopSales.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTopSales.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTopSales.rejected, (state) => {
        state.loading = false;
      });
  },
});


export const selectTopSales = (state: RootState) => state.topSales;

export default topSalesSlice.reducer;