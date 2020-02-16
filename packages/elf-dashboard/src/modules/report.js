import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import config from '../config';

const GET_PRODUCT_SALES_REPORT = 'app.report.getProductSalesReport';
const GET_PRODUCT_SALES_REPORT_SUCCESS =
  'app.report.getProductSalesReportSuccess';
const GET_CATEGORY_SALES_REPORT = 'app.report.getCategorySalesReport';
const GET_CATEGORY_SALES_REPORT_SUCCESS =
  'app.report.getCategorySalesReportSuccess';
const FAILED = 'app.report.failed';

const initialState = {
  products: [],
  categories: [],
};

export default function reportReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_SALES_REPORT_SUCCESS:
      return { ...state, products: action.value };
    case GET_CATEGORY_SALES_REPORT_SUCCESS:
      return { ...state, categories: action.value };
    case FAILED:
    default:
      return state;
  }
}

export function fetchSalesReportProducts() {
  return { type: GET_PRODUCT_SALES_REPORT };
}

export function fetchSalesReportProductsSuccess(data) {
  return { type: GET_PRODUCT_SALES_REPORT_SUCCESS, value: data };
}

export function fetchSalesReportProductsFailed() {
  return { type: FAILED };
}

export function fetchSalesReportCategories() {
  return { type: GET_CATEGORY_SALES_REPORT };
}

export function fetchSalesReportCategoriesSuccess(data) {
  return { type: GET_CATEGORY_SALES_REPORT_SUCCESS, value: data };
}

export function fetchSalesReportCategoriesFailed() {
  return { type: FAILED };
}

export function* getSalesReportProductsHandler(action) {
  try {
    yield put(fetchSalesReportProductsSuccess([]));
  } catch (error) {
    yield put(fetchSalesReportProductsFailed());
  }
}

export function* getSalesReportCategoriesHandler(action) {
  try {
    yield put(fetchSalesReportCategoriesSuccess([]));
  } catch (error) {
    yield put(fetchSalesReportCategoriesFailed());
  }
}

export const reportSagas = [
  takeEvery(GET_PRODUCT_SALES_REPORT, getSalesReportProductsHandler),
  takeEvery(GET_CATEGORY_SALES_REPORT, getSalesReportCategoriesHandler),
];