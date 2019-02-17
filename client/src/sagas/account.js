import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchAccountDetailsSuccess,
  fetchAccountDetailsFailed,
  fetchAccountsSuccess,
  fetchAccountsFailed,
  submitAccountSuccess,
  submitAccountFailed,
  updateAccountStatusSuccess,
  updateAccountStatusFailed,
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

export function* upsertAccount(action) {
  try {
    const { value } = action;
    const res = yield axios({
      method: value.mode === 'new' ? 'post' : 'put',
      url: `${config.apiDomain}/stores/${value.storeId}/accounts${value.mode === 'new' ? '' : '/' + value.accountId}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
        'Content-Type': 'application/json',
      },
      data: value,
    });

    yield put(submitAccountSuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(submitAccountFailed());
    }
  }
}

export function* updateAccountStatus(action) {
  try {
    const { storeId, accountId, status } = action.value;
    const res = yield axios({
      method: !status ? 'delete' : 'patch',
      url: `${config.apiDomain}/stores/${storeId}/accounts/${accountId}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(updateAccountStatusSuccess({ accountId, status }));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(updateAccountStatusFailed());
    }
  }
}
