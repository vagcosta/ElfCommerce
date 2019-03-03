import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import config from '../config';

const GET_ALL = 'app.supplier.getAll';
const GET_ITEM = 'app.supplier.getItem';
const SUBMIT = 'app.supplier.submit';
const UPDATE_ITEM_STATUS = 'app.supplier.updateItemStatus';
const GET_ALL_SUCCESS = 'app.supplier.getAllSuccess';
const GET_ITEM_SUCCESS = 'app.supplier.getItemSuccess';
const SUBMIT_SUCCESS = 'app.supplier.submitSuccess';
const UPDATE_ITEM_STATUS_SUCCESS = 'app.supplier.updateItemStatusSuccess';
const FAILED = 'app.supplier.failed';
const CLEAR_ITEM = 'app.supplier.clearItem';

const initialState = {
  suppliers: null,
  supplierDetails: null,
  status: -1,
};

export default function supplierReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SUCCESS:
      return { ...state, suppliers: action.value };
    case GET_ITEM_SUCCESS:
      return { ...state, supplierDetails: action.value };
    case SUBMIT_SUCCESS:
      return { ...state, supplierDetails: action.value, status: 1 };
    case UPDATE_ITEM_STATUS_SUCCESS:
      const newList = (state.suppliers.data.map(item => {

        if (item.code === action.value.supplierId) {

          item.status = action.value.status;
        }

        return item;
      }));

      return {
        ...state,
        suppliers: { data: newList, count: state.suppliers.count },
      };
    case FAILED:
      return { ...state, status: 0 };
    case CLEAR_ITEM:
      return { ...state, ...initialState };
    default:
      return state;
  }
}

export function fetchSuppliers(data) {
  return { type: GET_ALL, value: data };
}

export function fetchSuppliersSuccess(data) {
  return { type: GET_ALL_SUCCESS, value: data };
}

export function fetchSuppliersFailed() {
  return { type: FAILED };
}

export function clearSupplierDetails() {
  return { type: CLEAR_ITEM };
}

export function submitSupplier(data) {
  return { type: SUBMIT, value: data };
}

export function submitSupplierSuccess(data) {
  return { type: SUBMIT_SUCCESS, value: data };
}

export function submitSupplierFailed() {
  return { type: FAILED };
}

export function fetchSupplierDetails(data) {
  return { type: GET_ITEM, value: data };
}

export function fetchSupplierDetailsSuccess(data) {
  return { type: GET_ITEM_SUCCESS, value: data };
}

export function fetchSupplierDetailsFailed() {
  return { type: FAILED };
}

export function updateSupplierStatus(data) {
  return { type: UPDATE_ITEM_STATUS, value: data };
}

export function updateSupplierStatusSuccess(data) {
  return { type: UPDATE_ITEM_STATUS_SUCCESS, value: data };
}

export function updateSupplierStatusFailed() {
  return { type: FAILED };
}

export function* getSuppliersHandler(action) {
  try {
    const { storeId, pageNo, pageSize, activeOnly } = action.value;
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/${storeId}/suppliers?page=${pageNo}&size=${pageSize}${activeOnly ? '&activeOnly=true' : ''}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchSuppliersSuccess(res.data));
  } catch (error) {
    yield put(fetchSuppliersFailed());
  }
}

export function* getSupplierDetailsHandler(action) {
  try {
    const { storeId, supplierId } = action.value;
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/${storeId}/suppliers/${supplierId}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchSupplierDetailsSuccess(res.data));
  } catch (error) {
    yield put(fetchSupplierDetailsFailed());
  }
}

export function* upsertSupplierHandler(action) {
  try {
    const { value } = action;
    const res = yield axios({
      method: value.mode === 'new' ? 'post' : 'put',
      url: `${config.apiDomain}/stores/${value.storeId}/suppliers${value.mode === 'new' ? '' : '/' + value.supplierId}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
        'Content-Type': 'application/json',
      },
      data: value,
    });

    yield put(submitSupplierSuccess(res.data));
  } catch (error) {
    yield put(submitSupplierFailed());
  }
}

export function* updateSupplierStatusHandler(action) {
  try {
    const { storeId, supplierId, status } = action.value;
    const res = yield axios({
      method: !status ? 'delete' : 'patch',
      url: `${config.apiDomain}/stores/${storeId}/suppliers/${supplierId}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(updateSupplierStatusSuccess({ supplierId, status }));
  } catch (error) {
    yield put(updateSupplierStatusFailed());
  }
}

export const supplierSagas = [
  takeEvery(GET_ALL, getSuppliersHandler),
  takeEvery(SUBMIT, upsertSupplierHandler),
  takeEvery(GET_ITEM, getSupplierDetailsHandler),
  takeEvery(UPDATE_ITEM_STATUS, updateSupplierStatusHandler),
];
