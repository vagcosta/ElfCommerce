import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchSuppliersSuccess,
  fetchSuppliersFailed,
  fetchSupplierDetailsSuccess,
  fetchSupplierDetailsFailed,
  clearToken,
  submitSupplierSuccess,
  submitSupplierFailed,
  updateSupplierStatusSuccess,
  updateSupplierStatusFailed,
} from '../actions';
import config from '../config';

export function* fetchSuppliers(action) {
  try {
    const { storeId, pageNo, pageSize } = action.value;
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/${storeId}/suppliers?page=${pageNo}&size=${pageSize}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchSuppliersSuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(fetchSuppliersFailed());
    }
  }
}

export function* fetchSupplierDetails(action) {
  try {
    const { storeId, supplierId } = action.value;
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/${storeId}/suppliers/${supplierId}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchSupplierDetailsSuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(fetchSupplierDetailsFailed());
    }
  }
}

export function* upsertSupplier(action) {
  try {
    const { value } = action;
    const res = yield axios({
      method: value.mode === 'new' ? 'post' : 'put',
      url: `${config.apiDomain}/stores/${value.storeId}/suppliers${value.mode === 'new' ? '' : '/' + value.supplierId}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
        'Content-Type': 'application/json',
      },
      data: action.value,
    });

    yield put(submitSupplierSuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(submitSupplierFailed());
    }
  }
}

export function* updateSupplierStatus(action) {
  try {
    const { storeId, supplierId } = action.value;
    const res = yield axios({
      method: 'delete',
      url: `${config.apiDomain}/stores/${storeId}/suppliers/${supplierId}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(updateSupplierStatusSuccess({ supplierId, status: 0 }));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(updateSupplierStatusFailed());
    }
  }
}