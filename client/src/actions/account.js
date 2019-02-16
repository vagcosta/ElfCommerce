export const SUBMIT_ACCOUNT = 'SUBMIT_ACCOUNT';
export const SUBMIT_ACCOUNT_SUCCESS = 'SUBMIT_ACCOUNT_SUCCESS';
export const SUBMIT_ACCOUNT_FAILED = 'SUBMIT_ACCOUNT_FAILED';

export const CLEAR_ACCOUNT_DETAILS = 'CLEAR_ACCOUNT_DETAILS';

export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS';
export const FETCH_ACCOUNTS_SUCCESS = 'FETCH_ACCOUNTS_SUCCESS';
export const FETCH_ACCOUNTS_FAILED = 'FETCH_ACCOUNTS_FAILED';

export const FETCH_ACCOUNT_DETAILS = 'FETCH_ACCOUNT_DETAILS';
export const FETCH_ACCOUNT_DETAILS_SUCCESS = 'FETCH_ACCOUNT_DETAILS_SUCCESS';
export const FETCH_ACCOUNT_DETAILS_FAILED = 'FETCH_ACCOUNT_DETAILS_FAILED';

export const UPDATE_ACCOUNT_STATUS = 'UPDATE_ACCOUNT_STATUS';
export const UPDATE_ACCOUNT_STATUS_SUCCESS = 'UPDATE_ACCOUNT_STATUS_SUCCESS';
export const UPDATE_ACCOUNT_STATUS_FAILED = 'UPDATE_ACCOUNT_STATUS_FAILED';

export function fetchAccounts(data) {
  return { type: FETCH_ACCOUNTS, value: data };
}

export function fetchAccountsSuccess(data) {
  return { type: FETCH_ACCOUNTS_SUCCESS, value: data };
}

export function fetchAccountsFailed() {
  return { type: FETCH_ACCOUNTS_FAILED };
}


export function fetchAccountDetails(data) {
  return { type: FETCH_ACCOUNT_DETAILS, value: data };
}

export function fetchAccountDetailsSuccess(data) {
  return { type: FETCH_ACCOUNT_DETAILS_SUCCESS, value: data };
}

export function fetchAccountDetailsFailed() {
  return { type: FETCH_ACCOUNT_DETAILS_FAILED };
}

export function clearAccountDetails() {
  return { type: CLEAR_ACCOUNT_DETAILS };
}

export function submitAccount(data) {
  return { type: SUBMIT_ACCOUNT, value: data };
}

export function submitAccountSuccess(data) {
  return { type: SUBMIT_ACCOUNT_SUCCESS, value: data };
}

export function submitAccountFailed() {
  return { type: SUBMIT_ACCOUNT_FAILED };
}

export function updateAccountStatus(data) {
  return { type: UPDATE_ACCOUNT_STATUS, value: data };
}

export function updateAccountStatusSuccess(data) {
  return { type: UPDATE_ACCOUNT_STATUS_SUCCESS, value: data };
}

export function updateAccountStatusFailed() {
  return { type: UPDATE_ACCOUNT_STATUS_FAILED };
}