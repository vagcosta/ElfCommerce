import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import config from '../config';

const SUBMIT = 'app.account.submit';
const SUBMIT_SUCCESS = 'app.account.submitSuccess';
const GET_ALL = 'app.account.getAll';
const GET_ALL_SUCCESS = 'app.account.getAllSuccess';
const GET_ACCOUNT = 'app.account.getAccount';
const GET_ACCOUNT_SUCCESS = 'app.account.getAccountSuccess';
const GET_ITEM = 'app.account.getItem';
const GET_ITEM_SUCCESS = 'app.account.getItemSuccess';
const UPDATE_ITEM_STATUS = 'app.account.updateItemStatus';
const UPDATE_ITEM_STATUS_SUCCESS = 'app.account.updateItemStatusSuccess';
const FAILED = 'app.account.failed';
const CLEAR_ITEM = 'app.account.clearItem';

const initialState = {
  accounts: { data: [], count: 0 },
  accountDetails: {},
  accountSession: {},
  loaded: false,
  done: false,
  error: false,
};

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SUCCESS:
      return { ...state, accounts: action.value, loaded: true };
    case GET_ITEM_SUCCESS:
      return {
        ...state,
        accountDetails: action.value,
      };
    case SUBMIT_SUCCESS:
      return { ...state, accountDetails: action.value, done: true };
    case GET_ACCOUNT_SUCCESS:
      return { ...state, accountSession: action.value };
    case UPDATE_ITEM_STATUS_SUCCESS:
      const newList = state.accounts.data.map(item => {
        if (item.code === action.value.accountId) {
          item.status = action.value.status;
        }

        return item;
      });

      return {
        ...state,
        accounts: { data: newList, count: state.accounts.count },
      };
    case CLEAR_ITEM:
      return {
        ...state,
        accounts: { data: [], count: 0 },
        accountDetails: {},
        loaded: false,
        done: false,
        error: false,
      };
    case FAILED:
      return { ...state, error: true };
    default:
      return state;
  }
}

export function fetchAccounts(data) {
  return { type: GET_ALL, value: data };
}

export function fetchAccountsSuccess(data) {
  return { type: GET_ALL_SUCCESS, value: data };
}

export function fetchAccountsFailed() {
  return { type: FAILED };
}

export function fetchAccountDetails(data) {
  return { type: GET_ITEM, value: data };
}

export function fetchAccountDetailsSuccess(data) {
  return { type: GET_ITEM_SUCCESS, value: data };
}

export function fetchAccount(data) {
  return { type: GET_ACCOUNT, value: data };
}

export function fetchAccountSuccess(data) {
  return { type: GET_ACCOUNT_SUCCESS, value: data };
}

export function fetchAccountFailed() {
  return { type: FAILED };
}

export function fetchAccountDetailsFailed() {
  return { type: FAILED };
}

export function clearAccountDetails() {
  return { type: CLEAR_ITEM };
}

export function submitAccount(data) {
  return { type: SUBMIT, value: data };
}

export function submitAccountSuccess(data) {
  return { type: SUBMIT_SUCCESS, value: data };
}

export function submitAccountFailed() {
  return { type: FAILED };
}

export function updateAccountStatus(data) {
  return { type: UPDATE_ITEM_STATUS, value: data };
}

export function updateAccountStatusSuccess(data) {
  return { type: UPDATE_ITEM_STATUS_SUCCESS, value: data };
}

export function updateAccountStatusFailed() {
  return { type: FAILED };
}

export function* getAccountsHandler(action) {
  try {
    const { storeId, pageNo, pageSize } = action.value;
    const res = yield axios({
      method: 'get',
      url: `${
        config.apiDomain
      }/stores/${storeId}/accounts?page=${pageNo}&size=${pageSize}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchAccountsSuccess(res.data));
  } catch (error) {
    yield put(fetchAccountsFailed());
  }
}

export function* getAccountDetailsHandler(action) {
  try {
    const { storeId, accountId } = action.value;
    const res = yield axios.get(
      `${config.apiDomain}/stores/${storeId}/accounts/${accountId}`,
      {
        headers: {
          authorization: localStorage.getItem(config.accessTokenKey),
        },
      }
    );

    yield put(fetchAccountDetailsSuccess(res.data));
  } catch (error) {
    yield put(fetchAccountDetailsFailed());
  }
}

export function* getAccountHandler(action) {
  try {
    const { storeId, accountId } = action.value;
    const res = yield axios.get(
      `${config.apiDomain}/stores/${storeId}/accounts/${accountId}`,
      {
        headers: {
          authorization: localStorage.getItem(config.accessTokenKey),
        },
      }
    );

    yield put(fetchAccountSuccess(res.data));
  } catch (error) {
    yield put(fetchAccountFailed());
  }
}

export function* upsertAccountHandler(action) {
  try {
    const { value } = action;
    const res = yield axios({
      method: value.mode === 'new' ? 'post' : 'put',
      url: `${config.apiDomain}/stores/${value.storeId}/accounts${
        value.mode === 'new' ? '' : '/' + value.accountId
      }`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
        'Content-Type': 'application/json',
      },
      data: value,
    });

    yield put(submitAccountSuccess(res.data));
  } catch (error) {
    yield put(submitAccountFailed());
  }
}

export function* updateAccountStatusHandler(action) {
  try {
    const { storeId, accountId, status } = action.value;
    const res = yield axios({
      method: !status ? 'delete' : 'patch',
      url: `${config.apiDomain}/stores/${storeId}/accounts/${accountId}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(updateAccountStatusSuccess({ accountId, status }));
  } catch (error) {
    yield put(updateAccountStatusFailed());
  }
}

export const accountSagas = [
  takeEvery(GET_ALL, getAccountsHandler),
  takeEvery(GET_ITEM, getAccountDetailsHandler),
  takeEvery(GET_ACCOUNT, getAccountHandler),
  takeEvery(SUBMIT, upsertAccountHandler),
  takeEvery(UPDATE_ITEM_STATUS, updateAccountStatusHandler),
];
