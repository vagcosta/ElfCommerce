import {
  FETCH_STORE_SETTINGS_SUCCESS,
  FETCH_STORE_SETTINGS_FAILED,
  CLEAR_SETTINGS,
} from '../actions';

const initialState = {
  storeSettings: {},
  loaded: false,
  done: false,
  error: false,
};

export default function settingReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STORE_SETTINGS_SUCCESS:
      return { ...state, storeSettings: action.value };
    case FETCH_STORE_SETTINGS_FAILED:
      return { ...state, error: true };
    case CLEAR_SETTINGS:
      return { ...state, ...initialState };
    default:
      return state;
  }
}
