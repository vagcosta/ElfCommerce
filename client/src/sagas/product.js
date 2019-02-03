import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchProductsSuccess,
  fetchProductsFailed,
  submitProductSuccess,
  submitProductFailed,
  fetchProductDetailsSuccess,
  fetchProductDetailsFailed,
  searchProductsSuccess,
  searchProductsFailed,
  updateProductStatusSuccess,
  updateProductStatusFailed,
  fetchProductAttributesSuccess,
  fetchProductAttributesFailed,
  clearToken,
} from '../actions';
import config from '../config';

export function* fetchProducts(action) {
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
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(fetchProductsFailed());
    }
  }
}

export function* searchProducts(action) {
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
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(searchProductsFailed());
    }
  }
}

export function* fetchProductDetails(action) {
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
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(fetchProductDetailsFailed());
    }
  }
}

export function* upsertProduct(action) {
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
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(submitProductFailed());
    }
  }
}

export function* updateProductStatus(action) {
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
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(updateProductStatusFailed());
    }
  }
}

export function* fetchProductAttributes(action) {
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
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(fetchProductAttributesFailed());
    }
  }
}