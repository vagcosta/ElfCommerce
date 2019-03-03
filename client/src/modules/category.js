import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import config from '../config';

const SUBMIT = 'app.category.submit';
const SUBMIT_SUCCESS = 'app.category.submitSuccess';
const GET_ALL = 'app.category.getAll';
const GET_ALL_SUCCESS = 'app.category.getAllSuccess';
const GET_ITEM = 'app.category.getItem';
const GET_ITEM_SUCCESS = 'app.category.getItemSuccess';
const UPDATE_ITEM_STATUS = 'app.category.updateItemStatus';
const UPDATE_ITEM_STATUS_SUCCESS = 'app.category.updateItemStatusSuccess';
const FAILED = 'app.category.failed';
const CLEAR_ITEM = 'app.category.clearItem';

const initialState = {
  categories: { data: [], count: 0 },
  categoryDetails: {},
  loaded: false,
  done: false,
  error: false,
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_SUCCESS:
      return { ...state, categoryDetails: action.value, done: true };
    case GET_ALL_SUCCESS:
      return { ...state, categories: action.value, loaded: true };
    case GET_ITEM_SUCCESS:
      return { ...state, categoryDetails: action.value };
    case UPDATE_ITEM_STATUS_SUCCESS:
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
    case FAILED:
      return { ...state, error: true };
    case CLEAR_ITEM:
      return { ...state, ...initialState };
    default:
      return state;
  }
}

export function fetchCategories(data) {
  return { type: GET_ALL, value: data };
}

export function fetchCategoriesSuccess(data) {
  return { type: GET_ALL_SUCCESS, value: data };
}

export function fetchCategoriesFailed() {
  return { type: FAILED };
}

export function fetchCategoryDetails(data) {
  return { type: GET_ITEM, value: data };
}

export function submitCategory(data) {
  return { type: SUBMIT, value: data };
}

export function submitCategorySuccess(data) {
  return { type: SUBMIT_SUCCESS, value: data };
}

export function submitCategoryFailed() {
  return { type: FAILED };
}

export function clearCategoryDetails() {
  return { type: CLEAR_ITEM };
}

export function fetchCategoryDetailsSuccess(data) {
  return { type: GET_ITEM_SUCCESS, value: data };
}

export function fetchCategoryDetailsFailed() {
  return { type: FAILED };
}

export function updateCategoryStatus(data) {
  return { type: UPDATE_ITEM_STATUS, value: data };
}

export function updateCategoryStatusSuccess(data) {
  return { type: UPDATE_ITEM_STATUS_SUCCESS, value: data };
}

export function updateCategoryStatusFailed() {
  return { type: FAILED };
}

export function* getCategoriesHandler(action) {
  try {
    const { storeId, pageNo, pageSize, activeOnly } = action.value;
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/${storeId}/categories?page=${pageNo}&size=${pageSize}${activeOnly ? '&activeOnly=true' : ''}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchCategoriesSuccess(res.data));
  } catch (error) {
    yield put(fetchCategoriesFailed());
  }
}

export function* getCategoryDetailsHandler(action) {
  try {
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/${action.value.storeId}/categories/${
        action.value.categoryId
        }`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchCategoryDetailsSuccess(res.data));
  } catch (error) {
    yield put(fetchCategoryDetailsFailed());
  }
}

export function* upsertCategoryHandler(action) {
  try {
    const { value } = action;
    const res = yield axios({
      method: value.mode === 'new' ? 'post' : 'put',
      url: `${config.apiDomain}/stores/${action.value.storeId}/categories${value.mode === 'new' ? '' : '/' + value.categoryId}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
        'Content-Type': 'application/json',
      },
      data: value,
    });

    yield put(submitCategorySuccess(res.data));
  } catch (error) {
    yield put(submitCategoryFailed());
  }
}

export function* updateCategoryStatusHandler(action) {
  try {
    const { storeId, categoryId, status } = action.value;
    const res = yield axios({
      method: !status ? 'delete' : 'patch',
      url: `${config.apiDomain}/stores/${storeId}/categories/${categoryId}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(updateCategoryStatusSuccess({ categoryId, status }));
  } catch (error) {
    yield put(updateCategoryStatusFailed());
  }
}

export const categorySagas = [
  takeEvery(GET_ALL, getCategoriesHandler),
  takeEvery(GET_ITEM, getCategoryDetailsHandler),
  takeEvery(SUBMIT, upsertCategoryHandler),
  takeEvery(UPDATE_ITEM_STATUS, updateCategoryStatusHandler),
];