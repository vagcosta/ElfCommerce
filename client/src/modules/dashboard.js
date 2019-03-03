import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import config from '../config';

const GET_DATA = 'app.dashboard.getData';
const GET_DATA_SUCCESS = 'app.dashboard.getDataSuccess';
const FAILED = 'app.dashboard.failed';

const initialState = {
  data: { orderSummary: [], productSummary: [] },
  loaded: false,
  done: false,
  error: false,
};

export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_SUCCESS:
      return { ...state, data: action.value };
    case FAILED:
      return { ...state, error: true };
    default:
      return state;
  }
}

export function fetchDashboardData(data) {
  return { type: GET_DATA, value: data };
}

export function fetchDashboardDataSuccess(data) {
  return { type: GET_DATA_SUCCESS, value: data };
}

export function fetchDashboardDataFailed() {
  return { type: FAILED };
}

export function* fetchDashboardDataHandler(action) {
  try {
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/${action.value}/summary`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchDashboardDataSuccess(res.data));
  } catch (error) {
    yield put(fetchDashboardDataFailed());
  }
}

export const dashboardSagas = [
  takeEvery(GET_DATA, fetchDashboardDataHandler),
];