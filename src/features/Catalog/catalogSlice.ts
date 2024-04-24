import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  ProductCategory,
  ProductCard,
} from "../../entities/Service";

export interface catalogState {
  items: ProductCard[],
  catalogloading: boolean,
  categories: ProductCategory[],
  selectedCategoryId: number | null,
  categoriesloading: boolean,
  error: {name: string, message: string} | null,
  visibilityBtn: boolean,
  search: string,
}

const initialState: catalogState = {
  items: [],
  catalogloading: false,
  categories: [],
  selectedCategoryId: null,
  categoriesloading: false,
  error: null,
  visibilityBtn: true,
  search: "",
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    categoriesLoadingStarted(state) {
      state.categoriesloading = true;
      state.error = null;
    },
    categoriesLoaded(state, action) {
      state.categories = action.payload;
      state.categoriesloading = false;
      state.error = null;
    },
    catalogLoadingStarted(state) {
      state.catalogloading = true;
      state.error = null;
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
    },
    clearCatalog(state) {
      state.items = [];
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
  clearCatalog,
} = catalogSlice.actions;

export default catalogSlice.reducer;
