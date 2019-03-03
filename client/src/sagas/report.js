import { call, put } from 'redux-saga/effects';
import {
  fetchSalesReportProductsSuccess,
  fetchSalesReportProductsFailed,
  fetchSalesReportCategoriesSuccess,
  fetchSalesReportCategoriesFailed,
} from '../actions';

export function* fetchSalesReportProducts(action) {
  try {
    yield put(fetchSalesReportProductsSuccess([]));
  } catch (error) {
    yield put(fetchSalesReportProductsFailed());
  }
}

export function* fetchSalesReportCategories(action) {
  try {
    yield put(fetchSalesReportCategoriesSuccess([]));
  } catch (error) {
    yield put(fetchSalesReportCategoriesFailed());
  }
}
