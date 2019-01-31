import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  authSuccess,
  authFailed,
} from '../actions';
import config from '../config';

export function* submitLoginData(action) {
  try {
    const { username, password } = action.value;
    const res = yield axios.post(`${config.apiDomain}/auth`, {
      username,
      password,
      grantType: 'password',
      scope: 'profile',
    });
    localStorage.setItem(config.accessTokenKey, res.data.accessToken);
    yield put(authSuccess(res.data));
  } catch (error) {
    yield put(authFailed());
  }
}

export function* clearToken() {
  localStorage.removeItem(config.accessTokenKey);
  yield put(authFailed());
}
