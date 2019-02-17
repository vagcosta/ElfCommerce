import { call, all, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  fetchOrders,
  fetchOrderDetails,
  upsertOrder,
} from './order';
import {
  fetchProducts,
  fetchProductDetails,
  fetchProductAttributes,
  upsertProduct,
  searchProducts,
  updateProductStatus,
} from './product';
import {
  fetchCategories,
  fetchCategoryDetails,
  upsertCategory,
  updateCategoryStatus,
} from './category';
import {
  fetchSalesReportProducts,
  fetchSalesReportCategories,
} from './report';
import { fetchDashboardData } from './dashboard';
import { fetchStoreSettings } from './setting';
import {
  submitLoginData,
  clearToken,
} from './auth';
import {
  fetchSuppliers,
  fetchSupplierDetails,
  upsertSupplier,
  updateSupplierStatus,
} from './supplier';
import {
  fetchManufacturers,
  fetchManufacturerDetails,
  upsertManufacturer,
  updateManufacturerStatus,
} from './manufacturer';
import {
  fetchCountries,
  fetchCurrencies,
  uploadFile,
} from './public';
import {
  fetchAccounts,
  fetchAccountDetails,
  upsertAccount,
  updateAccountStatus,
} from './account';
import {
  CLEAR_TOKEN,
  FETCH_ORDERS,
  FETCH_ORDER_DETAILS,
  SUBMIT_ORDER,
  FETCH_CATEGORIES,
  FETCH_CATEGORY_DETAILS,
  FETCH_PRODUCTS,
  FETCH_PRODUCT_DETAILS,
  FETCH_PRODUCT_ATTRIBUTES,
  SEARCH_PRODUCTS,
  SUBMIT_PRODUCT,
  UPDATE_PRODUCT_STATUS,
  SUBMIT_CATEGORY,
  UPDATE_CATEGORY_STATUS,
  FETCH_SUPPLIERS,
  FETCH_SUPPLIER_DETAILS,
  SUBMIT_SUPPLIER,
  UPDATE_SUPPLIER_STATUS,
  FETCH_MANUFACTURERS,
  FETCH_MANUFACTURER_DETAILS,
  SUBMIT_MANUFACTURER,
  UPDATE_MANUFACTURER_STATUS,
  FETCH_DASHBOARD_DATA,
  FETCH_SALES_REPORT_PRODUCTS,
  FETCH_SALES_REPORT_CATEGORIES,
  FETCH_STORE_SETTINGS,
  SUBMIT_LOGIN_DATA,
  FETCH_COUNTRIES,
  FETCH_CURRENCIES,
  FETCH_ACCOUNT_DETAILS,
  SUBMIT_ACCOUNT,
  UPDATE_ACCOUNT_STATUS,
  UPLOAD_FILE,
  FETCH_ACCOUNTS,
} from '../actions';

export default function* rootSaga() {
  yield all([
    takeEvery(CLEAR_TOKEN, clearToken),
    takeEvery(FETCH_ORDERS, fetchOrders),
    takeEvery(FETCH_ORDER_DETAILS, fetchOrderDetails),
    takeEvery(SUBMIT_ORDER, upsertOrder),
    takeEvery(FETCH_CATEGORIES, fetchCategories),
    takeEvery(SUBMIT_CATEGORY, upsertCategory),
    takeEvery(UPDATE_CATEGORY_STATUS, updateCategoryStatus),
    takeEvery(FETCH_CATEGORY_DETAILS, fetchCategoryDetails),
    takeEvery(FETCH_PRODUCTS, fetchProducts),
    takeEvery(FETCH_PRODUCT_DETAILS, fetchProductDetails),
    takeEvery(FETCH_PRODUCT_ATTRIBUTES, fetchProductAttributes),
    takeEvery(SEARCH_PRODUCTS, searchProducts),
    takeEvery(SUBMIT_PRODUCT, upsertProduct),
    takeEvery(UPDATE_PRODUCT_STATUS, updateProductStatus),
    takeEvery(FETCH_DASHBOARD_DATA, fetchDashboardData),
    takeEvery(FETCH_SALES_REPORT_PRODUCTS, fetchSalesReportProducts),
    takeEvery(FETCH_SALES_REPORT_CATEGORIES, fetchSalesReportCategories),
    takeEvery(FETCH_STORE_SETTINGS, fetchStoreSettings),
    takeEvery(SUBMIT_LOGIN_DATA, submitLoginData),
    takeEvery(FETCH_SUPPLIERS, fetchSuppliers),
    takeEvery(FETCH_SUPPLIER_DETAILS, fetchSupplierDetails),
    takeEvery(SUBMIT_SUPPLIER, upsertSupplier),
    takeEvery(UPDATE_SUPPLIER_STATUS, updateSupplierStatus),
    takeEvery(FETCH_MANUFACTURERS, fetchManufacturers),
    takeEvery(SUBMIT_MANUFACTURER, upsertManufacturer),
    takeEvery(FETCH_MANUFACTURER_DETAILS, fetchManufacturerDetails),
    takeEvery(UPDATE_MANUFACTURER_STATUS, updateManufacturerStatus),
    takeEvery(FETCH_COUNTRIES, fetchCountries),
    takeEvery(FETCH_CURRENCIES, fetchCurrencies),
    takeEvery(FETCH_ACCOUNTS, fetchAccounts),
    takeEvery(FETCH_ACCOUNT_DETAILS, fetchAccountDetails),
    takeEvery(SUBMIT_ACCOUNT, upsertAccount),
    takeEvery(UPDATE_ACCOUNT_STATUS, updateAccountStatus),
    takeEvery(UPLOAD_FILE, uploadFile),
  ]);
}
