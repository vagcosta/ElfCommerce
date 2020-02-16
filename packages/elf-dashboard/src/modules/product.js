import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import config from '../config';

const GET_ALL = 'app.product.getAll';
const GET_ALL_SUCCESS = 'app.product.getAllSuccess';
const GET_ITEM = 'app.product.getItem';
const GET_ITEM_SUCCESS = 'app.product.getItemSuccess';
const GET_ITEM_ATTRIBUTES = 'app.product.getItemAttributes';
const GET_ITEM_ATTRIBUTES_SUCCESS = 'app.product.getItemAttributesSuccess';
const SUBMIT = 'app.product.submit';
const SUBMIT_SUCCESS = 'app.product.submitSuccess';
const SEARCH = 'app.product.search';
const SEARCH_SUCCESS = 'app.product.searchSuccess';
const UPDATE_ITEM_STATUS = 'app.product.updateItemStatus';
const UPDATE_ITEM_STATUS_SUCCESS = 'updateItemStatusSuccess';
const FAILED = 'app.product.failed';
const CLEAR_ITEM = 'app.product.clearItem';
const CLEAR_SEARCH = 'app.product.clearSearch';

const initialState = {
  products: null,
  productDetails: null,
  productAttributes: [],
  status: -1,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SUCCESS:
    case SEARCH_SUCCESS:
      return { ...state, products: action.value };
    case GET_ITEM_SUCCESS:
      return { ...state, productDetails: action.value };
    case GET_ITEM_ATTRIBUTES_SUCCESS:
      return { ...state, productAttributes: action.value };
    case SUBMIT_SUCCESS:
      return { ...state, productDetails: action.value, status: 1 };
    case UPDATE_ITEM_STATUS_SUCCESS:
      const newList = (state.products.data.map(item => {
        if (item.code === action.value.productId) {
          item.status = action.value.status;
        }

        return item;
      }));

      return {
        ...state,
        products: { data: newList, count: state.products.count },
      };
    case FAILED:
      return { ...state, status: 0 };
    case CLEAR_ITEM:
    case CLEAR_SEARCH:
      return { ...state, ...initialState };
    default:
      return state;
  }
}

export function fetchProducts(data) {
  return { type: GET_ALL, value: data };
}

export function fetchProductsSuccess(data) {
  return { type: GET_ALL_SUCCESS, value: data };
}

export function fetchProductsFailed() {
  return { type: FAILED };
}

export function fetchProductDetails(data) {
  return { type: GET_ITEM, value: data };
}

export function clearProductDetails() {
  return { type: CLEAR_ITEM };
}

export function fetchProductDetailsSuccess(data) {
  return { type: GET_ITEM_SUCCESS, value: data };
}

export function fetchProductDetailsFailed() {
  return { type: FAILED };
}

export function fetchProductAttributes(data) {
  return { type: GET_ITEM_ATTRIBUTES, value: data };
}

export function fetchProductAttributesSuccess(data) {
  return { type: GET_ITEM_ATTRIBUTES_SUCCESS, value: data };
}

export function fetchProductAttributesFailed() {
  return { type: FAILED };
}

export function submitProduct(data) {
  return { type: SUBMIT_SUCCESS, value: data };
}

export function submitProductSuccess(data) {
  return { type: SUBMIT_SUCCESS, value: data };
}

export function submitProductFailed() {
  return { type: FAILED };
}

export function searchProducts(data) {
  return { type: SEARCH, value: data };
}

export function searchProductsSuccess(data) {
  return { type: SEARCH_SUCCESS, value: data };
}

export function searchProductsFailed() {
  return { type: FAILED };
}

export function clearSearchProducts() {
  return { type: CLEAR_SEARCH };
}

export function updateProductStatus(data) {
  return { type: UPDATE_ITEM_STATUS, value: data };
}

export function updateProductStatusSuccess(data) {
  return { type: UPDATE_ITEM_STATUS_SUCCESS, value: data };
}

export function updateProductStatusFailed() {
  return { type: FAILED };
}

export function* getProductsHandler(action) {
  try {
    const { storeId, pageNo, pageSize } = action.value;
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/${storeId}/products?page=${pageNo}&size=${pageSize}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchProductsSuccess(res.data));
  } catch (error) {
    yield put(fetchProductsFailed());
  }
}

export function* searchProductsHandler(action) {
  try {
    const { storeId, keyword, pageNo, pageSize } = action.value;
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/${storeId}/products?q=${keyword}&page=${pageNo}&size=${pageSize}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(searchProductsSuccess(res.data));
  } catch (error) {
    yield put(searchProductsFailed());
  }
}

export function* getProductDetailsHandler(action) {
  try {
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/${action.value.storeId}/products/${
        action.value.productId
        }`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchProductDetailsSuccess(res.data));
  } catch (error) {
    yield put(fetchProductDetailsFailed());
  }
}

export function* upsertProductHandler(action) {
  try {
    const { value } = action;
    const res = yield axios({
      method: value.mode === 'new' ? 'post' : 'put',
      url: `${config.apiDomain}/stores/${value.storeId}/products${value.mode === 'new' ? '' : '/' + value.productId}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
      data: value,
    });

    yield put(submitProductSuccess(res.data));
  } catch (error) {
    yield put(submitProductFailed());
  }
}

export function* updateProductStatusHandler(action) {
  try {
    const { storeId, productId, status } = action.value;
    const res = yield axios({
      method: !status ? 'delete' : 'patch',
      url: `${config.apiDomain}/stores/${storeId}/products/${productId}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(updateProductStatusSuccess({ productId, status }));
  } catch (error) {
    yield put(updateProductStatusFailed());
  }
}

export function* getProductAttributesHandler(action) {
  try {
    const { storeId, productId } = action.value;
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/${storeId}/products/${productId}/attributes`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchProductAttributesSuccess(res.data));
  } catch (error) {
    yield put(fetchProductAttributesFailed());
  }
}

export const productSagas = [
  takeEvery(GET_ALL, getProductsHandler),
  takeEvery(SEARCH, searchProductsHandler),
  takeEvery(GET_ITEM, getProductDetailsHandler),
  takeEvery(SUBMIT, upsertProductHandler),
  takeEvery(UPDATE_ITEM_STATUS, updateProductStatusHandler),
  takeEvery(GET_ITEM_ATTRIBUTES, getProductAttributesHandler),
];