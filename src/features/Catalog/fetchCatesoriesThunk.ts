import { BosaNogaAPI } from "../../entities/Service";
import { UnknownAction } from "redux";
import { RootState } from "../../app/store";
import { ThunkAction } from "redux-thunk";
import {
  categoriesLoaded,
  categoriesLoadingStarted,
  loadingFailed,
} from "./catalogSlice";

export const fetchCategoriesThunk =
  (): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async (dispatch) => {
    try {
      dispatch(categoriesLoadingStarted());
      const r = await BosaNogaAPI.fetchCategories();
      if (r.status < 200 || r.status > 299) {
        const error = new Error(r.statusText);
        error.name = r.status.toString();
        throw error;
      }
      const response = await r.json();
      response.unshift({ id: null, title: "Все" });
      dispatch(categoriesLoaded(response));
    } catch (e) {
      dispatch(loadingFailed({
        message: (<Error>e).message,
        name: (<Error>e).name,
      }));
    }
  };
