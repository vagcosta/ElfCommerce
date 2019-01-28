import {
  FETCH_MANUFACTURERS_SUCCESS,
  FETCH_MANUFACTURERS_FAILED,
  FETCH_MANUFACTURER_DETAILS_SUCCESS,
  FETCH_MANUFACTURER_DETAILS_FAILED,
  SUBMIT_MANUFACTURER_SUCCESS,
  SUBMIT_MANUFACTURER_FAILED,
  UPDATE_MANUFACTURER_STATUS_SUCCESS,
  UPDATE_MANUFACTURER_STATUS_FAILED,
  CLEAR_MANUFACTURER_DETAILS,
} from '../actions';

const initialState = {
  manufacturers: { data: [], count: 0 },
  manufacturerDetails: {},
  loaded: false,
  done: false,
  error: false,
};

export default function manufacturerReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MANUFACTURERS_SUCCESS:
      return { ...state, manufacturers: action.value, loaded: true };
    case FETCH_MANUFACTURER_DETAILS_SUCCESS:
      return { ...state, manufacturerDetails: action.value, loaded: true };
    case SUBMIT_MANUFACTURER_SUCCESS:
      return { ...state, manufacturerDetails: action.value, done: true };
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
      return { ...state, error: true };
    case CLEAR_MANUFACTURER_DETAILS:
      return { ...state, ...initialState };
    default:
      return state;
  }
}
