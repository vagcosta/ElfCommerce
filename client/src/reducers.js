import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import orderReducer from './modules/order';
import dashboardReducer from './modules/dashboard';
import pathReducer from './modules/ui';
import reportReducer from './modules/report';
import settingReducer from './modules/setting';
import manufacturerReducer from './modules/manufacturer';
import supplierReducer from './modules/supplier';
import productReducer from './modules/product';
import publicReducer from './modules/common';
import accountReducer from './modules/account';
import categoryReducer from './modules/category';

const rootReducer = combineReducers({
  form: formReducer,
  orderReducer,
  dashboardReducer,
  productReducer,
  categoryReducer,
  pathReducer,
  reportReducer,
  settingReducer,
  manufacturerReducer,
  supplierReducer,
  publicReducer,
  accountReducer,
});

export default rootReducer;
