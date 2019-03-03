import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import config from '../config';

const GET_STORE_SETTINGS = 'app.setting.getStoreSettings';
const GET_STORE_SETTINGS_SUCCESS = 'app.setting.getStoreSettingsSuccess';
const FAILED = 'app.setting.failed';
const CLEAR_SETTINGS = 'app.setting.clearSettings';

const initialState = {
  storeSettings: {},
  loaded: false,
  done: false,
  error: false,
};

export default function settingReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STORE_SETTINGS_SUCCESS:
      return { ...state, storeSettings: action.value };
    case FAILED:
      return { ...state, error: true };
    case CLEAR_SETTINGS:
      return { ...state, ...initialState };
    default:
      return state;
  }
}

export function fetchStoreSettings(data) {
  return { type: GET_STORE_SETTINGS, value: data };
}

export function fetchStoreSettingsSuccess(data) {
  return { type: GET_STORE_SETTINGS_SUCCESS, value: data };
}

export function fetchStoreSettingsFailed() {
  return { type: FAILED };
}

export function clearSettings() {
  return { type: CLEAR_SETTINGS };
}

export function* getStoreSettingsHandler(action) {
  try {
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/${action.value}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchStoreSettingsSuccess(res.data));
  } catch (error) {
    yield put(fetchStoreSettingsFailed());
  }
}

export const settingSagas = [
  takeEvery(GET_STORE_SETTINGS, getStoreSettingsHandler),
];
