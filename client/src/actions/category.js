
export const SUBMIT_CATEGORY = 'SUBMIT_CATEGORY';
export const SUBMIT_CATEGORY_SUCCESS = 'SUBMIT_CATEGORY_SUCCESS';
export const SUBMIT_CATEGORY_FAILED = 'SUBMIT_CATEGORY_FAILED';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILED = 'FETCH_CATEGORIES_FAILED';

export const FETCH_CATEGORY_DETAILS = 'FETCH_CATEGORY_DETAILS';
export const CLEAR_CATEGORY_DETAILS = 'CLEAR_CATEGORY_DETAILS';
export const FETCH_CATEGORY_DETAILS_SUCCESS =
  'FETCH_CATEGORY_DETAILS_SUCCESS';
export const FETCH_CATEGORY_DETAILS_FAILED =
  'FETCH_CATEGORY_DETAILS_FAILED';

export const UPDATE_CATEGORY_STATUS = 'UPDATE_CATEGORY_STATUS';
export const UPDATE_CATEGORY_STATUS_SUCCESS =
  'UPDATE_CATEGORY_STATUS_SUCCESS';
export const UPDATE_CATEGORY_STATUS_FAILED =
  'UPDATE_CATEGORY_STATUS_FAILED';

export function fetchCategories(data) {
  return { type: FETCH_CATEGORIES, value: data };
}

export function fetchCategoriesSuccess(data) {
  return { type: FETCH_CATEGORIES_SUCCESS, value: data };
}

export function fetchCategoriesFailed() {
  return { type: FETCH_CATEGORIES_FAILED };
}

export function fetchCategoryDetails(data) {
  return { type: FETCH_CATEGORY_DETAILS, value: data };
}

export function submitCategory(data) {
  return { type: SUBMIT_CATEGORY, value: data };
}

export function submitCategorySuccess(data) {
  return { type: SUBMIT_CATEGORY_SUCCESS, value: data };
}

export function submitCategoryFailed() {
  return { type: SUBMIT_CATEGORY_FAILED };
}

export function clearCategoryDetails() {
  return { type: CLEAR_CATEGORY_DETAILS };
}

export function fetchCategoryDetailsSuccess(data) {
  return { type: FETCH_CATEGORY_DETAILS_SUCCESS, value: data };
}

export function fetchCategoryDetailsFailed() {
  return { type: FETCH_CATEGORY_DETAILS_FAILED };
}

export function updateCategoryStatus(data) {
  return { type: UPDATE_CATEGORY_STATUS, value: data };
}

export function updateCategoryStatusSuccess(data) {
  return { type: UPDATE_CATEGORY_STATUS_SUCCESS, value: data };
}

export function updateCategoryStatusFailed() {
  return { type: UPDATE_CATEGORY_STATUS_FAILED };
}
