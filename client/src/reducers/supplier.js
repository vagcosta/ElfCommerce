import {
  FETCH_SUPPLIERS_SUCCESS,
  FETCH_SUPPLIERS_FAILED,
  FETCH_SUPPLIER_DETAILS_SUCCESS,
  FETCH_SUPPLIER_DETAILS_FAILED,
  SUBMIT_SUPPLIER_SUCCESS,
  SUBMIT_SUPPLIER_FAILED,
  UPDATE_SUPPLIER_STATUS_SUCCESS,
  UPDATE_SUPPLIER_STATUS_FAILED,
  CLEAR_SUPPLIER_DETAILS,
} from '../actions';

const initialState = {
  suppliers: null,
  supplierDetails: null,
  status: -1,
};

export default function supplierReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUPPLIERS_SUCCESS:
      return { ...state, suppliers: action.value };
    case FETCH_SUPPLIER_DETAILS_SUCCESS:
      return { ...state, supplierDetails: action.value };
    case SUBMIT_SUPPLIER_SUCCESS:
      return { ...state, supplierDetails: action.value, status: 1 };
    case UPDATE_SUPPLIER_STATUS_SUCCESS:
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
    case SUBMIT_SUPPLIER_FAILED:
    case FETCH_SUPPLIERS_FAILED:
    case FETCH_SUPPLIER_DETAILS_FAILED:
    case UPDATE_SUPPLIER_STATUS_FAILED:
      return { ...state, status: 0 };
    case CLEAR_SUPPLIER_DETAILS:
      return { ...state, ...initialState };
    default:
      return state;
  }
}
