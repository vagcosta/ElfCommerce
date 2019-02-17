import {
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_ACCOUNTS_FAILED,
  FETCH_ACCOUNT_DETAILS_SUCCESS,
  FETCH_ACCOUNT_DETAILS_FAILED,
  CLEAR_ACCOUNT_DETAILS,
  SUBMIT_ACCOUNT_SUCCESS,
  SUBMIT_ACCOUNT_FAILED,
  UPDATE_ACCOUNT_STATUS_SUCCESS,
  UPDATE_ACCOUNT_STATUS_FAILED,
} from '../actions';

const initialState = {
  accounts: { data: [], count: 0 },
  accountDetails: {},
  loaded: false,
  done: false,
  error: false,
};

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ACCOUNTS_SUCCESS:
      return { ...state, accounts: action.value, loaded: true };
    case FETCH_ACCOUNT_DETAILS_SUCCESS:
      return { ...state, accountDetails: action.value };
    case SUBMIT_ACCOUNT_SUCCESS:
      return { ...state, accountDetails: action.value, done: true };
    case UPDATE_ACCOUNT_STATUS_SUCCESS:
      const newList = (state.accounts.data.map(item => {

        if (item.code === action.value.accountId) {

          item.status = action.value.status;
        }

        return item;
      }));

      return {
        ...state,
        accounts: { data: newList, count: state.accounts.count },
      };
    case CLEAR_ACCOUNT_DETAILS:
      return { ...state, ...initialState };
    case SUBMIT_ACCOUNT_FAILED:
    case FETCH_ACCOUNTS_FAILED:
    case FETCH_ACCOUNT_DETAILS_FAILED:
    case UPDATE_ACCOUNT_STATUS_FAILED:
      return { ...state, error: true };
    default:
      return state;
  }
}
