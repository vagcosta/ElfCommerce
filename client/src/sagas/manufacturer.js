import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchManufacturersSuccess,
  fetchManufacturersFailed,
  fetchManufacturerDetailsSuccess,
  fetchManufacturerDetailsFailed,
  clearToken,
  submitManufacturerSuccess,
  submitManufacturerFailed,
  updateManufacturerStatusSuccess,
  updateManufacturerStatusFailed,
} from '../actions';
import config from '../config';

export function* fetchManufacturers(action) {
  try {
    const { storeId, pageNo, pageSize } = action.value;
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/${storeId}/manufacturers?page=${pageNo}&size=${pageSize}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchManufacturersSuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(fetchManufacturersFailed());
    }
  }
}

export function* fetchManufacturerDetails(action) {
  try {
    const { storeId, manufacturerId } = action.value;
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/${storeId}/manufacturers/${manufacturerId}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchManufacturerDetailsSuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(fetchManufacturerDetailsFailed());
    }
  }
}

export function* upsertManufacturer(action) {
  try {
    const { value } = action;
    const res = yield axios({
      method: value.mode === 'new' ? 'post' : 'put',
      url: `${config.apiDomain}/stores/${value.storeId}/manufacturers${value.mode === 'new' ? '' : '/' + value.manufacturerId}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
        'Content-Type': 'application/json',
      },
      data: value,
    });

    yield put(submitManufacturerSuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(submitManufacturerFailed());
    }
  }
}

export function* updateManufacturerStatus(action) {
  try {
    const { storeId, manufacturerId, status } = action.value;
    const res = yield axios({
      method: !status ? 'delete' : 'patch',
      url: `${config.apiDomain}/stores/${storeId}/manufacturers/${manufacturerId}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(updateManufacturerStatusSuccess({ manufacturerId, status }));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(updateManufacturerStatusFailed());
    }
  }
}
