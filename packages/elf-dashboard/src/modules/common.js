import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import config from '../config';

export const GET_CURRENCIES = 'app.common.getCurrencies';
export const GET_CURRENCIES_SUCCESS = 'app.common.getCurrenciesSuccess';
export const GET_COUNTRIES = 'app.common.getCountries';
export const GET_COUNTRIES_SUCCESS = 'app.common.getCountriesSuccess';
export const UPLOAD_FILE = 'app.common.uploadFile';
export const UPLOAD_FILE_SUCCESS = 'app.common.uploadFileSuccess';
export const FAILED = 'app.common.failed';

const initialState = {
  storeSettings: {},
  currencies: [],
  countries: [],
  uploadedFile: null,
};

export default function publicReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES_SUCCESS:
      return { ...state, countries: action.value };
    case GET_CURRENCIES_SUCCESS:
      return { ...state, currencies: action.value };
    case UPLOAD_FILE_SUCCESS:
      return { ...state, uploadedFile: action.value };
    case FAILED:
    default:
      return state;
  }
}

export function fetchCurrencies() {
  return { type: GET_CURRENCIES };
}

export function fetchCurrenciesSuccess(data) {
  return { type: GET_CURRENCIES_SUCCESS, value: data };
}

export function fetchCurrenciesFailed() {
  return { type: FAILED };
}

export function fetchCountries() {
  return { type: GET_COUNTRIES };
}

export function fetchCountriesSuccess(data) {
  return { type: GET_COUNTRIES_SUCCESS, value: data };
}

export function fetchCountriesFailed() {
  return { type: FAILED };
}

export function uploadFile(data) {
  return { type: UPLOAD_FILE, value: data };
}

export function uploadFileSuccess(data) {
  return { type: UPLOAD_FILE_SUCCESS, value: data };
}

export function uploadFileFailed() {
  return { type: FAILED };
}

export function* getCountriesHandler(action) {
  try {
    const res = yield axios.get(`${config.apiDomain}/countries`, {
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchCountriesSuccess(res.data));
  } catch (error) {
    yield put(fetchCountriesFailed());
  }
}

export function* getCurrenciesHandler(action) {
  try {
    const res = yield axios.get(`${config.apiDomain}/currencies`, {
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchCurrenciesSuccess(res.data));
  } catch (error) {
    yield put(fetchCurrenciesFailed());
  }
}

export function* uploadFileHandler(action) {
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
    yield put(uploadFileFailed());
  }
}

export const commonSagas = [
  takeEvery(GET_COUNTRIES, getCountriesHandler),
  takeEvery(GET_CURRENCIES, getCurrenciesHandler),
  takeEvery(UPLOAD_FILE, uploadFileHandler),
];