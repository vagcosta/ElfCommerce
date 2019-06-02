import { combineReducers } from 'redux';
import orderReducer from './modules/order';
import pathReducer from './modules/ui';
import reportReducer from './modules/report';
import settingReducer from './modules/setting';
import manufacturerReducer from './modules/manufacturer';
import supplierReducer from './modules/supplier';
import productReducer from './modules/product';
import publicReducer from './modules/common';
import accountReducer from './modules/account';

const rootReducer = combineReducers({
  orderReducer,
  productReducer,
  pathReducer,
  reportReducer,
  settingReducer,
  manufacturerReducer,
  supplierReducer,
  publicReducer,
  accountReducer,
});

export default rootReducer;
