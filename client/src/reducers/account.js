import {
  FETCH_ACCOUNT_SUCCESS,
  FETCH_ACCOUNT_FAILED,
} from '../actions';

const initialState = {
  account: null,
};

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ACCOUNT_SUCCESS:
      return { ...state, account: action.value };
    case FETCH_ACCOUNT_FAILED:
    default:
      return state;
  }
}
