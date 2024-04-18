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
      const response = await BosaNogaAPI.fetchCategories();
      response.unshift({ id: null, title: "Все" });
      dispatch(categoriesLoaded(response));
    } catch (e) {
      dispatch(loadingFailed((<Error>e).message));
    }
  };
