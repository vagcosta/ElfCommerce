export const FETCH_MANUFACTURERS = 'FETCH_MANUFACTURERS';
export const FETCH_MANUFACTURERS_SUCCESS = 'FETCH_MANUFACTURERS_SUCCESS';
export const FETCH_MANUFACTURERS_FAILED = 'FETCH_MANUFACTURERS_FAILED';
export const CLEAR_MANUFACTURER_DETAILS = 'CLEAR_MANUFACTURER_DETAILS';

export const SUBMIT_MANUFACTURER = 'SUBMIT_MANUFACTURER';
export const SUBMIT_MANUFACTURER_SUCCESS = 'SUBMIT_MANUFACTURER_SUCCESS';
export const SUBMIT_MANUFACTURER_FAILED = 'SUBMIT_MANUFACTURER_FAILED';

export const FETCH_MANUFACTURER_DETAILS = 'FETCH_MANUFACTURE_DETAILS';
export const FETCH_MANUFACTURER_DETAILS_SUCCESS =
  'FETCH_MANUFACTURE_DETAILS_SUCCESS';
export const FETCH_MANUFACTURER_DETAILS_FAILED =
  'FETCH_MANUFACTURE_DETAILS_FAILED';

export const UPDATE_MANUFACTURER_STATUS = 'UPDATE_MANUFACTURER_STATUS';
export const UPDATE_MANUFACTURER_STATUS_SUCCESS =
  'UPDATE_MANUFACTURER_STATUS_SUCCESS';
export const UPDATE_MANUFACTURER_STATUS_FAILED =
  'UPDATE_MANUFACTURER_STATUS_FAILED';

export function fetchManufacturers(data) {
  return { type: FETCH_MANUFACTURERS, value: data };
}

export function fetchManufacturersSuccess(data) {
  return { type: FETCH_MANUFACTURERS_SUCCESS, value: data };
}

export function fetchManufacturersFailed() {
  return { type: FETCH_MANUFACTURERS_FAILED };
}

export function clearManufacturerDetails() {
  return { type: CLEAR_MANUFACTURER_DETAILS };
}

export function submitManufacturer(data) {
  return { type: SUBMIT_MANUFACTURER, value: data };
}

export function submitManufacturerSuccess(data) {
  return { type: SUBMIT_MANUFACTURER_SUCCESS, value: data };
}

export function submitManufacturerFailed() {
  return { type: SUBMIT_MANUFACTURER_FAILED };
}

export function fetchManufacturerDetails(data) {
  return { type: FETCH_MANUFACTURER_DETAILS, value: data };
}

export function fetchManufacturerDetailsSuccess(data) {
  return { type: FETCH_MANUFACTURER_DETAILS_SUCCESS, value: data };
}

export function fetchManufacturerDetailsFailed() {
  return { type: FETCH_MANUFACTURER_DETAILS_FAILED };
}

export function updateManufacturerStatus(data) {
  return { type: UPDATE_MANUFACTURER_STATUS, value: data };
}

export function updateManufacturerStatusSuccess(data) {
  return { type: UPDATE_MANUFACTURER_STATUS_SUCCESS, value: data };
}

export function updateManufacturerStatusFailed() {
  return { type: UPDATE_MANUFACTURER_STATUS_FAILED };
}
