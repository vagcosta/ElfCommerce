import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import config from '../config';

const FETCH_MANUFACTURERS = 'FETCH_MANUFACTURERS';
const FETCH_MANUFACTURERS_SUCCESS = 'FETCH_MANUFACTURERS_SUCCESS';
const FETCH_MANUFACTURERS_FAILED = 'FETCH_MANUFACTURERS_FAILED';
const CLEAR_MANUFACTURER_DETAILS = 'CLEAR_MANUFACTURER_DETAILS';

const SUBMIT_MANUFACTURER = 'SUBMIT_MANUFACTURER';
const SUBMIT_MANUFACTURER_SUCCESS = 'SUBMIT_MANUFACTURER_SUCCESS';
const SUBMIT_MANUFACTURER_FAILED = 'SUBMIT_MANUFACTURER_FAILED';

const FETCH_MANUFACTURER_DETAILS = 'FETCH_MANUFACTURE_DETAILS';
const FETCH_MANUFACTURER_DETAILS_SUCCESS =
  'FETCH_MANUFACTURE_DETAILS_SUCCESS';
const FETCH_MANUFACTURER_DETAILS_FAILED =
  'FETCH_MANUFACTURE_DETAILS_FAILED';

const UPDATE_MANUFACTURER_STATUS = 'UPDATE_MANUFACTURER_STATUS';
const UPDATE_MANUFACTURER_STATUS_SUCCESS =
  'UPDATE_MANUFACTURER_STATUS_SUCCESS';
const UPDATE_MANUFACTURER_STATUS_FAILED =
  'UPDATE_MANUFACTURER_STATUS_FAILED';

const initialState = {
  manufacturers: null,
  manufacturerDetails: null,
  status: -1,
};

export default function manufacturerReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MANUFACTURERS_SUCCESS:
      return { ...state, manufacturers: action.value };
    case FETCH_MANUFACTURER_DETAILS_SUCCESS:
      return { ...state, manufacturerDetails: action.value };
    case SUBMIT_MANUFACTURER_SUCCESS:
      return { ...state, manufacturerDetails: action.value, status: 1 };
    case UPDATE_MANUFACTURER_STATUS_SUCCESS:
      const newList = (state.manufacturers.data.map(item => {

        if (item.code === action.value.manufacturerId) {

          item.status = action.value.status;
        }

        return item;
      }));

      return {
        ...state,
        manufacturers: { data: newList, count: state.manufacturers.count },
      };
    case SUBMIT_MANUFACTURER_FAILED:
    case FETCH_MANUFACTURERS_FAILED:
    case FETCH_MANUFACTURER_DETAILS_FAILED:
    case UPDATE_MANUFACTURER_STATUS_FAILED:
      return { ...state, status: 0 };
    case CLEAR_MANUFACTURER_DETAILS:
      return { ...state, ...initialState };
    default:
      return state;
  }
}

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

export function* getManufacturersHandler(action) {
  try {
    const { storeId, pageNo, pageSize, activeOnly } = action.value;
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/${storeId}/manufacturers?page=${pageNo}&size=${pageSize}${activeOnly ? '&activeOnly=true' : ''}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchManufacturersSuccess(res.data));
  } catch (error) {
    // if (error.response.status === 401) {
    //   yield put(clearToken());
    // } else {
    yield put(fetchManufacturersFailed());
    // }
  }
}

export function* getManufacturerDetailsHandler(action) {
  try {
    const { storeId, manufacturerId } = action.value;
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/${storeId}/manufacturers/${manufacturerId}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchManufacturerDetailsSuccess(res.data));
  } catch (error) {
    // if (error.response.status === 401) {
    //   yield put(clearToken());
    // } else {
    yield put(fetchManufacturerDetailsFailed());
    // }
  }
}

export function* upsertManufacturerHandler(action) {
  try {
    const { value } = action;
    const res = yield axios({
      method: value.mode === 'new' ? 'post' : 'put',
      url: `${config.apiDomain}/stores/${value.storeId}/manufacturers${value.mode === 'new' ? '' : '/' + value.manufacturerId}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
        'Content-Type': 'application/json',
      },
      data: value,
    });

    yield put(submitManufacturerSuccess(res.data));
  } catch (error) {
    // if (error.response.status === 401) {
    //   yield put(clearToken());
    // } else {
    yield put(submitManufacturerFailed());
    // }
  }
}

export function* updateManufacturerStatusHandler(action) {
  try {
    const { storeId, manufacturerId, status } = action.value;
    const res = yield axios({
      method: !status ? 'delete' : 'patch',
      url: `${config.apiDomain}/stores/${storeId}/manufacturers/${manufacturerId}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(updateManufacturerStatusSuccess({ manufacturerId, status }));
  } catch (error) {
    // if (error.response.status === 401) {
    //   yield put(clearToken());
    // } else {
    yield put(updateManufacturerStatusFailed());
    // }
  }
}