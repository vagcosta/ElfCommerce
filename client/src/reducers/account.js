import {
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_ACCOUNTS_FAILED,
  FETCH_ACCOUNT_DETAILS_SUCCESS,
  FETCH_ACCOUNT_DETAILS_FAILED,
} from '../actions';

const initialState = {
  accounts: { data: [], count: 0 },
  accountDetails: {},
  loaded: false,
};

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ACCOUNTS_SUCCESS:
      return { ...state, accounts: action.value, loaded: true };
    case FETCH_ACCOUNT_DETAILS_SUCCESS:
      return { ...state, accountDetails: action.value };
    case FETCH_ACCOUNTS_FAILED:
    case FETCH_ACCOUNT_DETAILS_FAILED:
    default:
      return state;
  }
}
