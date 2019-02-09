import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchAccountDetailsSuccess,
  fetchAccountDetailsFailed,
  fetchAccountsSuccess,
  fetchAccountsFailed,
  clearToken,
} from '../actions';
import config from '../config';

export function* fetchAccounts(action) {
  try {
    const { storeId, pageNo, pageSize } = action.value;
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/${storeId}/accounts?page=${pageNo}&size=${pageSize}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchAccountsSuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(fetchAccountsFailed());
    }
  }
}

export function* fetchAccountDetails(action) {
  try {
    const { storeId, accountId } = action.value;
    const res = yield axios.get(`${config.apiDomain}/stores/${storeId}/accounts/${accountId}`, {
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchAccountDetailsSuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(fetchAccountDetailsFailed());
    }
  }
}
