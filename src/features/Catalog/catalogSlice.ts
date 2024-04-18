import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  ProductCategory,
  ProductCard,
} from "../../entities/Service";

export interface catalogState {
  items: ProductCard[];
  catalogloading: boolean;
  categories: ProductCategory[];
  selectedCategoryId: number | null;
  categoriesloading: boolean;
  error: string;
  visibilityBtn: boolean,
  search: string,
}

const initialState: catalogState = {
  items: [],
  catalogloading: false,
  categories: [],
  selectedCategoryId: null,
  categoriesloading: false,
  error: "",
  visibilityBtn: true,
  search: "",
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    categoriesLoadingStarted(state) {
      state.categoriesloading = true;
    },
    categoriesLoaded(state, action) {
      state.categories = action.payload;
      state.categoriesloading = false;
    },
    catalogLoadingStarted(state) {
      state.catalogloading = true;
    },
    setCategoryById(state, action) {
      state.selectedCategoryId = action.payload;
    },
    updateCatalog(state, action) {
      state.items = action.payload;
      state.catalogloading = false;
    },
    addCatalog(state, action) {
      state.items = [...state.items, ...action.payload];
      state.catalogloading = false;
    },
    loadingFailed(state, action) {
      state.error = action.payload;
      state.categoriesloading = false;
      state.catalogloading = false;
    },
    renderBtn(state) {
      state.visibilityBtn = true;
    },
    hideBtn(state) {
      state.visibilityBtn = false;
    },
    setSearch(state, action) {
      state.search = action.payload;
    }
  }
});


export const selectCatalog = (state: RootState) => state.catalog;

export const {
  categoriesLoadingStarted,
  categoriesLoaded,
  setCategoryById,
  catalogLoadingStarted,
  updateCatalog,
  addCatalog,
  loadingFailed,
  renderBtn,
  hideBtn,
  setSearch,
} = catalogSlice.actions;

export default catalogSlice.reducer;
