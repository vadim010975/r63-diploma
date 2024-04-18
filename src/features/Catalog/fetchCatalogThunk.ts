import { BosaNogaAPI } from "../../entities/Service";
import { UnknownAction } from "redux";
import { RootState } from "../../app/store";
import { ThunkAction } from "redux-thunk";
import {
  loadingFailed,
  catalogLoadingStarted,
  updateCatalog,
  addCatalog,
  hideBtn,
  renderBtn,
  clearCatalog,
} from "./catalogSlice";

export const fetchCatalogThunk =
  (offset: number | null = null): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async (dispatch, getState) => {
    try {
      if (!offset) {
        dispatch(clearCatalog());
      }
      dispatch(catalogLoadingStarted());
      const q = getState().catalog.search;
      const categoryId = getState().catalog.selectedCategoryId;
      const response = await BosaNogaAPI.fetchCatalog(q, categoryId, offset);
      dispatch(renderBtn());
      if (response.length < 6) {
        dispatch(hideBtn());
      }
      if (offset) {
        dispatch(addCatalog(response));
        return;
      }
      dispatch(updateCatalog(response));
    } catch (e) {
      dispatch(loadingFailed((<Error>e).message));
    }
  };
