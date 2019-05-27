import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import config from '../config';

const SUBMIT = 'app.auth.submit';
const SUBMIT_SUCCESS = 'app.auth.submitSuccess';
const CLEAR_TOKEN = 'CLEAR_TOKEN';
const FAILED = 'app.auth.failed';

const initialState = {
  auth: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_SUCCESS:
      return { ...state, auth: action.value };
    case FAILED:
      return { ...state, auth: false };
    default:
      return state;
  }
}

export function submitLoginData(data) {
  return { type: SUBMIT, value: data };
}

export function authSuccess(data) {
  return { type: SUBMIT_SUCCESS, value: data };
}

export function authFailed() {
  return { type: FAILED };
}

export function clearToken() {
  return { type: CLEAR_TOKEN };
}

export function* submitLoginDataHandler(action) {
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

export function* clearTokenHandler() {
  localStorage.removeItem(config.accessTokenKey);
  yield put(authFailed());
}

export const authSagas = [
  takeEvery(SUBMIT, submitLoginDataHandler),
  takeEvery(CLEAR_TOKEN, clearTokenHandler),
];
