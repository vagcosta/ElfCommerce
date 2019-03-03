import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import orderReducer from '../modules/order';
import dashboardReducer from '../modules/dashboard';
import pathReducer from './path';
import reportReducer from './report';
import settingReducer from './setting';
import authReducer from '../modules/auth';
import manufacturerReducer from '../modules/manufacturer';
import supplierReducer from '../modules/supplier';
import productReducer from '../modules/product';
import publicReducer from './public';
import accountReducer from '../modules/account';
import categoryReducer from '../modules/category';

const rootReducer = combineReducers({
  form: formReducer,
  orderReducer,
  dashboardReducer,
  productReducer,
  categoryReducer,
  pathReducer,
  reportReducer,
  settingReducer,
  authReducer,
  manufacturerReducer,
  supplierReducer,
  publicReducer,
  accountReducer,
});

export default rootReducer;
