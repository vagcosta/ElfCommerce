export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILED = 'FETCH_PRODUCTS_FAILED';

export const FETCH_PRODUCT_DETAILS = 'FETCH_PRODUCT_DETAILS';
export const CLEAR_PRODUCT_DETAILS = 'CLEAR_PRODUCT_DETAILS';
export const FETCH_PRODUCT_DETAILS_SUCCESS = 'FETCH_PRODUCT_DETAILS_SUCCESS';
export const FETCH_PRODUCT_DETAILS_FAILED = 'FETCH_PRODUCT_DETAILS_FAILED';

export const FETCH_PRODUCT_ATTRIBUTES = 'FETCH_PRODUCT_ATTRIBUTES';
export const FETCH_PRODUCT_ATTRIBUTES_SUCCESS =
  'FETCH_PRODUCT_ATTRIBUTES_SUCCESS';
export const FETCH_PRODUCT_ATTRIBUTES_FAILED =
  'FETCH_PRODUCT_ATTRIBUTES_FAILED';

export const SUBMIT_PRODUCT = 'SUBMIT_PRODUCT';
export const SUBMIT_PRODUCT_SUCCESS = 'SUBMIT_PRODUCT_SUCCESS';
export const SUBMIT_PRODUCT_FAILED = 'SUBMIT_PRODUCT_FAILED';

export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';
export const SEARCH_PRODUCTS_SUCCESS = 'SEARCH_PRODUCTS_SUCCESS';
export const SEARCH_PRODUCTS_FAILED = 'SEARCH_PRODUCTS_FAILED';
export const CLEAR_SEARCH_PRODUCTS = 'CLEAR_SEARCH_PRODUCTS';

export const UPDATE_PRODUCT_STATUS = 'UPDATE_PRODUCT_STATUS';
export const UPDATE_PRODUCT_STATUS_SUCCESS = 'UPDATE_PRODUCT_STATUS_SUCCESS';
export const UPDATE_PRODUCT_STATUS_FAILED = 'UPDATE_PRODUCT_STATUS_FAILED';

export function fetchProducts(data) {
  return { type: FETCH_PRODUCTS, value: data };
}

export function fetchProductsSuccess(data) {
  return { type: FETCH_PRODUCTS_SUCCESS, value: data };
}

export function fetchProductsFailed() {
  return { type: FETCH_PRODUCTS_FAILED };
}

export function fetchProductDetails(data) {
  return { type: FETCH_PRODUCT_DETAILS, value: data };
}

export function clearProductDetails() {
  return { type: CLEAR_PRODUCT_DETAILS };
}

export function fetchProductDetailsSuccess(data) {
  return { type: FETCH_PRODUCT_DETAILS_SUCCESS, value: data };
}

export function fetchProductDetailsFailed() {
  return { type: FETCH_PRODUCT_DETAILS_FAILED };
}

export function fetchProductAttributes(data) {
  return { type: FETCH_PRODUCT_ATTRIBUTES, value: data };
}

export function fetchProductAttributesSuccess(data) {
  return { type: FETCH_PRODUCT_ATTRIBUTES_SUCCESS, value: data };
}

export function fetchProductAttributesFailed() {
  return { type: FETCH_PRODUCT_ATTRIBUTES_FAILED };
}

export function submitProduct(data) {
  return { type: SUBMIT_PRODUCT, value: data };
}

export function submitProductSuccess(data) {
  return { type: SUBMIT_PRODUCT_SUCCESS, value: data };
}

export function submitProductFailed() {
  return { type: SUBMIT_PRODUCT_FAILED };
}

export function searchProducts(data) {
  return { type: SEARCH_PRODUCTS, value: data };
}

export function searchProductsSuccess(data) {
  return { type: SEARCH_PRODUCTS_SUCCESS, value: data };
}

export function searchProductsFailed() {
  return { type: SEARCH_PRODUCTS_FAILED };
}

export function clearSearchProducts() {
  return { type: CLEAR_SEARCH_PRODUCTS };
}

export function updateProductStatus(data) {
  return { type: UPDATE_PRODUCT_STATUS, value: data };
}

export function updateProductStatusSuccess(data) {
  return { type: UPDATE_PRODUCT_STATUS_SUCCESS, value: data };
}

export function updateProductStatusFailed() {
  return { type: UPDATE_PRODUCT_STATUS_FAILED };
}