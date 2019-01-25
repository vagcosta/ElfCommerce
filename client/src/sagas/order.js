import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchOrdersSuccess,
  fetchOrdersFailed,
  fetchOrderDetailsSuccess,
  fetchOrderDetailsFailed,
  submitOrderSuccess,
  submitOrderFailed,
  clearToken,
} from '../actions';
import config from '../config';

export function* fetchOrders(action) {
  try {
    const { storeId, pageNo, pageSize } = action.value;
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/${storeId}/orders?page=${pageNo}&size=${pageSize}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchOrdersSuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(fetchOrdersFailed());
    }
  }
}

export function* fetchOrderDetails(action) {
  try {
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/${action.value.storeId}/orders/${
        action.value.orderId
        }`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchOrderDetailsSuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(fetchOrderDetailsFailed());
    }
  }
}

export function* upsertOrder(action) {
  try {
    const { value } = action;
    const res = yield axios({
      method: value.mode === 'new' ? 'post' : 'put',
      url: `${config.apiDomain}/stores/${value.storeId}/orders${value.mode === 'new' ? '' : '/' + value.orderId}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
        'Content-Type': 'application/json',
      },
      data: value,
    });

    yield put(submitOrderSuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(submitOrderFailed());
    }
  }
}