import {
  FETCH_SUPPLIERS_SUCCESS,
  FETCH_SUPPLIERS_FAILED,
  FETCH_SUPPLIER_DETAILS_SUCCESS,
  FETCH_SUPPLIER_DETAILS_FAILED,
  SUBMIT_SUPPLIER_SUCCESS,
  SUBMIT_SUPPLIER_FAILED,
  CLEAR_SUPPLIER_DETAILS,
} from '../actions';

const initialState = {
  suppliers: { data: [], count: 0 },
  supplierDetails: {},
  loaded: false,
  done: false,
  error: false,
};

export default function supplierReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUPPLIERS_SUCCESS:
      return { ...state, suppliers: action.value, loaded: true };
    case FETCH_SUPPLIER_DETAILS_SUCCESS:
      return { ...state, supplierDetails: action.value, loaded: true };
    case SUBMIT_SUPPLIER_SUCCESS:
      return { ...state, supplierDetails: action.value, done: true };
    case SUBMIT_SUPPLIER_FAILED:
    case FETCH_SUPPLIERS_FAILED:
    case FETCH_SUPPLIER_DETAILS_FAILED:
      return { ...state, error: true };
    case CLEAR_SUPPLIER_DETAILS:
      return { ...state, ...initialState };
    default:
      return state;
  }
}
