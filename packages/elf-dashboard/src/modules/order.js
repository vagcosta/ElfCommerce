import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import config from '../config';

const GET_ALL = 'app.order.getAll';
const GET_ALL_SUCCESS = 'app.order.getAllSuccess';
const GET_ITEM = 'app.order.getItem';
const GET_ITEM_SUCCESS = 'app.order.getItemSuccess';
const SUBMIT = 'app.order.submit';
const SUBMIT_SUCCESS = 'app.order.submitSuccess';
const ADD_ORDER_PRODUCT = 'app.order.addOrderProduct';
const SELECT_ORDER_PRODUCT = 'app.order.selectOrderProduct';
const REMOVE_ORDER_PRODUCT = 'app.order.removeOrderProduct';
const FAILED = 'app.order.failed';
const CLEAR_ITEM = 'app.order.clearItem';
const CLEAR_SEARCH = 'app.order.clearSearch';

const initialState = {
  orders: { data: [], count: 0 },
  searchedProducts: [],
  productSelected: {},
  orderDetails: { products: [] },
  loaded: false,
  done: false,
  error: false,
  counter: 0,
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SUCCESS:
      return { ...state, orders: action.value, loaded: true };
    case GET_ITEM_SUCCESS:
      return { ...state, orderDetails: action.value };
    case ADD_ORDER_PRODUCT: {
      const newProductList = [...state.orderDetails.products];

      newProductList.forEach(product => {
        if (product.code === action.value.code) {
          product.quantity = product.quantity + action.value.quantity;
          product.amount = product.amount + action.value.amount;
          action.value = null;
        }
      });

      if (action.value) {
        newProductList.push(action.value);
      }

      return {
        ...state,
        orderDetails: { ...state.orderDetails, products: newProductList },
        done: true,
        counter: state.counter + 1,
      };
    }
    case REMOVE_ORDER_PRODUCT: {
      const newProductList = [...state.orderDetails.products];

      newProductList.forEach((product, index, object) => {
        if (product.code === action.value) {
          object.splice(index, 1);
          return;
        }
      });

      return {
        ...state,
        orderDetails: { ...state.orderDetails, products: newProductList },
        done: true,
        counter: state.counter + 1,
      };
    }
    case SUBMIT_SUCCESS:
      return { ...state, orderDetails: action.value, done: true };
    case SELECT_ORDER_PRODUCT:
      return { ...state, productSelected: action.value };
    case CLEAR_SEARCH:
      return { ...state, productSelected: {} };
    case CLEAR_ITEM:
      return { ...state, ...initialState };
    case FAILED:
      return { ...state, error: true };
    default:
      return state;
  }
}

export function fetchOrders(data) {
  return { type: GET_ALL, value: data };
}

export function fetchOrdersSuccess(data) {
  return { type: GET_ALL_SUCCESS, value: data };
}

export function fetchOrdersFailed() {
  return { type: FAILED };
}

export function fetchOrderDetails(data) {
  return { type: GET_ITEM, value: data };
}

export function clearOrderDetails() {
  return { type: CLEAR_ITEM };
}

export function fetchOrderDetailsSuccess(data) {
  return { type: GET_ITEM_SUCCESS, value: data };
}

export function fetchOrderDetailsFailed() {
  return { type: FAILED };
}

export function submitOrder(data) {
  return { type: SUBMIT, value: data };
}

export function submitOrderSuccess(data) {
  return { type: SUBMIT_SUCCESS, value: data };
}

export function submitOrderFailed() {
  return { type: FAILED };
}

export function addOrderProduct(data) {
  return { type: ADD_ORDER_PRODUCT, value: data };
}

export function selectOrderProduct(data) {
  return { type: SELECT_ORDER_PRODUCT, value: data };
}

export function clearOrderSearchedProductResult() {
  return { type: CLEAR_SEARCH };
}

export function removeOrderProduct(data) {
  return { type: REMOVE_ORDER_PRODUCT, value: data };
}

export function* getOrdersHandler(action) {
  try {
    const { storeId, pageNo, pageSize } = action.value;
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/${storeId}/orders?page=${pageNo}&size=${pageSize}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchOrdersSuccess(res.data));
  } catch (error) {
    yield put(fetchOrdersFailed());
  }
}

export function* getOrderDetailsHandler(action) {
  try {
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/${action.value.storeId}/orders/${
        action.value.orderId
        }`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchOrderDetailsSuccess(res.data));
  } catch (error) {
    yield put(fetchOrderDetailsFailed());
  }
}

export function* upsertOrderHandler(action) {
  try {
    const { value } = action;
    const res = yield axios({
      method: value.mode === 'new' ? 'post' : 'put',
      url: `${config.apiDomain}/stores/${value.storeId}/orders${value.mode === 'new' ? '' : '/' + value.orderId}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
        'Content-Type': 'application/json',
      },
      data: value,
    });

    yield put(submitOrderSuccess(res.data));
  } catch (error) {
    yield put(submitOrderFailed());
  }
}

export const orderSagas = [
  takeEvery(GET_ALL, getOrdersHandler),
  takeEvery(SUBMIT, upsertOrderHandler),
  takeEvery(GET_ITEM, getOrderDetailsHandler),
];