import { FETCH_STORE_SETTINGS_SUCCESS } from '../actions';

const initialState = {
  storeSettings: {},
};

export default function settingReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STORE_SETTINGS_SUCCESS:
      return { ...state, storeSettings: action.value };
    default:
      return state;
  }
}
