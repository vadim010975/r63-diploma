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
      const r = await BosaNogaAPI.fetchCatalog(q, categoryId, offset);
      if (r.status < 200 || r.status > 299) {
        const error = new Error(r.statusText);
        error.name = r.status.toString();
        throw error;
      }
      const response = await r.json();
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
      dispatch(loadingFailed({
        message: (<Error>e).message,
        name: (<Error>e).name,
      }));
    }
  };
