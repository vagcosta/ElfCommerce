import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchStoreSettingsSuccess,
  fetchStoreSettingsFailed,
  clearToken,
} from '../actions';
import config from '../config';

export function* fetchStoreSettings(action) {
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
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(fetchStoreSettingsFailed());
    }
  }
}
