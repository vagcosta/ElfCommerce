import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import config from '../config';

const GET_ALL = 'app.manufacturer.getAll';
const GET_ITEM = 'app.manufacturer.getItem';
const SUBMIT = 'app.manufacturer.submit';
const UPDATE_ITEM_STATUS = 'app.manufacturer.updateItemStatus';
const GET_ALL_SUCCESS = 'app.manufacturer.getAllSuccess';
const GET_ITEM_SUCCESS = 'app.manufacturer.getItemSuccess';
const SUBMIT_SUCCESS = 'app.manufacturer.submitSuccess';
const UPDATE_ITEM_STATUS_SUCCESS = 'app.manufacturer.updateItemStatusSuccess';
const FAILED = 'app.manufacturer.failed';
const CLEAR_ITEM = 'app.manufacturer.clearItem';

const initialState = {
  manufacturers: null,
  manufacturerDetails: null,
  status: -1,
};

export default function manufacturerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SUCCESS:
      return { ...state, manufacturers: action.value };
    case GET_ITEM_SUCCESS:
      return { ...state, manufacturerDetails: action.value };
    case SUBMIT_SUCCESS:
      return { ...state, manufacturerDetails: action.value, status: 1 };
    case UPDATE_ITEM_STATUS_SUCCESS:
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
    case FAILED:
      return { ...state, status: 0 };
    case CLEAR_ITEM:
      return { ...state, ...initialState };
    default:
      return state;
  }
}

export function fetchManufacturers(data) {
  return { type: GET_ALL, value: data };
}

export function fetchManufacturersSuccess(data) {
  return { type: GET_ALL_SUCCESS, value: data };
}

export function fetchManufacturersFailed() {
  return { type: FAILED };
}

export function clearManufacturerDetails() {
  return { type: CLEAR_ITEM };
}

export function submitManufacturer(data) {
  return { type: SUBMIT, value: data };
}

export function submitManufacturerSuccess(data) {
  return { type: SUBMIT_SUCCESS, value: data };
}

export function submitManufacturerFailed() {
  return { type: FAILED };
}

export function fetchManufacturerDetails(data) {
  return { type: GET_ITEM, value: data };
}

export function fetchManufacturerDetailsSuccess(data) {
  return { type: GET_ITEM_SUCCESS, value: data };
}

export function fetchManufacturerDetailsFailed() {
  return { type: FAILED };
}

export function updateManufacturerStatus(data) {
  return { type: UPDATE_ITEM_STATUS, value: data };
}

export function updateManufacturerStatusSuccess(data) {
  return { type: UPDATE_ITEM_STATUS_SUCCESS, value: data };
}

export function updateManufacturerStatusFailed() {
  return { type: FAILED };
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
    yield put(fetchManufacturersFailed());
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
    yield put(fetchManufacturerDetailsFailed());
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
    yield put(submitManufacturerFailed());
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
    yield put(updateManufacturerStatusFailed());
  }
}

export const manufacturerSagas = [
  takeEvery(GET_ALL, getManufacturersHandler),
  takeEvery(SUBMIT, upsertManufacturerHandler),
  takeEvery(GET_ITEM, getManufacturerDetailsHandler),
  takeEvery(UPDATE_ITEM_STATUS, updateManufacturerStatusHandler),
];
