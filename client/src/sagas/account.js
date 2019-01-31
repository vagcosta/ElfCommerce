import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchAccountSuccess,
  fetchAccountFailed,
} from '../actions';
import config from '../config';

export function* fetchAccount(action) {
  try {
    const res = yield axios.get(`${config.apiDomain}/accounts/${action.value}`, {
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchAccountSuccess(res.data));
  } catch (error) {
    yield put(fetchAccountFailed());
  }
}
