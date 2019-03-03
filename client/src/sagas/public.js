import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchCountriesSuccess,
  fetchCountriesFailed,
  fetchCurrenciesSuccess,
  fetchCurrenciesFailed,
  uploadFileSuccess,
  uploadFileFailed,
} from '../actions';
import {
  clearToken,
} from '../modules/auth';
import config from '../config';

export function* fetchCountries(action) {
  try {
    const res = yield axios.get(`${config.apiDomain}/countries`, {
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchCountriesSuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(fetchCountriesFailed());
    }
  }
}

export function* fetchCurrencies(action) {
  try {
    const res = yield axios.get(`${config.apiDomain}/currencies`, {
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchCurrenciesSuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(fetchCurrenciesFailed());
    }
  }
}

export function* uploadFile(action) {
  try {
    const { value } = action;
    const formData = new FormData();
    formData.append('image', value);

    const res = yield axios({
      method: 'post',
      url: `${config.apiDomain}/upload`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
        'content-type': 'multipart/form-data',
      },
      data: formData,
    });

    yield put(uploadFileSuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(uploadFileFailed());
    }
  }
}
