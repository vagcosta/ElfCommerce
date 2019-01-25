export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';
export const FETCH_CURRENCIES_SUCCESS = 'FETCH_CURRENCIES_SUCCESS';
export const FETCH_CURRENCIES_FAILED = 'FETCH_CURRENCIES_FAILED';

export const FETCH_COUNTRIES = 'FETCH_COUNTRIES';
export const FETCH_COUNTRIES_SUCCESS = 'FETCH_COUNTRIES_SUCCESS';
export const FETCH_COUNTRIES_FAILED = 'FETCH_COUNTRIES_FAILED';

export const UPLOAD_FILE = 'UPLOAD_FILE';
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
export const UPLOAD_FILE_FAILED = 'UPLOAD_FILE_FAILED';

export function fetchCurrencies() {
  return { type: FETCH_CURRENCIES };
}

export function fetchCurrenciesSuccess(data) {
  return { type: FETCH_CURRENCIES_SUCCESS, value: data };
}

export function fetchCurrenciesFailed() {
  return { type: FETCH_CURRENCIES_FAILED };
}

export function fetchCountries() {
  return { type: FETCH_COUNTRIES };
}

export function fetchCountriesSuccess(data) {
  return { type: FETCH_COUNTRIES_SUCCESS, value: data };
}

export function fetchCountriesFailed() {
  return { type: FETCH_COUNTRIES_FAILED };
}

export function uploadFile(data) {
  return { type: UPLOAD_FILE, value: data };
}

export function uploadFileSuccess(data) {
  return { type: UPLOAD_FILE_SUCCESS, value: data };
}

export function uploadFileFailed() {
  return { type: UPLOAD_FILE_FAILED };
}

