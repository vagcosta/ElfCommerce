import {
  FETCH_PARENT_CATEGORIES_SUCCESS,
  FETCH_PARENT_CATEGORIES_FAILED,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILED,
  SUBMIT_CATEGORY_SUCCESS,
  SUBMIT_CATEGORY_FAILED,
  FETCH_CATEGORY_DETAILS_SUCCESS,
  FETCH_CATEGORY_DETAILS_FAILED,
  UPDATE_CATEGORY_STATUS_SUCCESS,
  UPDATE_CATEGORY_STATUS_FAILED,
  CLEAR_CATEGORY_DETAILS,
} from '../actions';

const initialState = {
  categories: { data: [], count: 0 },
  categoryDetails: {},
  loaded: false,
  done: false,
  error: false,
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_CATEGORY_SUCCESS:
      return { ...state, categoryDetails: action.value, done: true };
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: action.value, loaded: true };
    case FETCH_CATEGORY_DETAILS_SUCCESS:
      return { ...state, categoryDetails: action.value };
    case UPDATE_CATEGORY_STATUS_SUCCESS:
      const newList = (state.categories.data.map(item => {

        if (item.code === action.value.categoryId) {

          item.status = action.value.status;
        }

        return item;
      }));

      return {
        ...state,
        categories: { data: newList, count: state.categories.count },
      };
    case SUBMIT_CATEGORY_FAILED:
    case FETCH_CATEGORIES_FAILED:
    case FETCH_CATEGORY_DETAILS_FAILED:
    case UPDATE_CATEGORY_STATUS_FAILED:
      return { ...state, error: true };
    case CLEAR_CATEGORY_DETAILS:
      return { ...state, ...initialState };
    default:
      return state;
  }
}
