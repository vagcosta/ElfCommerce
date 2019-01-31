import {
  AUTH_SUCCESS,
  AUTH_FAILED,
} from '../actions';

const initialState = {
  auth: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, auth: action.value };
    case AUTH_FAILED:
      return { ...state, auth: false };
    default:
      return state;
  }
}
