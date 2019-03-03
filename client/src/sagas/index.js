import { all, takeEvery } from 'redux-saga/effects';
import { manufacturerSagas } from '../modules/manufacturer';
import { supplierSagas } from '../modules/supplier';
import { productSagas } from '../modules/product';
import { accountSagas } from '../modules/account';
import { authSagas } from '../modules/auth';
import { categorySagas } from '../modules/category';
import { orderSagas } from '../modules/order';
import {
  fetchSalesReportProducts,
  fetchSalesReportCategories,
} from './report';
import { dashboardSagas } from '../modules/dashboard';
import { fetchStoreSettings } from './setting';
import {
  fetchCountries,
  fetchCurrencies,
  uploadFile,
} from './public';
import {
  FETCH_SALES_REPORT_PRODUCTS,
  FETCH_SALES_REPORT_CATEGORIES,
  FETCH_STORE_SETTINGS,
  FETCH_COUNTRIES,
  FETCH_CURRENCIES,
  UPLOAD_FILE,
} from '../actions';

export default function* rootSaga() {
  yield all([
    takeEvery(FETCH_SALES_REPORT_PRODUCTS, fetchSalesReportProducts),
    takeEvery(FETCH_SALES_REPORT_CATEGORIES, fetchSalesReportCategories),
    takeEvery(FETCH_STORE_SETTINGS, fetchStoreSettings),
    takeEvery(FETCH_COUNTRIES, fetchCountries),
    takeEvery(FETCH_CURRENCIES, fetchCurrencies),
    takeEvery(UPLOAD_FILE, uploadFile),
    dashboardSagas,
    orderSagas,
    categorySagas,
    authSagas,
    accountSagas,
    productSagas,
    supplierSagas,
    manufacturerSagas,
  ]);
}
