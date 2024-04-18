import { configureStore } from "@reduxjs/toolkit";
import topSalesReducer from "../features/TopSales/topSalesSlice";
import catalogReducer from "../features/Catalog/catalogSlice";
import cartReducer from "../features/Cart/cartSlice";

export const store = configureStore({
  reducer: {
    topSales: topSalesReducer,
    catalog: catalogReducer,
    cart: cartReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;