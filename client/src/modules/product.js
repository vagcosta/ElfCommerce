export const GET_ALL = 'app.product.getAll';
export const GET_ALL_SUCCESS = 'app.product.getAllSuccess';

export const GET_ITEM = 'app.product.getItem';
export const GET_ITEM_SUCCESS = 'app.product.getItemSuccess';

export const GET_ITEM_ATTRIBUTES = 'app.product.getItemAttributes';
export const GET_ITEM_ATTRIBUTES_SUCCESS =
  'app.product.getItemAttributesSuccess';

export const SUBMIT = 'app.product.submit';
export const SUBMIT_SUCCESS = 'app.product.submitSuccess';

export const SEARCH = 'app.product.search';
export const SEARCH_SUCCESS = 'app.product.searchSuccess';

export const UPDATE_ITEM_STATUS = 'app.product.updateItemStatus';
export const UPDATE_ITEM_STATUS_SUCCESS = 'updateItemStatusSuccess';

const FAILED = 'app.product.failed';
const CLEAR_ITEM = 'app.product.clearItem';
const CLEAR_SEARCH = 'app.product.clearSearch';

const initialState = {
  products: { data: [], count: 0 },
  productDetails: {},
  productAttributes: [],
  loaded: false,
  done: false,
  error: false,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SUCCESS:
    case SEARCH_SUCCESS:
      return { ...state, products: action.value, loaded: true };
    case GET_ITEM_SUCCESS:
      return { ...state, productDetails: action.value };
    case GET_ITEM_ATTRIBUTES_SUCCESS:
      return { ...state, productAttributes: action.value, loaded: true };
    case SUBMIT_SUCCESS:
      return { ...state, productDetails: action.value, done: true };
    case UPDATE_ITEM_STATUS_SUCCESS:
      const newList = (state.products.data.map(item => {
        if (item.code === action.value.productId) {

          item.status = action.value.status;
        }

        return item;
      }));

      return {
        ...state,
        products: { data: newList, count: state.products.count },
      };
    case FAILED:
      return { ...state, error: true };
    case CLEAR_ITEM:
    case CLEAR_SEARCH:
      return { ...state, ...initialState };
    default:
      return state;
  }
}

export function fetchProducts(data) {
  return { type: FETCH_PRODUCTS, value: data };
}

export function fetchProductsSuccess(data) {
  return { type: FETCH_PRODUCTS_SUCCESS, value: data };
}

export function fetchProductsFailed() {
  return { type: FETCH_PRODUCTS_FAILED };
}

export function fetchProductDetails(data) {
  return { type: FETCH_PRODUCT_DETAILS, value: data };
}

export function clearProductDetails() {
  return { type: CLEAR_PRODUCT_DETAILS };
}

export function fetchProductDetailsSuccess(data) {
  return { type: FETCH_PRODUCT_DETAILS_SUCCESS, value: data };
}

export function fetchProductDetailsFailed() {
  return { type: FETCH_PRODUCT_DETAILS_FAILED };
}

export function fetchProductAttributes(data) {
  return { type: FETCH_PRODUCT_ATTRIBUTES, value: data };
}

export function fetchProductAttributesSuccess(data) {
  return { type: FETCH_PRODUCT_ATTRIBUTES_SUCCESS, value: data };
}

export function fetchProductAttributesFailed() {
  return { type: FETCH_PRODUCT_ATTRIBUTES_FAILED };
}

export function submitProduct(data) {
  return { type: SUBMIT_SUCCESS, value: data };
}

export function submitProductSuccess(data) {
  return { type: SUBMIT_PRODUCT_SUCCESS, value: data };
}

export function submitProductFailed() {
  return { type: SUBMIT_PRODUCT_FAILED };
}

export function searchProducts(data) {
  return { type: SEARCH_PRODUCTS, value: data };
}

export function searchProductsSuccess(data) {
  return { type: SEARCH_PRODUCTS_SUCCESS, value: data };
}

export function searchProductsFailed() {
  return { type: SEARCH_PRODUCTS_FAILED };
}

export function clearSearchProducts() {
  return { type: CLEAR_SEARCH_PRODUCTS };
}

export function updateProductStatus(data) {
  return { type: UPDATE_PRODUCT_STATUS, value: data };
}

export function updateProductStatusSuccess(data) {
  return { type: UPDATE_PRODUCT_STATUS_SUCCESS, value: data };
}

export function updateProductStatusFailed() {
  return { type: UPDATE_PRODUCT_STATUS_FAILED };
}

export function* fetchProducts(action) {
  try {
    const { storeId, pageNo, pageSize } = action.value;
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/${storeId}/products?page=${pageNo}&size=${pageSize}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchProductsSuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(fetchProductsFailed());
    }
  }
}

export function* searchProducts(action) {
  try {
    const { storeId, keyword, pageNo, pageSize } = action.value;
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/${storeId}/products?q=${keyword}&page=${pageNo}&size=${pageSize}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(searchProductsSuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(searchProductsFailed());
    }
  }
}

export function* fetchProductDetails(action) {
  try {
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/${action.value.storeId}/products/${
        action.value.productId
        }`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchProductDetailsSuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(fetchProductDetailsFailed());
    }
  }
}

export function* upsertProduct(action) {
  try {
    const { value } = action;
    const res = yield axios({
      method: value.mode === 'new' ? 'post' : 'put',
      url: `${config.apiDomain}/stores/${value.storeId}/products${value.mode === 'new' ? '' : '/' + value.productId}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
      data: value,
    });

    yield put(submitProductSuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(submitProductFailed());
    }
  }
}

export function* updateProductStatus(action) {
  try {
    const { storeId, productId, status } = action.value;
    const res = yield axios({
      method: !status ? 'delete' : 'patch',
      url: `${config.apiDomain}/stores/${storeId}/products/${productId}`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(updateProductStatusSuccess({ productId, status }));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(updateProductStatusFailed());
    }
  }
}

export function* getProductAttributes(action) {
  try {
    const { storeId, productId } = action.value;
    const res = yield axios({
      method: 'get',
      url: `${config.apiDomain}/stores/${storeId}/products/${productId}/attributes`,
      headers: {
        authorization: localStorage.getItem(config.accessTokenKey),
      },
    });

    yield put(fetchProductAttributesSuccess(res.data));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(clearToken());
    } else {
      yield put(fetchProductAttributesFailed());
    }
  }
}